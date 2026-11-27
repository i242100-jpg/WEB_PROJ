import SectionHeading from '@/components/SectionHeading';import PlayerForm from '@/components/PlayerForm';
export const metadata={title:'Explorer profile',description:'Create a simulated Quiz Atlas explorer profile.'};
export default function Profile(){return <><SectionHeading title="Explorer profile" description="Create or select a named profile to keep your own quiz scores." back="/"/><PlayerForm/></>}
