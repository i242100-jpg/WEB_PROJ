import Link from "next/link";

export const metadata = {
  title: "The Archive",
  description: "The four Quiz Atlas collections.",
};

export default function QuizzesPage() {
  return (
    <>
      <Link className="back" href="/">
        Return to the passage
      </Link>
      <h1>
        The
        <br />
        <em>Archive</em>
      </h1>
      <p>Quiz collections</p>
      <ul className="space-y-2">
        {["Series", "Personalities", "Uni", "General Knowledge"].map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </>
  );
}
