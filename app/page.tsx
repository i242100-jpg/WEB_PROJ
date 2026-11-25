import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <h1>
        The
        <br />
        <em>Passage</em>
      </h1>
      <p>Follow the torch. Choose your path.</p>
      <nav aria-label="Explore the atlas">
        <Link href="/quizzes">
          <span>Quizzes</span>
          <small>Explore four collections</small>
        </Link>
        <Link href="/scores">
          <span>Scorebook</span>
          <small>Scores and wisdom badges</small>
        </Link>
      </nav>
    </>
  );
}
