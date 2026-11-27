
import Link from 'next/link';
import type { QuizInfo } from '@/app/quizzes/catalog';

export interface QuizCardProps {
  quiz: QuizInfo;
  bookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
}

const symbols: Record<string, string> = {
  'Series': '✦',
  'Personality': '☾',
  'Uni': '♜',
  'General Knowledge': '◎',
  'Education': '◇'
};

export default function QuizCard({
  quiz,
  bookmarked = false,
  onToggleBookmark
}: QuizCardProps) {
  return (
    <div className="archive-card" data-category={quiz.category}>

      {/* Quiz link */}
      <Link
        href={'/quizzes/' + quiz.id}
        className="archive-card-link"
      >
        <div className="archive-card-top">
          <span className="archive-card-icon" aria-hidden="true">
            {symbols[quiz.category] ?? '✧'}
          </span>

          <small>
            {quiz.category === 'Uni' ? 'University' : quiz.category}
          </small>
        </div>

        <strong>{quiz.title}</strong>

        <div className="archive-card-bottom">
          <span>
            {quiz.count} questions · {quiz.timed ? 'Timed' : 'Untimed'}
          </span>

          <span className="archive-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
      </Link>

      {onToggleBookmark && (
        <button
          type="button"
          className="archive-bookmark"
          aria-label={bookmarked ? 'Remove bookmark from ' + quiz.title : 'Bookmark ' + quiz.title}
          aria-pressed={bookmarked}
          onClick={() => onToggleBookmark(quiz.id)}
        >
          {bookmarked ? '★' : '☆'}
        </button>
      )}

    </div>
  );
}
