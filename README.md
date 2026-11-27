# Quiz Atlas

CS4032 Web Programming — Assignment 3, Topic 23 (Quiz App). An illustrated, torchlit quiz world built with Next.js App Router, React, TypeScript and Tailwind CSS. Explore five collections, receive personality matches, complete factual quizzes, earn coins and review your scores in the Observatory. No backend or real login is used.

## Group information

Group number: to be confirmed by the group.

| Member | Roll number | Contribution status |
| --- | --- | --- |
| Iraj Aslam | 24I-2100 | Initial animated homepage and completed frontend prototype; integration and Education/Observatory work |
| Hajra Tariq | 24I-2000 | University/GK question bank committed to shared repository; further assigned implementation and testing to be recorded after completion |
| Adeeba Sohail | To be confirmed | Assigned Archive/quiz player review and further implementation; record actual work after completion |

Update this table with verified individual contributions before submission. This package contains AI-assisted improvements to the existing prototype, not independently authored commits by each member.

## Run locally

Use Node.js 22 LTS or newer. From the project root:

```sh
npm install
npm run dev
```

Visit http://localhost:3000. For production verification run `npm run build`, then `npm start`. Run `npm run lint` for lint checks.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Animated Passage with panoramic navigation |
| `/quizzes` | Archive: category collections, search and filtering |
| `/quizzes/[id]` | Dynamic quiz details and playable quiz, with unknown IDs handled by `notFound()` |
| `/quizzes/education` | Three timed Education challenges |
| `/scores` | Observatory: Education and GK scorebook |
| `/profile` | Controlled explorer form with validation and confirmation |
| `/about` | App description |
| Unknown route | Custom not-found screen |

The Archive includes a loading boundary. Quiz details use generated metadata and static params. Interactive components use client state; display-only route wrappers remain Server Components.

## Components and data

`components/` contains AtlasLayout, QuizCard, QuizSearch, PhotoQuestion, AnswerReview, QuizTimer, PlayerForm and SectionHeading with typed props. QuizCard is reused on the Archive and detail pages; SectionHeading and AnswerReview are also reused. Mock data is in `app/quizzes/` and includes 15 quiz records in five collections. Education and GK scores use localStorage with in-memory fallback. A simulated profile only uses React state.

## Verification checklist

- Search by quiz title, filter by category, and clear empty results.
- Open a dynamic detail such as `/quizzes/campus`; visit `/quizzes/nonexistent` to check the 404.
- Complete a Series/Personality quiz and inspect its match result.
- Complete a GK quiz, review the answers, visit the Observatory, and refresh to check persistence.
- Play Education; select an answer, allow a question to expire, and complete a topic. Review answers and finish all three topics to see the combined score out of 15.
- Submit an empty profile form, verify errors, then enter valid values and verify confirmation.
- Inspect the app at 375, 768 and 1280 pixels; verify keyboard navigation and the animated home page.
- Run `npm run build` and record the result before submission.

## Repository and demo

Repository: https://github.com/i242100-jpg/WEB_A3

Video link: add the verified link if hosted externally. All three members must demonstrate their own actual contributions in the 8–12 minute recording.

Vercel: optional; add the verified live link only if deployed.

## AI and asset credits

ChatGPT assisted with the prototype, SVG scenery, quiz logic, refactoring, and rubric-related improvements. The group must review and understand code presented in the demo. The passage illustration incorporates traced storyboard artwork from Kurzgesagt's [We Finally Know More About Humanity’s First Civilization](https://www.youtube.com/watch?v=_y9JuojAIg0). Photo source and license information is in `public/snapshots/credits.txt`.
