"use client";

import {readPlayer} from "../player";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import QuizTimer from "@/components/QuizTimer";
import AnswerReview from "@/components/AnswerReview";
import { useState, useEffect, useRef } from "react";
import topics from "./topics.json";
import { useRecords, type Result } from "./record";
import { Summary } from "./Summary";
import { styles } from "./styles";

type Topic = typeof topics[number];
type Outcome = keyof Result;

function Question({ topic, index, coins, advance }: {
  topic: Topic; index: number; coins: number; advance: (outcome: Outcome, selected: number) => void;
}) {
  const q = topic.questions[index];
  const [picked, setPicked] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(10);
  const locked = useRef(false);
  const deadline = useRef(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const finish = useRef(advance);
  useEffect(() => { finish.current = advance; }, [advance]);

  useEffect(() => {
    deadline.current = performance.now() + 10000;
    heading.current?.focus({ preventScroll: true });
    function tick() {
      if (locked.current) return;
      const left = deadline.current - performance.now();
      setSeconds(Math.max(0, Math.ceil(left / 1000)));
      if (left <= 0) { locked.current = true; setPicked(-1); }
    }
    const interval = window.setInterval(tick, 50);
    document.addEventListener("visibilitychange", tick);
    return () => { clearInterval(interval); document.removeEventListener("visibilitychange", tick); };
  }, []);

  useEffect(() => {
    if (picked === null) return;
    const outcome = picked === -1 ? "expired" : picked === q.correct ? "correct" : "wrong";
    const timeout = window.setTimeout(() => finish.current(outcome, picked), 1400);
    return () => clearTimeout(timeout);
  }, [picked, q.correct]);

  function choose(i: number, eventTime: number) {
    if (locked.current || !deadline.current) return;
    locked.current = true;
    const expired = eventTime >= deadline.current;
    if (expired) setSeconds(0);
    setPicked(expired ? -1 : i);
  }

  return <section className="ed-question">
    <div className="ed-line"><span>Question {index + 1} / 5</span>
      <strong>◈ {coins + Number(picked === q.correct)} {picked === q.correct && <i className="ed-gain">+1</i>}</strong></div>
    <div className="ed-line"><span>{topic.name}</span><span>{seconds}s</span></div>
    <QuizTimer seconds={seconds} paused={picked !== null}/>
    <div className="ed-paper"><h2 ref={heading} tabIndex={-1}>{q.prompt}</h2>
      {q.options.map((option,i) => <button key={option} disabled={picked !== null}
        data-state={picked !== null && i === q.correct ? "right" : picked === i ? "wrong" : ""}
        onClick={event => choose(i, event.timeStamp)}><b>{"ABCD"[i]}</b>{option}
        {picked !== null && i === q.correct && <span>✓</span>}{picked === i && i !== q.correct && <span>✕</span>}</button>)}
    </div><div role="status" className="ed-status">{picked === null ? "" : picked === -1 ? "Time’s up" : picked === q.correct ? "Correct · +1 coin" : "Incorrect"}{picked !== null && picked !== q.correct && " · Answer: " + q.options[q.correct]}</div>
  </section>;
}

export default function Education({initialId}: {initialId?:string}) {
  const router = useRouter();
  const playerId = useRef<string | undefined>(undefined);
  const { records, save } = useRecords();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [answers, setAnswers] = useState<Outcome[]>([]);
  const [selectedAnswers,setSelectedAnswers]=useState<number[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  function start(t: Topic) {
    const player=readPlayer(); if(!player){router.push("/profile");return;} playerId.current=player.id;
    setTopic(t); setAnswers([]); setSelectedAnswers([]); setResult(null); panel.current?.scrollTo(0,0);
  }
  function advance(outcome: Outcome, selected: number) {
    if (!topic) return;
    const next = [...answers, outcome];
    setAnswers(next); setSelectedAnswers(old=>[...old,selected]);
    if (next.length === topic.questions.length) {
      const totals = { correct: 0, wrong: 0, expired: 0 };
      next.forEach(o => totals[o]++);
      save(topic.id, totals, playerId.current); setResult(totals);
      panel.current?.scrollTo(0,0);
    }
  }
  const nextTopic = topics.find(t => !records[t.id]);
  return <div ref={panel} className="ed-panel">
    <style>{styles}</style><Link className="ed-back" href="/quizzes">← The Archive</Link>
    {!topic ? <>{initialId ? <h2>Education challenge</h2> : <h1>Education</h1>}<p>Five questions per quiz. Ten seconds per answer. One coin for each correct choice.</p>
      <div className="ed-cards">{topics.filter(t=>!initialId||t.id===initialId).map(t => <button key={t.id} onClick={() => start(t)}>
        <Image src={"/education/"+t.id+".svg"} alt="" width={320} height={160} unoptimized/><strong>{t.name}</strong><small>{t.subtitle}</small>
        <em>{records[t.id] ? "Play again · " + records[t.id].correct + "/5" : "Start quiz →"}</em>
      </button>)}</div><Summary records={records}/></> :
      !result ? <Question key={topic.id+answers.length} topic={topic} index={answers.length}
        coins={answers.filter(a => a === "correct").length} advance={advance}/> :
      <><div className="ed-results" role="status"><small>{topic.name}</small>
        <h2 className={result.correct === 5 ? "ed-perfect" : ""}>{result.correct === 5 ? "✦ Perfect score! ✦" : "Quiz complete"}</h2>
        <strong>◈ {result.correct} / 5 coins</strong><div>{result.correct} correct · {result.wrong} incorrect · {result.expired} timed out</div></div>
        <AnswerReview items={topic.questions.map((q,i)=>({prompt:q.prompt,selected:q.options[selectedAnswers[i]]??"Timed out",correct:q.options[q.correct],outcome:answers[i]}))}/><Summary records={records}/><div className="ed-buttons">{nextTopic && <button onClick={() => start(nextTopic)}>Play {nextTopic.name} →</button>}
        <button onClick={() => setTopic(null)}>All Education quizzes</button></div></>}
  </div>;
}
