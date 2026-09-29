import React from 'react';
import { LOCATIONS } from '../data';

const N = LOCATIONS.length;

export default function Overlay({ active, goTo, overview }) {
  const l = LOCATIONS[active];
  return (
    <div className="ui">
      <div className="panel">
        <header className="brand">
          <p className="eyebrow">Explore · Our Journey</p>
          <h1>A day across the company.</h1>
        </header>

        <nav className="nav" aria-label="Agenda">
          <div className="nav-head"><b>Agenda</b><span>{l.n} / 0{N}</span></div>
          <ul>
            {LOCATIONS.map((loc, i) => (
              <li key={loc.key} aria-current={i === active}>
                <button onClick={() => goTo(i)}>
                  <span className="n">{loc.n}</span>
                  <span className="nm">{loc.name}</span>
                  <span className="tm">{loc.time}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="bar"><i style={{ width: `${(active / (N - 1)) * 100}%` }} /></div>
        </nav>

        <article className="card" key={l.key}>
          <div className="card-top"><span className="chip">{l.n}</span><span className="place">{l.name}</span></div>
          <h2>{l.title}</h2>
          <div className="time">{l.time}</div>
          <p className="desc">{l.desc}</p>
          <div className="meta">
            <span className="who">Hosted by <b>{l.host}</b></span>
            <span className="tags">{l.tags.map((t) => <span key={t} className="tag">{t}</span>)}</span>
          </div>
          <div className="actions">
            {active < N - 1 && (
              <button className="next" onClick={() => goTo(active + 1)}>Next: {LOCATIONS[active + 1].name} →</button>
            )}
          </div>
        </article>
      </div>

      <button className="overview-btn" onClick={overview}>Overview</button>
      <div className="scroll-hint">Scroll to travel · click a stop to fly there</div>
    </div>
  );
}
