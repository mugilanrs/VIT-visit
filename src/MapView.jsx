import React, { useEffect, useRef } from 'react';
import { LOCATIONS, IMG_W, IMG_H } from './data';

const N = LOCATIONS.length;
const FOCUS_ZOOM = 1.4; // gentle zoom-in from straight top (keeps the map crisp)
const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion:reduce)').matches;

export default function MapView({ navRef, active }) {
  const worldRef = useRef(null);
  const pinRefs = useRef([]);
  const routeRef = useRef(null);
  const cam = useRef({ tx: 0, ty: 0, z: 1, init: false });

  // build route path in image coordinates
  const routeD = LOCATIONS.map((l, i) => `${i ? 'L' : 'M'} ${l.u * IMG_W} ${l.v * IMG_H}`).join(' ');

  // reveal route up to the active stop
  useEffect(() => {
    const r = routeRef.current;
    if (!r) return;
    const len = r.getTotalLength();
    r.style.strokeDasharray = len;
    r.style.strokeDashoffset = len * (1 - active / (N - 1));
  }, [active]);

  useEffect(() => {
    let raf;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    function coverZoom(vw, vh) { return Math.max(vw / IMG_W, vh / IMG_H); }

    function focusCam(i, cover, vw, vh) {
      const z = cover * FOCUS_ZOOM;
      const px = LOCATIONS[i].u * IMG_W, py = LOCATIONS[i].v * IMG_H;
      let tx = vw / 2 - px * z, ty = vh / 2 - py * z;
      tx = clamp(tx, vw - IMG_W * z, 0);
      ty = clamp(ty, vh - IMG_H * z, 0);
      return { tx, ty, z };
    }
    function overviewCam(cover, vw, vh) {
      const z = cover * 1.0;
      return { tx: (vw - IMG_W * z) / 2, ty: (vh - IMG_H * z) / 2, z };
    }
    function progressCam(p, cover, vw, vh) {
      const i0 = clamp(Math.floor(p), 0, N - 1);
      const i1 = clamp(i0 + 1, 0, N - 1);
      const f = clamp(p - i0, 0, 1);
      const a = focusCam(i0, cover, vw, vh), b = focusCam(i1, cover, vw, vh);
      return { tx: a.tx + (b.tx - a.tx) * f, ty: a.ty + (b.ty - a.ty) * f, z: a.z + (b.z - a.z) * f };
    }

    function frame() {
      const vw = window.innerWidth, vh = window.innerHeight;
      const cover = coverZoom(vw, vh);
      const target = navRef.current.overview
        ? overviewCam(cover, vw, vh)
        : progressCam(navRef.current.progress || 0, cover, vw, vh);

      const c = cam.current;
      if (!c.init) { c.tx = target.tx; c.ty = target.ty; c.z = target.z; c.init = true; }
      const k = reduce ? 1 : 0.09;
      c.tx += (target.tx - c.tx) * k;
      c.ty += (target.ty - c.ty) * k;
      c.z += (target.z - c.z) * k;

      if (worldRef.current) {
        worldRef.current.style.transform = `translate3d(${c.tx.toFixed(2)}px, ${c.ty.toFixed(2)}px, 0) scale(${c.z.toFixed(4)})`;
      }
      for (let i = 0; i < N; i++) {
        const el = pinRefs.current[i];
        if (!el) continue;
        const x = c.tx + LOCATIONS[i].u * IMG_W * c.z;
        const y = c.ty + LOCATIONS[i].v * IMG_H * c.z;
        el.style.transform = `translate(-50%, -100%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [navRef]);

  return (
    <>
      <div className="stage">
        <div className="world" ref={worldRef}>
          <img className="aerial" src="/campus-aerial.jpg" alt="" draggable="false" width={IMG_W} height={IMG_H} />
          <svg className="routeSvg" viewBox={`0 0 ${IMG_W} ${IMG_H}`} width={IMG_W} height={IMG_H}>
            <path className="route-ghost2" d={routeD} />
            <path className="route2" ref={routeRef} d={routeD} />
          </svg>
        </div>
        <div className="grade" />
      </div>

      <div className="pins">
        {LOCATIONS.map((l, i) => (
          <div
            key={l.key}
            className={'mpin' + (i === active ? ' on' : '')}
            ref={(el) => (pinRefs.current[i] = el)}
          >
            <div className="mpin-dot"><span>{l.n}</span></div>
            <div className="mpin-label">{l.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}
