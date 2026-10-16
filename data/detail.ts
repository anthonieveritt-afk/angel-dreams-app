import { DREAMS, Dream } from './dreams';
export const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const TAGS: [string, RegExp][] = [
  ['water', /water|ocean|rain|drown|ice|underwater|island|yacht|quicksand/i], ['travel', /airport|car|train|journey|bridge|elevator|stairs|ladder|running|chase|lost|flying|falling|jump/i],
  ['home', /house|attic|kitchen|door|keys|nest|garden|umbrella/i], ['animals', /animal|dog|cat|bee|snake|lion|owl|wolf|zebra|zoo|insect|egg/i],
  ['people', /baby|wedding|kiss|queen|party|pregnan|uniform|school|exam|office|yell|naked|voice|ghost/i],
];
const tag = (d: Dream) => (TAGS.find(([, r]) => r.test(d.t)) || ['life'])[0];
export function dreamDetail(d: Dream) {
  const n = d.t.toLowerCase(); const tg = tag(d);
  return {
    overview: `${d.text} Dreams about ${n} are personal, so your own associations usually matter more than any general meaning. Think about where you were, who was there and how it ended.`,
    variations: [
      `Seeing ${n} from a distance: may suggest you are noticing a theme without engaging with it yet.`,
      `${d.t} in a familiar place, such as your childhood home: could link the symbol to older memories.`,
      `${d.t} that changes shape or suddenly disappears: may reflect something in flux or out of reach.`,
      `Dreaming of ${n} again and again: repeated dreams often point to a question still waiting for attention.`,
    ],
    feelings: `If the dream felt calm or happy, ${n} may reflect something going well or a quality you are ready to welcome. If it felt tense or frightening, it may mirror a pressure or worry worth naming gently in waking life.`,
    question: `What in your life right now feels most like ${n}, and how would you like it to feel instead?`,
    related: DREAMS.filter(o => o.t !== d.t && tag(o) === tg).slice(0, 4).map(o => o.t),
  };
}
export const findDream = (id: string) => DREAMS.find(d => slug(d.t) === id);
