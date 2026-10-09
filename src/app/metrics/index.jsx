// @third-party
import { SpeedInsights } from '@vercel/speed-insights/next';

// @project
import GTag from './GTag';
import MicrosoftClarity from './MicrosoftClarity';

const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID || '';
const gaId = process.env.NEXT_PUBLIC_ANALYTICS_ID || '';

/***************************  METRICS  ***************************/
// Se quitó el pixel "Notify" de la plantilla (fomo.codedthemes.com): no es de Capitalta y la CSP ya no lo permite.

export default function Metrics() {
  return (
    <>
      <SpeedInsights />
      {clarityId && <MicrosoftClarity clarityId={clarityId} />}
      {gaId && <GTag gaId={gaId} />}
    </>
  );
}
