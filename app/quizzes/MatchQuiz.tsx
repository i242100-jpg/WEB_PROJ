"use client";

import { useRef, useState, type CSSProperties } from "react";
import {library} from "./catalog";
import PhotoQuestion from "@/components/PhotoQuestion";
import AnswerReview from "@/components/AnswerReview";
import Link from "next/link";

import { readPlayer } from "./player";
import { useRouter } from "next/navigation";
import { saveGK } from "./gkRecord";


type Question = { prompt: string; choices: string[]; votes?: number[][]; weights?: number[]; correct?: number; explanation?: string; photo?: number };
type Result = { name: string; description: string; art: string | string[]; min?: number; max?: number };
type Book = { id: string; title: string; description?: string; sigil: string; color: string; questions: Question[]; results: Result[] };


function resolveMatches(book: Book, answers: number[]): Result[] {
  if (book.id === "gpa_guess") {
    const sum = answers.reduce((total, choice, i) => total + book.questions[i].weights![choice], 0);
    return book.results.filter(r => sum >= r.min! && sum <= r.max!);
  }
  const ageKeys = [[0,2,3,1],[0,1,2,3],[0,1,2,3],[0,2,3,1],[0,1,2,3]];
  const votes = answers.flatMap((choice,i) => book.questions[i].votes?.[choice] ??
    [book.id === "mental-age" ? ageKeys[i][choice] : choice]);
  const counts = book.results.map((_, index) => votes.filter(v => v === index).length);
  const best = Math.max(...counts);
  const tied = book.results.filter((_,i) => counts[i] === best);
  if (book.id === "fyp_supervisor") return tied;
  if (book.id === "supernatural") return [tied[Math.floor(Math.random() * tied.length)]];
  return [book.results[votes.find(i => counts[i] === best) ?? 0]];
}

const styles = `
/* Keep result copy legible even inside the Archive's .destination. */
.qa-series-modal .qa-series-result p,
.qa-series-modal .qa-series-paper p {
  color: #402c20;
}
.qa-series-modal .qa-series-result .qa-gk-total {
  display: block;
  margin: 10px 0 4px;
  color: #573710;
  font: 600 28px Georgia, serif;
}
.qa-series-choices button[data-feedback="right"] {
  background: #c9e1b6; color: #203820; border-color: #53724b;
}
.qa-series-choices button[data-feedback="wrong"] {
  background: #f1bbb0; color: #492321; border-color: #9a5650;
}

.qa-series-entry { color:#ffda9c; display:inline-flex; gap:18px; align-items:center; border-bottom:1px solid #ad825a; padding:3px 0; }
.qa-series-entry:hover { color:#fff2de; }
.qa-series-modal { margin:auto; padding:0; width:min(1060px,94vw); max-width:94vw; max-height:90dvh; overflow:auto; border:1px solid #967453; border-radius:8px; background:#211926; color:#f8ebdc; box-shadow:0 22px 100px #08050bc4; scrollbar-color:#967453 #251b29; }
.qa-series-modal::backdrop { background:#120e21bd; backdrop-filter:blur(5px); }
.qa-series-shell { background:radial-gradient(ellipse at 50% -15%,#6b453c 0,transparent 56%),linear-gradient(150deg,#302235,#171421); padding:clamp(16px,4vw,32px); }
.qa-series-bar,.qa-series-actions,.qa-series-volumes button,.qa-series-choices button { display:flex; align-items:center; }
.qa-series-bar { gap:12px; padding-bottom:13px; border-bottom:1px solid #d9ac733b; }
.qa-series-label,.qa-series-kicker { font:650 11px/1.35 system-ui,sans-serif; letter-spacing:.16em; text-transform:uppercase; }
.qa-series-label { flex:1; color:#dfc7ae; }
.qa-series-purse,.qa-series-close { border:1px solid #967453; background:#211925; border-radius:20px; }
.qa-series-purse { color:#ffda88; padding:4px 13px; font-weight:700; font-variant-numeric:tabular-nums; }
.qa-series-close { width:34px; height:34px; line-height:1; font-size:23px; }
.qa-series-content { animation:qa-series-arrive .3s ease-out both; }
.qa-series-crest,.qa-series-seal { font:32px Georgia,serif; color:var(--accent); text-shadow:0 0 20px color-mix(in srgb,var(--accent) 50%,transparent); }
.qa-series-crest { margin:16px auto 4px; text-align:center; }
.qa-series-heading,.qa-series-result h3,.qa-series-paper h3,.qa-series-volumes strong { font-family:Georgia,serif; font-weight:400; }
.qa-series-heading { text-align:center; margin:0 auto 12px; max-width:32ch; font-size:clamp(28px,4.4vw,42px); line-height:1.08; letter-spacing:-.04em; }
.qa-series-heading:focus { outline:none; }
.qa-series-sub,.qa-series-reward { color:#e4ccaf; font-size:13px; }
.qa-series-content > .qa-series-sub { text-align:center; }
.qa-series-volumes,.qa-series-choices { display:grid; gap:10px; }
.qa-series-volumes { margin:24px 0 5px; }
.qa-series-volumes button { gap:18px; padding:18px; text-align:left; border:1px solid #897358; border-left:3px solid var(--accent); background:linear-gradient(100deg,#ffffff0f,transparent); border-radius:3px; transition:background .2s,transform .2s; }
.qa-series-volumes button:hover { transform:translateY(-2px); background:#ffffff12; }
.qa-series-volumes strong { flex:1; font-size:21px; }
.qa-series-seal { display:grid; place-items:center; width:42px; height:42px; border:1px solid var(--accent); border-radius:50%; flex-shrink:0; }
.qa-series-progress { display:flex; gap:5px; width:130px; margin:15px auto 20px; }
.qa-series-progress i { height:3px; flex:1; background:#735c58; }
.qa-series-progress i[data-lit=true] { background:var(--accent); }
.qa-series-paper,.qa-series-result { color:#39291f; padding:clamp(16px,3.5vw,27px); background:radial-gradient(ellipse at 40% 30%,#fff0ce,transparent 65%),linear-gradient(115deg,#ddba80,#f4dcac 55%,#dec193); border:3px double #906c42; box-shadow:3px 4px 0 #98704a55; }
.qa-series-kicker { color:#71492d; }
.qa-series-paper h3,.qa-series-result h3 { font-size:clamp(21px,2.8vw,28px); line-height:1.21; margin:10px 0 18px; }
.qa-series-choices button { position:relative; color:#38291f; gap:12px; padding:12px 18px 12px 12px; text-align:left; line-height:1.45; font-size:15px; background:linear-gradient(100deg,#fff1cd,#f4dfb5); border:1px solid #be9c66; border-radius:2px 10px 2px 3px; box-shadow:0 2px 0 #98704a3b; transition:transform .16s,background .2s; }
.qa-series-choices button::after { content:''; position:absolute; right:0; top:0; border:5px solid transparent; border-left-color:#caa872; border-bottom-color:#caa872; }
.qa-series-choices button:hover:not([aria-disabled=true]) { transform:translateX(3px); background:#fff7dc; }
.qa-series-choices button[data-chosen=true]:not([data-feedback]) { background:#c3d7ac; border-color:#587450; }
.qa-series-choices b { font:600 16px Georgia; color:#624328; }
.qa-series-choices em { font-style:normal; color:#2c5638; margin-left:auto; }
.qa-series-choices button[data-feedback="wrong"] em { color:#842e30; }
.qa-series-modal { overscroll-behavior:contain; touch-action:pan-y; }
.qa-series-actions { justify-content:space-between; gap:12px; margin-top:20px; flex-wrap:wrap; }
.qa-series-primary { color:#302116; background:linear-gradient(#ffdea5,#e4b577); padding:9px 16px; border:1px solid #b58a5b; border-radius:3px; font-weight:650; }
.qa-series-primary:disabled { opacity:.42; cursor:default; }
.qa-series-reward { color:#ffdc86; animation:qa-series-arrive .3s ease-out; }
.qa-series-coin { pointer-events:none; position:absolute; z-index:2; opacity:0; width:12px; height:12px; border-radius:50%; border:2px solid #fff2a9; background:#eeb44c; box-shadow:0 0 9px #ffbd55; }
.qa-series-result { margin-top:19px; }
.qa-series-result h3 { font-size:36px; }
.qa-series-modal button:focus-visible,.qa-series-entry:focus-visible { outline:3px solid #b16e38; outline-offset:2px; }
@keyframes qa-series-arrive { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
@media (max-width:480px) { .qa-series-choices button { font-size:14px; } .qa-series-shell { padding:14px; } .qa-series-actions { gap:8px; } }
@media (prefers-reduced-motion:reduce) { .qa-series-modal *, .qa-series-modal *::after { transition:none!important; animation:none!important; } }
`;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function MatchQuiz({ category, initialId }: { category: keyof typeof library; initialId?: string }) {
  const router = useRouter();
  const playerId = useRef<string | undefined>(undefined);
  const volumes: Book[] = library[category];
  const modal = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const [bookIndex, setBookIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const book = bookIndex === null ? null : volumes[bookIndex];
  const question = book?.questions[step];
  const selected = answers[step];
  const [matches, setMatches] = useState<Result[]>([]);
  const factual = book?.questions[0].correct !== undefined;

  const isGK = category === "General Knowledge";
  const correctCount = isGK && book
    ? answers.reduce((count, choice, index) =>
        count + Number(choice === book.questions[index].correct), 0)
    : 0;

  function openCollection() {
    if (isGK) { const player = readPlayer(); if (!player) { router.push("/profile"); return; } playerId.current = player.id; }
    start(initialId ? volumes.findIndex(v=>v.id===initialId) : null);
    modal.current?.showModal();
  }

  function focusTitle() {
    requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
  }

  function start(index: number | null) {
    setBookIndex(index);
    setAnswers([]);
    setStep(0);
    setMatches([]);
    focusTitle();
  }

  return <>
    <style>{styles}</style>
    <button className={"qa-series-entry"} onClick={openCollection}>{initialId ? "Start quiz" : category} <span aria-hidden="true">↗</span></button>
    <dialog ref={modal} className={"qa-series-modal"} aria-labelledby={category + "-heading"}
      style={{ "--accent": book?.color ?? "#ffd195" } as CSSProperties}>
      <div className={"qa-series-shell"}>
        <div className={"qa-series-bar"}>
          <span className={"qa-series-label"}>Quiz Atlas / {category}</span>
          <button className={"qa-series-close"} aria-label="Close quizzes" onClick={() => modal.current?.close()}>×</button>
        </div>
        <div className={"qa-series-content"} key={(book?.id ?? "index") + step}>
          <div className={"qa-series-crest"} aria-hidden="true">{book?.sigil ?? "✷"}</div>
          <h2 id={category + "-heading"} tabIndex={-1} ref={heading} className={"qa-series-heading"}>
            {book ? question ? book.title : factual ? "Quiz complete" : "Your match" : "The " + category + " Collection"}
          </h2>
          {!book && <>
            <div className={"qa-series-sub"}>Choose a quiz</div>
            <div className={"qa-series-volumes"}>{volumes.map((item, i) => <button key={item.id}
              style={{ "--accent": item.color } as CSSProperties} onClick={() => start(i)}>
              <span className={"qa-series-seal"}>{item.sigil}</span><strong>{item.title}<small style={{display:"block",font:"13px system-ui",marginTop:4}}>{item.questions.length} questions</small></strong><span aria-hidden="true">→</span>
            </button>)}</div>
          </>}
          {book && question && <>
            <div className={"qa-series-progress"} aria-hidden="true">{book.questions.map((_, i) =>
              <i key={book.id + "-" + i} data-lit={i <= step} />)}</div>
            <div className={"qa-series-paper"}>
              <div className={"qa-series-kicker"}>Question {step + 1} of {book.questions.length}</div>
              <h3>{question.prompt}</h3>
              {question.photo && <PhotoQuestion photo={question.photo}/>}
              <div className={"qa-series-choices"}>{question.choices.map((text, i) =>
                <button key={i} data-chosen={selected === i}
                  data-feedback={factual && selected !== undefined
                    ? i === question.correct ? "right" : i === selected ? "wrong" : undefined
                    : undefined} aria-pressed={selected === i}
                  aria-disabled={factual && selected !== undefined} onClick={() => { if (!factual || selected === undefined) setAnswers([...answers.slice(0, step), i]); }}><b>{letters[i]}</b><span>{text}</span>{selected === i && <em aria-label="Selected">
                    {factual && i !== question.correct ? "✕" : "✓"}
                  </em>}</button>
              )}</div>
            </div>
            {factual && selected !== undefined && <div role="status" style={{padding:"10px 0",color:"#ffe1aa"}}>{selected === question.correct ? "Correct." : "Answer: " + question.choices[question.correct!] + "."} {question.explanation}</div>}
            <div className={"qa-series-actions"}><button onClick={() => start(null)}>← Collection</button><button className={"qa-series-primary"} disabled={selected === undefined} onClick={() => {
              if (step + 1 === book.questions.length && !factual) setMatches(resolveMatches(book, answers));
              if (isGK && step + 1 === book.questions.length) {
                saveGK(book.id, correctCount, playerId.current);
              }
              setStep(step + 1); focusTitle();
              modal.current?.scrollTo(0, 0);
            }}>{step === book.questions.length - 1 ? (factual ? "Finish quiz" : "Reveal match") : "Next question"} →</button></div>
          </>}
          {book && !question && <div className={"qa-series-result"}>
            {isGK && <section aria-label="General Knowledge result">
              <div className="qa-series-kicker">{book.title}</div>
              <strong className="qa-gk-total">◈ {correctCount} / {book.questions.length} coins</strong>
              <p>{correctCount} correct · {book.questions.length - correctCount} incorrect</p>
              <Link href="/scores">View scoreboard →</Link>
            </section>}
            {factual && !isGK && <p>You answered {answers.filter((a,i)=>a===book.questions[i].correct).length} of {book.questions.length} questions correctly in {book.title}.</p>}
            {matches.map(result => <section key={result.name}>
            <svg viewBox="0 0 400 140" width="100%" height="140" role="img" aria-label={result.name + " emblem"}>
              <rect width="400" height="140" rx="5" fill="#20192c"/>
              <circle cx="200" cy="66" r="50" fill="#382b40" stroke={book.color}/>
              <path d="M0 111 Q72 75 130 110 T265 108 T400 97 V140 H0Z" fill="#503849"/>
              <path d="M0 130 Q100 93 175 129 T315 122 T400 115 V140 H0Z" fill="#302637"/>
              <text x="200" y="84" textAnchor="middle" fontSize="48">{Array.isArray(result.art) ? result.art.join(" ") : result.art}</text>
            </svg>
            <div className={"qa-series-kicker"}>{book.title}</div><h3>{result.name}</h3><div>{result.description}</div></section>)}
            {factual && <AnswerReview items={book.questions.map((q,i)=>({prompt:q.prompt,selected:q.choices[answers[i]]??"Unanswered",correct:q.choices[q.correct!]??"",outcome:answers[i]===q.correct?"Correct":"Incorrect"}))}/>}
            {book.description && !factual && <p>{book.description}</p>}
            {book.id === "famous_person_snapshot" && <a href="/snapshots/credits.txt" target="_blank" rel="noreferrer">Portrait credits</a>}
            <div className={"qa-series-actions"}><button onClick={() => start(bookIndex)}>Play again</button>
            <button className={"qa-series-primary"} onClick={() => start(null)}>{category} collection →</button></div>
          </div>}
        </div>
      </div>
    </dialog>
  </>;
}
