import dynamic from 'next/dynamic';

const Brokers = dynamic(() => import('@/views/landings/default/brokers'));

export const metadata = {
  title: 'Brokers | Capitalta',
  description:
    'Súmate a nuestra red de brokers financieros: identifica necesidades de financiamiento, orienta al cliente con claridad y canaliza operaciones con transparencia.'
};

export default function BrokersPage() {
  return <Brokers />;
}
