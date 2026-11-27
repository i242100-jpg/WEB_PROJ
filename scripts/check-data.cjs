/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS Node.js validation script. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const matches = require('../app/quizzes/matches.json');
const additional = require('../app/quizzes/additional-quizzes.json');
const education = require('../app/quizzes/education/topics.json');
const all = [...Object.values(matches).flat(), ...Object.values(additional).flat(), ...education];
assert(all.length >= 15);
assert.equal(new Set(all.map(q=>q.id)).size, all.length);
for (const quiz of all) {
 assert(quiz.questions.length > 0, quiz.id);
 for (const question of quiz.questions) {
  const options = question.choices || question.options;
  assert(options.length >= 2, quiz.id);
  if (question.correct !== undefined) assert(Number.isInteger(question.correct) && question.correct >= 0 && question.correct < options.length, quiz.id);
  if (question.photo) assert(fs.existsSync(`public/snapshots/${question.photo}.jpg`), quiz.id);
 }
}
for(const quiz of education) assert.equal(quiz.questions.length,5);
console.log(`${all.length} unique quizzes validated; answer indexes and photo paths valid.`);
