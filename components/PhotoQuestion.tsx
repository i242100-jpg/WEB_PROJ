import Image from 'next/image';
export interface PhotoQuestionProps {photo:number}
export default function PhotoQuestion({photo}:PhotoQuestionProps) {return <Image src={'/snapshots/'+photo+'.jpg'} alt="Cropped portrait clue" width={380} height={150} unoptimized className="mx-auto my-3 h-auto max-w-full"/>}
