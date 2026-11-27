import QuizSearch from "@/components/QuizSearch";
import {catalog} from "./catalog";
import Link from "next/link";

export const metadata = {
  title: "The Archive",
  description: "The Quiz Atlas collections.",
};

export default function QuizzesPage() {
  return (
    <div className="archive-shell">
      <div className="archive-intro">
        <div>
          <div className="archive-kicker">✧ &nbsp; THE QUIZ ATLAS COLLECTIONS</div>
          <h1>The <em>Archive</em></h1>
          <p>Choose a collection, follow your curiosity, and discover something new.</p>
        </div>
        <Link className="back archive-return" href="/">← Return to the Passage</Link>
      </div>
      <QuizSearch quizzes={catalog}/>
    </div>
  );
}
