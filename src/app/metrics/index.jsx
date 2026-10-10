// @third-party
import { SpeedInsights } from '@vercel/speed-insights/next';

// @project
import GTag from './GTag';
import MicrosoftClarity from './MicrosoftClarity';

const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID || '';
const gaId = process.env.NEXT_PUBLIC_ANALYTICS_ID || '';

/***************************  METRICS  ***************************/

export default function Metrics() {
  return (
    <>
      <SpeedInsights />
      {clarityId && <MicrosoftClarity clarityId={clarityId} />}
      {gaId && <GTag gaId={gaId} />}
    </>
  );
}
