import { ANGEL, Angel } from './angel';
import { DREAMS, Dream } from './dreams';
export const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const D: Record<string, { word: string; love: string; work: string; spirit: string; act: string }> = {
  '0': { word: 'possibility', love: 'leave room for a relationship to grow without forcing a shape onto it', work: 'clear old tasks so a new opportunity has space to land', spirit: 'stillness, meditation or simply a quiet walk can feel especially grounding', act: 'Declutter one small corner of your life this week.' },
  '1': { word: 'new beginnings', love: 'be honest about what you want rather than waiting to be asked', work: 'it may be a good moment to pitch an idea or start a side project', spirit: 'pay attention to recurring thoughts, as they may be shaping your mood', act: 'Write down one intention and one first step.' },
  '2': { word: 'harmony', love: 'small acts of patience and listening may go further than grand gestures', work: 'collaboration could open more doors than going it alone', spirit: 'trust that some things unfold on their own timeline', act: 'Reach out to someone you would like to work or spend time with.' },
  '3': { word: 'expression', love: 'saying how you feel, lightly and kindly, may bring you closer', work: 'creative skills could be worth showing off a little more', spirit: 'joy and play can be a form of renewal, not a distraction', act: 'Make or share something creative, however small.' },
  '4': { word: 'stability', love: 'reliability and steady routines can be quietly romantic', work: 'focus on the foundations: budgets, plans and good habits', spirit: 'feel supported by the people and practices that keep you steady', act: 'Tidy one practical task you have been putting off.' },
  '5': { word: 'change', love: 'try something new together, or notice how you have grown', work: 'stay flexible; a shift in plans may work in your favour', spirit: 'curiosity can turn uncertainty into adventure', act: 'Say yes to one unfamiliar experience.' },
  '6': { word: 'care', love: 'nurture the relationships closest to home, including the one with yourself', work: 'balance effort with rest so you do not burn out', spirit: 'tending your home and body can be a spiritual act', act: 'Plan a restful evening and protect it.' },
  '7': { word: 'reflection', love: 'deeper conversations may matter more than busy plans right now', work: 'study, research or a course could pay off later', spirit: 'journalling or time in nature may bring clarity', act: 'Spend ten quiet minutes with a question you keep circling.' },
  '8': { word: 'abundance', love: 'give and receive affection generously and without keeping score', work: 'consistent effort may be starting to show results', spirit: 'gratitude can help you notice how much is already flowing', act: 'List three things that are going well.' },
  '9': { word: 'completion', love: 'release old hurts so present relationships feel lighter', work: 'finish what is nearly done before starting something new', spirit: 'kindness and service can give a sense of purpose', act: 'Complete or let go of one lingering task.' },
};
const digits = (n: string) => [...new Set(n.split(''))];
export function numberDetail(a: Angel) {
  const ds = digits(a.n); const main = D[ds[0]]; const second = ds[1] ? D[ds[1]] : undefined;
  const themes = ds.map(d => D[d].word).join(' and ');
  return {
    overview: `${a.text} At its heart, ${a.n} is often linked with ${themes}. If it keeps appearing, treat it as a prompt to pause and ask what that theme might mean for you today.`,
    love: `In relationships, ${main.love}.${second ? ' There is also a thread of ' + second.word + ': ' + second.love + '.' : ''}`,
    career: `For work and money, ${main.work}.${second ? ' Alongside that, ' + second.work + '.' : ''}`,
    spirit: `On a personal level, ${main.spirit}.`,
    next: main.act + (second ? ' ' + second.act : ''),
    related: ANGEL.filter(o => o.n !== a.n && digits(o.n).some(d => ds.includes(d))).slice(0, 4).map(o => o.n),
  };
}
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
export const findNumber = (id: string) => ANGEL.find(a => a.n === id);
export const findDream = (id: string) => DREAMS.find(d => slug(d.t) === id);
