# Quiz Atlas

**CS4032 Web Programming | Assignment 3 | Topic 23: Quiz App**

FAST National University of Computer and Emerging Sciences, Islamabad

## 1. Project Overview

Quiz Atlas is an interactive, illustrated quiz website that transforms learning and entertainment into an exploration experience. Users enter a torchlit world, navigate through panoramic scenery, discover quizzes in the Archive, and track their achievements in the Observatory.

The application is built using Next.js, React, TypeScript and Tailwind CSS. It operates entirely on the frontend using structured mock data and browser-based persistent storage.

## 2. Group Members

| Member | Roll Number |
|---|---|
| Iraj Aslam | 24I-2100 |
| Hajra Tariq | 24I-2000 |
| Adeeba Sohail | 24I-2067 |

## 3. Website Features

### The Passage

- Animated torchlight introduction.
- Illustrated panoramic environment.
- Smooth navigation transitions.
- Consistent fantasy-inspired visual design.

### The Archive

- 15 quizzes organized into five collections.
- Search by quiz title.
- Category-based filtering.
- Alphabetical sorting in ascending and descending order.
- Sorting by question count.
- Persistent quiz bookmarks.
- Bookmarked-only filtering.
- Dynamic quiz routes.
- Empty search results and filter reset functionality.

### Quiz Collections

| Collection | Number of Quizzes | Functionality |
|---|---:|---|
| Series | 3 | Entertainment-based illustrated matches |
| Personality | 3 | Personality and character assessments |
| University | 3 | University-themed quizzes |
| General Knowledge | 3 | Factual quizzes and photographic questions |
| Education | 3 | Timed educational challenges |
| **Total** | **15** | |

### Education Challenges

- Three educational quizzes containing five questions each.
- Ten-second countdown per question.
- Automatic progression when time expires.
- One coin awarded for every correct answer.
- Individual and combined scores out of 15.
- Correct, incorrect and expired answer tracking.
- Answer review after completion.

### Explorer Profiles

- Create and select personal profiles.
- Rename existing profiles.
- Validate empty, short and duplicate names.
- Preserve existing scores when renaming profiles.
- Store scores separately for each player.
- Persist profile information using localStorage.

### The Observatory

- Personalized scorebook.
- Education and General Knowledge results.
- Earned coins and available coins.
- Correct and incorrect answer statistics.
- GK accuracy percentages.
- Completed quiz counts.
- Individual quiz performance.
- Persistent results across browser refreshes.

## 4. Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | App Router, page routing, metadata and static generation |
| React | Component-based user interface and interactive state |
| TypeScript | Type safety, interfaces and typed component props |
| Tailwind CSS | Utility-based styling |
| CSS | Custom layouts, animations and responsive design |
| SVG | Illustrated panoramic scenery and visual assets |
| JSON | Structured mock quiz data |
| localStorage | Persistent profiles, bookmarks and quiz results |
| Git and GitHub | Version control and team collaboration |

## 5. Installation and Execution

### Prerequisites

- Node.js 22 LTS or a compatible newer version
- npm
- Git

### Clone the Repository

```bash
git clone https://github.com/i242100-jpg/WEB_PROJ.git
cd WEB_PROJ
```

### Install Dependencies

```bash
npm ci
```

### Start the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in a web browser.

### Production Build

```bash
npm run build
npm start
```

No external database, API keys or environment variables are required.

## 6. Application Routes

| Route | Description |
|---|---|
| `/` | Animated Passage and homepage |
| `/quizzes` | Archive containing all quiz collections |
| `/quizzes/[id]` | Dynamic quiz details and gameplay |
| `/quizzes/education` | Timed Education challenges |
| `/scores` | Personalized Observatory and scorebook |
| `/profile` | Explorer profile management |
| `/about` | Application information and collection descriptions |
| Invalid route | Custom not-found page |

Dynamic quiz routes use generated static parameters and metadata. Invalid quiz identifiers are handled using `notFound()`. The Archive also includes a loading boundary.

## 7. Reusable Components

| Component | Responsibility |
|---|---|
| AtlasLayout | Shared page layout, scenery and navigation |
| QuizCard | Reusable quiz cards and optional bookmark controls |
| QuizSearch | Search, sorting, filtering and bookmark management |
| PhotoQuestion | Display of photographic quiz questions |
| AnswerReview | Review of completed quiz answers |
| QuizTimer | Countdown display for timed questions |
| PlayerForm | Profile creation, selection, renaming and validation |
| SectionHeading | Reusable section headings |
| GKPerformance | General Knowledge performance statistics |

The application uses typed component props, reusable UI elements, Server Components for route wrappers, and Client Components for interactive functionality.

QuizCard is reused in the Archive and quiz detail pages with different configurations.

## 8. Data Management

Quiz content is stored in structured JSON files containing quiz identifiers, categories, titles, questions, answer options and result information.

The application uses localStorage for:

- Saved explorer profiles.
- Active player selection.
- Personal Education quiz results.
- Personal General Knowledge quiz results.
- Quiz bookmarks.

Player-specific score keys use unique profile identifiers rather than profile names. This allows users to rename their profiles without losing previous results.

Bookmarks are stored at browser level. Profiles and scores are specific to the browser and website origin.

The application does not use a backend database or real authentication system.

## 9. Responsive Design

The website supports mobile, tablet and desktop layouts.

Testing was performed at the following viewport widths:

- 375px: Mobile
- 768px: Tablet
- 1280px: Desktop
- 1920px: Large desktop

Responsive layouts, flexible grids, media queries, readable typography, keyboard focus indicators and consistent spacing are used throughout the application.

## 10. Individual Contributions

| Member | Implementation and Responsibilities |
|---|---|
| Iraj Aslam | Animated homepage, panoramic navigation, visual design, shared layout, core frontend implementation, quiz engine, Education question bank and timed challenges, Observatory, score tracking, responsive design, GitHub integration, testing and final styling corrections. |
| Adeeba Sohail | Series and Personality question banks, Archive enhancements, alphabetical sorting, question-count sorting, persistent bookmarks, bookmarked-only filtering, reusable quiz card improvements, accessibility and functional testing.|
| Hajra Tariq | University and General Knowledge question banks, profile management enhancements, profile renaming, name validation, score preservation, GK accuracy calculations, individual quiz performance reporting and testing. |

## 11. GitHub Collaboration

The project was developed using a shared GitHub repository, individual commits, feature branches and pull requests.

| Branch | Purpose |
|---|---|
| `main` | Stable integrated application |
| `integration` | Complete frontend baseline |
| `feature/archive` | Archive functionality enhancements |
| `feature/profile-gk` | Profile management and GK reporting |
| `fix/final-polish` | Final card spacing and styling corrections |

Feature implementations were reviewed and tested before merging into the main branch. Previous commits and individual contribution histories were preserved.

## 12. Testing and Validation

The following commands were used to verify the application:

```bash
npm run lint
npx tsc --noEmit
node scripts/check-data.cjs
npm run build
```

### Verification Results

| Test | Result |
|---|---|
| ESLint | Passed |
| TypeScript compilation | Passed |
| Quiz data validation | Passed |
| Production build | Passed |
| Dynamic routing and invalid routes | Passed |
| Search, sorting and category filtering | Passed |
| Bookmark persistence | Passed |
| Profile creation and validation | Passed |
| Profile renaming | Passed |
| Personal score preservation | Passed |
| GK performance calculations | Passed |
| Education timer and scoring | Passed |
| Responsive layouts | Passed |
| Combined feature integration | Passed |

## 13. Repository and Demonstration

GitHub Repository: https://github.com/i242100-jpg/WEB_PROJ
Vercel Deployement Link: https://web-proj-rho.vercel.app/

## 14. AI Tool Usage

ChatGPT was used throughout the development process to assist with:

- Frontend prototyping and interface design.
- SVG scenery and visual concepts.
- React and TypeScript implementation.
- Quiz logic and structured data.
- Profile management and score reporting.
- Debugging and responsive styling.
- Code review and testing guidance.
- GitHub collaboration and documentation.

The project involved AI-assisted development, manual testing, implementation review and integration by the group members.

## 15. Asset Credits

The passage illustration incorporates traced storyboard artwork from Kurzgesagt's [We Finally Know More About Humanity's First Civilization](https://www.youtube.com/watch?v=_y9JuojAIg0).

Photographic source and license information is available in:

`public/snapshots/credits.txt`

## 16. Limitations

- Profiles are local browser profiles, not authenticated accounts.
- Scores and bookmarks are not synchronized across devices.
- Only the latest completed attempt for each scored quiz is retained.
- Quiz content is based on frontend mock data.
- Clearing browser storage removes locally saved information.

---

**Quiz Atlas | Explore. Discover. Learn.**