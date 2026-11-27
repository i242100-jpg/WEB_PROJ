import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
export const metadata={title:'About',description:'Discover the five Quiz Atlas collections, how to play and how personal scores work.'};
const collections = [
 {category:'Series',name:'Series',symbol:'✦',description:'Discover which 3 Idiots character, Hogwarts house or Pakistani OST matches your choices. These are untimed entertainment quizzes with illustrated results, not scores.'},
 {category:'Personality',name:'Personality',symbol:'☾',description:'Explore mental age, red or green flags and supernatural archetypes through playful scenarios. There are no right or wrong answers.'},
 {category:'Uni',name:'University',symbol:'♜',description:'Explore university-themed factual questions. Check the correct answers as you play and review them at the end. These quizzes do not add coins to your scorebook.'},
 {category:'General Knowledge',name:'General Knowledge',symbol:'◎',description:'Challenge your knowledge with untimed questions, including cropped photographic clues. Earn one coin per correct answer and review your mistakes.'},
 {category:'Education',name:'Education',symbol:'◇',description:'Take three subject challenges with five questions each and ten seconds per answer. Earn one coin per correct answer, for a combined maximum of 15 coins.'}
];
export default function About(){return <>
 <SectionHeading title="About the Atlas" description="An illustrated journey through five quiz collections." back="/"/>
 <p className="about-lead">Quiz Atlas turns curiosity into an adventure. Begin in the torchlit Passage, explore the Archive, and return to the Observatory to see how much you have discovered. Choose a playful match quiz or challenge your factual knowledge at your own pace.</p>
 <h2 className="about-subheading">Five collections to explore</h2>
 <div className="about-grid">{collections.map(c=><article key={c.category} className="about-card" data-category={c.category}><span className="archive-symbol" aria-hidden="true">{c.symbol}</span><h3>{c.name}</h3><p>{c.description}</p></article>)}</div>
 <h2 className="about-subheading">Your journey through the Atlas</h2>
 <ol className="about-steps"><li><strong>01 · The Passage</strong>Follow the torch and use the top navigation to open the Archive, About, Profile or My scores.</li><li><strong>02 · The Archive</strong>Search by title or select a collection. Open a quiz card to see its rules, then start the challenge.</li><li><strong>03 · Your profile</strong>Create or select a named profile before playing a scored quiz. Each profile has its own results.</li><li><strong>04 · The Observatory</strong>Open My scores to view your latest Education and GK results. Replaying a quiz replaces its previous score.</li></ol>
 <h2 className="about-subheading">How scoring works</h2>
 <p>Correct answers in General Knowledge and Education earn one coin. Incorrect answers and Education timeouts earn zero. Correct answers are shown in green and incorrect selections in red. Scores and profiles are saved locally in this browser; there is no real login, server or database.</p>
 <div className="about-links"><Link className="back" href="/quizzes">Explore the Archive →</Link><Link className="back" href="/profile">Choose a profile →</Link><Link className="back" href="/scores">View my scores →</Link></div>
 </>}
