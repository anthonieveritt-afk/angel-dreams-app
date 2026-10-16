import { HAND_RAW } from './hand';
type Hand = { title: string; intro: string; core: string };
export const HAND: Record<string, Hand> = {};
export const HAND_LIST: string[] = [];
for (const line of HAND_RAW.split('\n')) { const [n, title, intro, core] = line.split('|'); HAND[n] = { title, intro, core }; HAND_LIST.push(n); }

type Dig = { w: string; q: string; love: string[]; work: string[]; spirit: string[]; act: string[] };
const DG: Dig[] = [
 { w: 'possibility', q: 'open and unhurried', love: ['leave room for a connection to grow without forcing its shape', 'notice what feels light and easy between you and others'], work: ['clear old tasks so new openings have somewhere to land', 'keep options open rather than committing too fast'], spirit: ['silence and space can feel unusually restoring', 'a quiet walk may say more than a busy plan'], act: ['Declutter one small corner of your life.', 'Leave one evening this week completely unplanned.'] },
 { w: 'new beginnings', q: 'bold and self-directed', love: ['say what you want rather than waiting to be asked', 'take the first step in reconnecting with someone'], work: ['pitch the idea or start the side project', 'take the lead on something you have been circling'], spirit: ['your recurring thoughts may be shaping your mood more than you think', 'intentions set now may carry extra weight'], act: ['Write one intention and one first step.', 'Begin the task you keep postponing, even for five minutes.'] },
 { w: 'harmony', q: 'patient and cooperative', love: ['small acts of listening may go further than grand gestures', 'meet someone halfway and see what changes'], work: ['collaboration may open more doors than going solo', 'a supportive colleague could be key right now'], spirit: ['some things unfold on their own timeline', 'trust can be a practice rather than a feeling'], act: ['Reach out to someone you would like on your side.', 'Ask for help with one thing.'] },
 { w: 'expression', q: 'bright and sociable', love: ['say how you feel, lightly and kindly', 'shared laughter may bring you closer than serious talks'], work: ['creative skills could be worth showing off a little more', 'communication is your strongest tool at the moment'], spirit: ['joy and play can be a form of renewal', 'creativity may be how you process what you feel'], act: ['Make or share something creative, however small.', 'Send the message you have been drafting in your head.'] },
 { w: 'stability', q: 'steady and practical', love: ['reliability and routine can be quietly romantic', 'show care through dependable small actions'], work: ['focus on foundations: budgets, plans and good habits', 'slow, thorough work may outlast quick wins'], spirit: ['you may be more supported than it feels', 'grounding habits like sleep and movement matter'], act: ['Tidy one practical task you have put off.', 'Review a budget or plan for ten minutes.'] },
 { w: 'change', q: 'restless and adventurous', love: ['try something new together, or notice how you have both grown', 'freedom and closeness can coexist'], work: ['stay flexible; a change of plan may work in your favour', 'a new skill or route could open up options'], spirit: ['curiosity can turn uncertainty into adventure', 'letting go may feel freeing rather than frightening'], act: ['Say yes to one unfamiliar experience.', 'Change one routine and see how it feels.'] },
 { w: 'care', q: 'warm and responsible', love: ['nurture the relationships closest to home, including the one with yourself', 'kindness at home may ripple outward'], work: ['balance effort with rest so you do not burn out', 'service and reliability may be noticed'], spirit: ['tending your home and body can be a spiritual act', 'compassion for yourself makes compassion for others easier'], act: ['Plan a restful evening and protect it.', 'Do one kind thing for your home or body.'] },
 { w: 'reflection', q: 'thoughtful and intuitive', love: ['deeper conversations may matter more than busy plans', 'give people room to share at their own pace'], work: ['study, research or a course could pay off later', 'trust your analysis before rushing a decision'], spirit: ['journalling or time in nature may bring clarity', 'your intuition may be especially clear'], act: ['Spend ten quiet minutes with a question you keep circling.', 'Read something that stretches your thinking.'] },
 { w: 'abundance', q: 'driven and generous', love: ['give and receive affection without keeping score', 'confidence can be attractive when it stays kind'], work: ['consistent effort may be starting to show results', 'it may be a good time to ask for what your work is worth'], spirit: ['gratitude helps you notice how much is already flowing', 'generosity keeps abundance moving'], act: ['List three things going well.', 'Review what you are owed, and what you owe, and settle one.'] },
 { w: 'completion', q: 'wise and compassionate', love: ['release old hurts so present relationships feel lighter', 'forgiveness may be the kindest gift right now'], work: ['finish what is nearly done before starting something new', 'mentoring or helping others may feel rewarding'], spirit: ['kindness and service can give a strong sense of purpose', 'endings can be honoured rather than rushed'], act: ['Complete or let go of one lingering task.', 'Thank someone who helped you through a chapter.'] },
];
const OPEN = {
  core: ['At its heart,', 'Read as a whole,', 'Many people feel that', 'Taken together,', 'In simple terms,'],
  love: ['In relationships,', 'When it comes to love,', 'For the people closest to you,', 'Romantically and in friendship,'],
  work: ['For work and money,', 'In your career,', 'Financially,', 'On the practical side,'],
  spirit: ['On a personal level,', 'For your inner life,', 'Spiritually,', 'Looking inward,'],
};
const PAT: Record<string, { name: string; note: string[] }> = {
  repeat: { name: 'repeating', note: ['A repeated digit concentrates one theme, so its message tends to feel loud and clear.', 'When one digit repeats, its quality is amplified rather than mixed.'] },
  asc: { name: 'ascending', note: ['The digits climb in order, which many read as steady progress and things building naturally.', 'An upward run suggests growth arriving step by step.'] },
  desc: { name: 'descending', note: ['The digits count down, often read as simplifying or preparing for a fresh start.', 'A downward run can suggest winding down before something new.'] },
  mirror: { name: 'mirrored', note: ['It reads the same both ways, a pattern often linked with balance and reflection.', 'Mirror numbers invite you to look at both sides of a situation.'] },
  doubles: { name: 'paired', note: ['Its digits arrive in pairs, which can suggest two themes working together.', 'Paired digits hint at a partnership between two energies.'] },
  zeros: { name: 'open', note: ['The zeros add breathing room, softening the other digits and widening their possibilities.', 'Zeros here act like open doors around the other themes.'] },
  plain: { name: 'mixed', note: ['Its mix of digits blends several themes into one personal message.', 'Each digit adds its own colour, so the meaning is a blend rather than a single note.'] },
};
function hash(s: string) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
const pick = <T,>(a: T[], s: string) => a[hash(s) % a.length];
export function pattern(n: string) {
  const d = n.split('').map(Number); const u = new Set(d);
  if (n.length > 1 && u.size === 1) return 'repeat';
  if (n.length > 2 && d.every((x, i) => i === 0 || x === d[i - 1] + 1)) return 'asc';
  if (n.length > 2 && d.every((x, i) => i === 0 || x === d[i - 1] - 1)) return 'desc';
  if (n.length > 2 && n === [...n].reverse().join('')) return 'mirror';
  if (n.length === 4 && ((d[0] === d[1] && d[2] === d[3]) || (d[0] === d[2] && d[1] === d[3]))) return 'doubles';
  if (n.length > 1 && d.includes(0)) return 'zeros';
  return 'plain';
}
export const isNum = (q: string) => /^\d{1,4}$/.test(q);
function ranked(n: string) { // digits ordered by frequency, then first appearance
  const c: Record<string, number> = {}; for (const x of n) c[x] = (c[x] || 0) + 1;
  return Object.keys(c).sort((a, b) => c[b] - c[a] || n.indexOf(a) - n.indexOf(b)).map(Number);
}
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const TITLES = [(a: Dig, b?: Dig) => b ? `${cap(a.w)} meets ${b.w}` : cap(a.w), (a: Dig, b?: Dig) => b ? `${cap(b.w)} through ${a.w}` : `Pure ${a.w}`, (a: Dig, b?: Dig) => b ? `Where ${a.w} and ${b.w} align` : `The way of ${a.w}`];
export type NumInfo = { n: string; title: string; intro: string; hand: boolean; sections: [string, string][]; related: string[] };
export function getNumber(n: string): NumInfo {
  const r = ranked(n); const A = DG[r[0]]; const B = r[1] !== undefined ? DG[r[1]] : undefined; const C3 = r[2] !== undefined ? DG[r[2]] : undefined;
  const p = pattern(n); const P = PAT[p]; const h = HAND[n]; const sum = n.split('').reduce((s, x) => s + +x, 0); const root = sum === 0 ? 0 : 1 + (sum - 1) % 9;
  const title = h ? h.title : pick(TITLES, n + 't')(A, B);
  const intro = h ? h.intro : `${n} is ${/^[aeiou]/.test(P.name)?'an':'a'} ${P.name} pattern led by ${r[0]}, the digit of ${A.w}${B ? `, with ${r[1]} adding ${B.w}` : ''}.`;
  const coreGen = `${pick(OPEN.core, n + 'c')} ${n} blends ${/^[aeiou]/.test(A.q)?'an':'a'} ${A.q} energy${B ? ` with something more ${B.q}` : ''}${C3 ? `, while ${r[2]} brings a note of ${C3.w}` : ''}. ${n.length > 1 ? pick(P.note, n + 'p') + ` Its digits add up to ${sum}${sum > 9 ? `, which reduces to ${root}` : ''}, the number of ${DG[root].w}, so that theme sits quietly underneath.` : 'As a single digit, its message is simple and direct.'}`;
  const core = (h ? h.core + ' ' : '') + coreGen;
  const love = `${pick(OPEN.love, n + 'l')} ${pick(A.love, n + 'l1')}.${B ? ' ' + cap(pick(B.love, n + 'l2')) + ', too.' : ''}`;
  const work = `${pick(OPEN.work, n + 'w')} ${pick(A.work, n + 'w1')}.${B ? ` The influence of ${r[1]} adds another angle: ${pick(B.work, n + 'w2')}.` : ''}`;
  const spirit = `${pick(OPEN.spirit, n + 's')} ${pick(A.spirit, n + 's1')}.${DG[root] !== A ? ` The underlying ${root} suggests ${pick(DG[root].spirit, n + 's2')}.` : ''}`;
  const next = pick(A.act, n + 'a') + (B ? ' ' + pick(B.act, n + 'a2') : '');
  const rel = new Set<string>();
  const add = (x: string) => { if (x !== n && isNum(x)) rel.add(x); };
  add(String(r[0]).repeat(3)); add([...n].reverse().join('')); add(String(root).repeat(n.length > 1 ? n.length : 3));
  const num = +n, w = n.length; add(String(Math.min(num + 1, 10 ** w - 1)).padStart(w, '0')); add(String(Math.max(num - 1, 0)).padStart(w, '0'));
  return { n, title, intro, hand: !!h, sections: [['Core message', core], ['Love & relationships', love], ['Career & money', work], ['Spiritual growth', spirit], ['What to do next', next]], related: [...rel].slice(0, 5) };
}
