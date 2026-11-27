import {useEffect,useState} from 'react';
import topics from './topics.json';
import {readPlayer,scoreKey} from '../player';
export type Result={correct:number;wrong:number;expired:number};
export type Records=Record<string,Result>;
const memory:Record<string,Records>={};
export function readRecords(playerId=readPlayer()?.id):Records {
  if(!playerId)return {};
  const records={...memory[playerId]};
  for(const topic of topics){try{const data=localStorage.getItem(scoreKey('education',topic.id,playerId));if(!data)continue;const r=JSON.parse(data);if([r.correct,r.wrong,r.expired].every(n=>Number.isInteger(n)&&n>=0)&&r.correct+r.wrong+r.expired===topic.questions.length)records[topic.id]=r;}catch{}}
  return records;
}
export function useRecords(){
  const [records,setRecords]=useState<Records>({});
  useEffect(()=>{const refresh=()=>setRecords(readRecords());refresh();window.addEventListener('storage',refresh);return()=>window.removeEventListener('storage',refresh);},[]);
  function save(id:string,result:Result,playerId=readPlayer()?.id){if(!playerId)return;(memory[playerId]??={})[id]=result;try{localStorage.setItem(scoreKey('education',id,playerId),JSON.stringify(result));}catch{}setRecords(readRecords());}
  return {records,save};
}
