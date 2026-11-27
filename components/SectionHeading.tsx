import Link from 'next/link';
export interface SectionHeadingProps {title:string;description:string;back?:string}
export default function SectionHeading({title,description,back='/quizzes'}:SectionHeadingProps) {return <><Link className="back" href={back}>← Return</Link><h1>{title}</h1><p>{description}</p></>}
