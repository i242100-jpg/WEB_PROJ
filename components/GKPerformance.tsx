import {gkTopics, type GKRecord} from '@/app/quizzes/gkRecord';

export default function GKPerformance({scores}:{scores:GKRecord}) {
  const completed=gkTopics.filter(topic=>scores[topic.id]!==undefined);
  const correct=completed.reduce((sum,topic)=>sum+scores[topic.id],0);
  const attempted=completed.reduce((sum,topic)=>sum+topic.questions.length,0);
  const accuracy=attempted?`${Math.round(correct/attempted*100)}%`:'—';
  return <div className="gk-performance" aria-label="General Knowledge performance">
    <style>{`
      .gk-performance .gk-stat-grid {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:12px 0;}
      .gk-performance .gk-stat-grid div {border:1px solid #96745355;border-radius:6px;padding:10px;min-width:0;}
      .gk-performance .gk-stat-grid dt {font-size:14px;color:#e6c9a0;}
      .gk-performance .gk-stat-grid dd {margin:4px 0 0;font-size:20px;color:#ffda93;font-weight:600;}
    `}</style>
    <dl className="gk-stat-grid">
      <div><dt>Correct answers</dt><dd>{correct} / {attempted}</dd></div>
      <div><dt>Incorrect answers</dt><dd>{attempted-correct}</dd></div>
      <div><dt>Accuracy</dt><dd>{accuracy}</dd></div>
      <div><dt>Quizzes completed</dt><dd>{completed.length} / {gkTopics.length}</dd></div>
    </dl>
    <ul>{gkTopics.map(topic=>{
      const score=scores[topic.id];
      return <li key={topic.id}><span>{topic.title}</span><b>{score===undefined?'Unplayed':`${score} / ${topic.questions.length} · ${Math.round(score/topic.questions.length*100)}%`}</b></li>;
    })}</ul>
  </div>;
}
