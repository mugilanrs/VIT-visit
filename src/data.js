// Single source of truth: agenda content (placeholder) + map placement.
// u,v are normalised coordinates (0..1) on the aerial basemap (campus-aerial.jpg),
// marking where each stop sits in the photo. Swap the text for real content later.

export const IMG_W = 1920;
export const IMG_H = 1080;

export const LOCATIONS = [
  {
    n: '01', key: 'airport', name: 'Airport',
    title: 'Arrival & Registration', time: '09:00 — 09:45',
    host: 'Guest Relations', tags: ['Check-in', 'Welcome'],
    desc: 'Touch down, collect your badge, and grab a coffee. The journey through the company begins the moment you walk in.',
    u: 0.79, v: 0.32,
  },
  {
    n: '02', key: 'board', name: 'Board Room',
    title: 'Leadership Keynote', time: '10:00 — 11:15',
    host: 'Executive Leadership', tags: ['Keynote', 'Vision'],
    desc: 'The year in review and where we go next — the priorities, the bets, and the thinking behind them, straight from the leadership team.',
    u: 0.45, v: 0.12,
  },
  {
    n: '03', key: 'tower', name: 'Signature Tower',
    title: 'Strategy & Vision', time: '11:30 — 13:00',
    host: 'Strategy Office', tags: ['Strategy', 'Roadmap'],
    desc: 'From the top floor: the market, the roadmap, and the three moves that define the next twelve months.',
    u: 0.40, v: 0.44,
  },
  {
    n: '04', key: 'odc', name: 'ODC',
    title: 'Engineering at Scale', time: '14:00 — 15:30',
    host: 'Engineering', tags: ['Engineering', 'Platform'],
    desc: 'Inside the delivery centre — how the platform is built, shipped, and kept reliable for millions of requests a day.',
    u: 0.31, v: 0.86,
  },
  {
    n: '05', key: 'eb5', name: 'EB 5',
    title: 'Innovation & Growth', time: '16:00 — 17:30',
    host: 'Product & Growth', tags: ['Innovation', 'Demos'],
    desc: 'Where the next products take shape. New ideas, live demos, and an open floor to close the day.',
    u: 0.56, v: 0.86,
  },
];

export const PALETTE = { pink: '#F41C5E', deep: '#D91652', soft: '#FCE8EF', ink: '#182033' };
