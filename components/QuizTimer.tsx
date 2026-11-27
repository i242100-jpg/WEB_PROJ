export interface QuizTimerProps {seconds:number;paused:boolean}
export default function QuizTimer({seconds,paused}:QuizTimerProps) {return <div className="ed-track" aria-label="Time remaining" role="progressbar" aria-valuenow={seconds} aria-valuemin={0} aria-valuemax={10}><i style={{animationPlayState:paused?'paused':'running'}}/></div>}
