import Link from "next/link";

export const metadata = {
  title: "The Observatory",
  description: "The Quiz Atlas scorebook.",
};

export default function ScoresPage() {
  return (
    <>
      <Link className="back" href="/">
        Return to the passage
      </Link>
      <h1>
        The
        <br />
        <em>Observatory</em>
      </h1>
      <p>Your scorebook is empty. Completed quizzes will appear here.</p>
    </>
  );
}
