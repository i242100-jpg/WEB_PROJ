import Link from 'next/link';
import type { QuizInfo } from '@/app/quizzes/catalog';
export interface QuizCardProps {quiz:QuizInfo}
const symbols:Record<string,string> = {'Series':'✦','Personality':'☾','Uni':'♜','General Knowledge':'◎','Education':'◇'};
export default function QuizCard({quiz}: QuizCardProps) {
  return <Link href={'/quizzes/'+quiz.id} data-category={quiz.category} className="archive-card">
    <div className="archive-card-top"><span className="archive-card-icon" aria-hidden="true">{symbols[quiz.category]??'✧'}</span><small>{quiz.category==='Uni'?'University':quiz.category}</small></div>
    <strong>{quiz.title}</strong>
    <div className="archive-card-bottom"><span>{quiz.count} questions · {quiz.timed?'Timed':'Untimed'}</span><span className="archive-arrow" aria-hidden="true">↗</span></div>
  </Link>
}
