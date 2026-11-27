import banks from './additional-quizzes.json';
import {readPlayer,scoreKey} from './player';
export const gkTopics = banks['General Knowledge'];
export type GKRecord = Record<string,number>;
const session: Record<string, GKRecord> = {};
export function saveGK(id:string, correct:number, playerId=readPlayer()?.id) {
  if(!playerId)return;
  (session[playerId]??={})[id]=correct;
  try{localStorage.setItem(scoreKey('gk',id,playerId),String(correct));}catch{}
}
export function readGK(playerId=readPlayer()?.id):GKRecord {
  if(!playerId)return {};
  const scores={...session[playerId]};
  for(const topic of gkTopics){try{const raw=localStorage.getItem(scoreKey('gk',topic.id,playerId));if(raw!==null&&/^\d+$/.test(raw)&&Number(raw)<=topic.questions.length)scores[topic.id]=Number(raw);}catch{}}
  return scores;
}
