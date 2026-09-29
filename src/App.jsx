import React, { useRef, useState, useCallback } from 'react';
import MapView from './MapView';
import Overlay from './ui/Overlay';
import { LOCATIONS } from './data';

const N = LOCATIONS.length;

export default function App() {
  const navRef = useRef({ progress: 0, overview: false });
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const p = max > 0 ? (el.scrollTop / max) * (N - 1) : 0;
    navRef.current.progress = p;
    navRef.current.overview = false;
    const idx = Math.max(0, Math.min(N - 1, Math.round(p)));
    setActive((cur) => (cur === idx ? cur : idx));
  }, []);

  const goTo = useCallback((i) => {
    const el = scrollRef.current;
    navRef.current.overview = false;
    if (el) {
      const max = el.scrollHeight - el.clientHeight;
      el.scrollTo({ top: (i / (N - 1)) * max, behavior: 'smooth' });
    }
    setActive(i);
  }, []);

  const overview = useCallback(() => { navRef.current.overview = true; }, []);

  return (
    <>
      <MapView navRef={navRef} active={active} />
      <div className="scroller" ref={scrollRef} onScroll={handleScroll}>
        <div style={{ height: `${N * 100}vh` }} />
      </div>
      <Overlay active={active} goTo={goTo} overview={overview} />
    </>
  );
}
