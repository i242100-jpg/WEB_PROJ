
'use client';

import { useState, useEffect } from 'react';
import QuizCard from './QuizCard';
import type { QuizInfo } from '@/app/quizzes/catalog';

export interface QuizSearchProps {
  quizzes: QuizInfo[];
}

const collections = [
  { name: 'All', label: 'All quizzes', icon: '✧' },
  { name: 'Series', label: 'Series', icon: '✦' },
  { name: 'Personality', label: 'Personality', icon: '☾' },
  { name: 'Uni', label: 'University', icon: '♜' },
  { name: 'General Knowledge', label: 'General Knowledge', icon: '◎' },
  { name: 'Education', label: 'Education', icon: '◇' },
];

export default function QuizSearch({ quizzes }: QuizSearchProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [loaded, setLoaded] = useState(false);

  // Load saved bookmarks when the component opens
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = localStorage.getItem('quiz-bookmarks');

        if (saved) {
          const parsed = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            setBookmarks(parsed);
          }
        }
      } catch {
        setBookmarks([]);
      }

      setLoaded(true);
    });
  }, []);
  // Save bookmarks whenever they change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem('quiz-bookmarks', JSON.stringify(bookmarks));
    }
  }, [bookmarks, loaded]);

  // Bookmark or unbookmark a quiz
  const toggleBookmark = (id: string) => {
    setBookmarks(current =>
      current.includes(id)
        ? current.filter(bookmark => bookmark !== id)
        : [...current, id]
    );
  };

  // Search, category and bookmark filtering
  const filtered = quizzes.filter(
    q =>
      (category === 'All' || q.category === category) &&
      q.title.toLowerCase().includes(query.trim().toLowerCase()) &&
      (!showBookmarked || bookmarks.includes(q.id))
  );

  // Sort filtered quizzes
  const visible = [...filtered].sort((a, b) => {
    if (sortBy === 'az') {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === 'za') {
      return b.title.localeCompare(a.title);
    }

    if (sortBy === 'count') {
      return b.count - a.count;
    }

    return 0;
  });

  // Clear filters without deleting saved bookmarks
  const resetFilters = () => {
    setQuery('');
    setCategory('All');
    setShowBookmarked(false);
    setSortBy('default');
  };

  return (
    <section className="archive-library" aria-label="Quiz catalogue">

      {/* Category filters */}
      <div className="archive-collections" aria-label="Filter by collection">
        {collections.map(c => (
          <button
            type="button"
            key={c.name}
            data-category={c.name}
            aria-pressed={category === c.name}
            onClick={() => setCategory(c.name)}
          >
            <span aria-hidden="true" className="archive-symbol">
              {c.icon}
            </span>

            <span>{c.label}</span>

            <small>
              {c.name === 'All'
                ? quizzes.length
                : quizzes.filter(q => q.category === c.name).length}
            </small>
          </button>
        ))}
      </div>

      {/* Search, sorting and bookmark controls */}
      <div className="archive-tools">

        {/* Search */}
        <label className="archive-search">
          <span aria-hidden="true">⌕</span>

          <input
            aria-label="Search quizzes"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Find a quiz..."
          />
        </label>

        {/* Sorting */}
        <label>
          Sort:
          <select
            aria-label="Sort quizzes"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="default">Default order</option>
            <option value="az">Title A–Z</option>
            <option value="za">Title Z–A</option>
            <option value="count">Question Count</option>
          </select>
        </label>

        {/* Bookmarked-only filter */}
        <button
          type="button"
          aria-pressed={showBookmarked}
          onClick={() => setShowBookmarked(!showBookmarked)}
        >
          {showBookmarked ? 'Show all quizzes' : 'Bookmarked only'}
        </button>

        {/* Result count */}
        <div role="status" className="archive-count">
          {visible.length} {visible.length === 1 ? 'quiz' : 'quizzes'} found
        </div>

        {/* Reset filters */}
        {(query || category !== 'All' || showBookmarked || sortBy !== 'default') && (
          <button
            type="button"
            className="archive-reset"
            onClick={resetFilters}
          >
            Clear filters ×
          </button>
        )}
      </div>

      {/* Quiz cards */}
      <div className="archive-grid">
        {visible.map(q => (
          <QuizCard
            key={q.id}
            quiz={q}
            bookmarked={bookmarks.includes(q.id)}
            onToggleBookmark={toggleBookmark}
          />
        ))}
      </div>

      {/* Empty state */}
      {!visible.length && (
        <div className="archive-empty">
          <h2>No quizzes found</h2>
          <p>Try another title or collection.</p>

          <button
            type="button"
            className="back"
            onClick={resetFilters}
          >
            Show all quizzes
          </button>
        </div>
      )}
    </section>
  );
}
