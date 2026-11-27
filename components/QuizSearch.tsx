'use client';
import {useState} from 'react';
import QuizCard from './QuizCard';
import type {QuizInfo} from '@/app/quizzes/catalog';
export interface QuizSearchProps {quizzes:QuizInfo[]}
const collections = [
  {name:'All', label:'All quizzes', icon:'✧'},
  {name:'Series', label:'Series', icon:'✦'},
  {name:'Personality', label:'Personality', icon:'☾'},
  {name:'Uni', label:'University', icon:'♜'},
  {name:'General Knowledge', label:'General Knowledge', icon:'◎'},
  {name:'Education', label:'Education', icon:'◇'},
];
export default function QuizSearch({quizzes}:QuizSearchProps) {
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('All');
  const visible=quizzes.filter(q=>(category==='All'||q.category===category)&&q.title.toLowerCase().includes(query.trim().toLowerCase()));
  return <section className="archive-library" aria-label="Quiz catalogue">
    <div className="archive-collections" aria-label="Filter by collection">
      {collections.map(c=><button type="button" key={c.name} data-category={c.name} aria-pressed={category===c.name} onClick={()=>setCategory(c.name)}><span aria-hidden="true" className="archive-symbol">{c.icon}</span><span>{c.label}</span><small>{c.name==='All'?quizzes.length:quizzes.filter(q=>q.category===c.name).length}</small></button>)}
    </div>
    <div className="archive-tools">
      <label className="archive-search"><span aria-hidden="true">⌕</span><input aria-label="Search quizzes" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a quiz..."/></label>
      <div role="status" className="archive-count">{visible.length} {visible.length===1?'quiz':'quizzes'} found</div>
      {(query||category!=='All')&&<button className="archive-reset" onClick={()=>{setQuery('');setCategory('All')}}>Clear filters ×</button>}
    </div>
    <div className="archive-grid">{visible.map(q=><QuizCard key={q.id} quiz={q}/>)}</div>
    {!visible.length&&<div className="archive-empty"><h2>No quizzes found</h2><p>Try another title or collection.</p><button className="back" onClick={()=>{setQuery('');setCategory('All')}}>Show all quizzes</button></div>}
  </section>
}
