"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { gkTopics, readGK, type GKRecord } from "../gkRecord";
import {readPlayer, type Player} from "../player";
import topics from "./topics.json";
import { useRecords, type Records } from "./record";

export function Summary({ records }: { records: Records }) {
  const completed = topics.filter(t => records[t.id]);
  const correct = completed.reduce((n,t) => n + records[t.id].correct, 0);
  const missed = completed.reduce((n,t) => n + records[t.id].expired, 0);
  const max = completed.length * 5;
  const final = completed.length === topics.length;
  return <section className="ed-report" aria-label="Education scorebook">
    <h2>{final ? "Your final Education score" : "Education scorebook"}</h2>
    {completed.length ? <>
      <strong className={final && correct === 15 ? "ed-perfect" : ""}>◈ {correct} / {max} coins</strong>
      <div>{correct} correct · {max - correct - missed} incorrect · {missed} timed out</div>
      <ul>{completed.map(t => <li key={t.id}>{t.name} <b>{records[t.id].correct} / 5</b></li>)}</ul>
      {final ? <p>{correct === 15 ? "A perfect sweep across all three subjects!" :
        "Strongest " + (completed.filter(t => records[t.id].correct === Math.max(...completed.map(x => records[x.id].correct))).length === 1 ? "topic: " : "topics: ") +
        completed.filter(t => records[t.id].correct === Math.max(...completed.map(x => records[x.id].correct))).map(t => t.name).join(", ") + "."}</p> :
        <p>{completed.length} of 3 quizzes completed.</p>}
    </> : <p>Finish an Education quiz to record your first result.</p>}
  </section>;
}

export default function EducationScorebook() {
  const [player,setPlayer]=useState<Player|null>(null);
  const [ready,setReady]=useState(false);
  const [gk, setGK] = useState<GKRecord>({});
  useEffect(() => {
    const refresh = () => {const current=readPlayer();setPlayer(current);setGK(readGK(current?.id));setReady(true);};
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("pageshow", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("pageshow", refresh);
    };
  }, []);
  const completed = gkTopics.filter(topic => gk[topic.id] !== undefined);
  const earned = completed.reduce((n, topic) => n + gk[topic.id], 0);
  const attempted = completed.reduce((n, topic) => n + topic.questions.length, 0);
  const available = gkTopics.reduce((n, topic) => n + topic.questions.length, 0);
  const { records } = useRecords();
  return <><style>{`
    #world[data-room="scores"] .destination { top:85px; bottom:68px; left:max(6%, calc((100vw - 760px)/2)); right:max(6%, calc((100vw - 760px)/2)); transform:none; overflow:auto; padding:22px; background:#211b2aee; border:1px solid #967453; border-radius:6px; }
    #world[data-room="scores"] .destination h1 { font-size:clamp(36px,6vw,60px); }
    #world[data-room="scores"] .ed-report ul { list-style:none; padding:0; }
    #world[data-room="scores"] .ed-report li { display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid #96745355; }
    #world[data-room="scores"] .ed-report h2 { font:26px Georgia,serif; margin:15px 0 8px; }
    #world[data-room="scores"] .ed-report strong { color:#ffda93; }
    `}</style>
    <style>{`
  #world[data-room="scores"] {
    height: auto;
    min-height: 100svh;
    padding: 82px 16px 68px;
  }

  #world[data-room="scores"] .destination {
    position: relative;
    inset: auto;
    transform: none;
    width: min(760px, 100%);
    max-height: none;
    margin: 0 auto;
    overflow: visible;
    padding: clamp(16px, 2vw, 24px);
    background: #211b2aee;
    border: 1px solid #967453;
    border-radius: 6px;
  }

  #world[data-room="scores"] .destination h1 {
    font-size: clamp(32px, 3.5vw, 52px);
  }

  #world[data-room="scores"] .terrain {
    translate: none;
  }

  #world[data-room="scores"] .ed-report h2 {
    font: 26px Georgia, serif;
    margin: 15px 0 8px;
  }

  #world[data-room="scores"] .ed-report p {
    margin: 8px 0 12px;
  }

  #world[data-room="scores"] .ed-report strong {
    color: #ffda93;
  }

  #world[data-room="scores"] .ed-report ul {
    list-style: none;
    padding: 0;
  }

  #world[data-room="scores"] .ed-report li {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 5px 0;
    border-bottom: 1px solid #96745355;
  }

  #world[data-room="scores"] .ed-report li b {
    white-space: nowrap;
  }

  @media (max-width: 700px) {
    #world[data-room="scores"] {
      padding-top: 39svh;
    }

    #world[data-room="scores"] .terrain {
      translate: none;
    }
  }
`}</style>
    {!ready ? <p>Loading your scorebook…</p> : !player ? <><p>Create or select a profile to view your personal scores.</p><Link className="back" href="/profile">Choose profile →</Link></> : <>
    <h2 className="text-2xl font-semibold">{player.name}’s scorebook</h2><p>Only your latest completed quiz attempts appear here.</p><Link className="back" href="/profile">Switch profile</Link>
    <Summary records={records}/><Link className="back" href="/quizzes/education">Open Education →</Link>
    <section className="ed-report" aria-label="General Knowledge scorebook">
      <h2>General Knowledge</h2>
      {completed.length ? <>
        <strong>◈ {earned} / {available} coins</strong>
        <p>{earned} correct · {attempted - earned} incorrect across completed quizzes</p>
        <ul>{gkTopics.map(topic => <li key={topic.id}>
          <span>{topic.title}</span>
          <b>{gk[topic.id] === undefined ? "Unplayed" : gk[topic.id] + " / " + topic.questions.length}</b>
        </li>)}</ul>
      </> : <p>Complete a General Knowledge quiz to record your first result.</p>}
      <Link className="back" href="/quizzes">Open the Archive →</Link>
    </section></>}</>;
}
