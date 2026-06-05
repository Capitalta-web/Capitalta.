import dynamic from 'next/dynamic';

const Brokers = dynamic(() => import('@/views/landings/default/brokers'));

export const metadata = {
  title: 'Brokers | Capitalta',
  description: 'Únete a nuestra red de brókers. Deja tu correo y te contactamos para iniciar el proceso.'
};

export default function BrokersPage() {
  return <Brokers />;
}

