import matches from './matches.json';
import additional from './additional-quizzes.json';
import education from './education/topics.json';
export interface QuizInfo { id: string; title: string; category: string; count: number; timed: boolean }
export const library = { ...matches, ...additional, Personality: [...matches.Personality, ...additional.Personality] };
export const catalog: QuizInfo[] = [ ...Object.entries(library).flatMap(([category, books]) => books.map(b => ({id:b.id,title:b.title,category,count:b.questions.length,timed:false}))), ...education.map(b=>({id:b.id,title:b.name,category:'Education',count:b.questions.length,timed:true})) ];
