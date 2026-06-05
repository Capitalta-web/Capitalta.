// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  PRIVACY POLICY 2 - DATA  ***************************/

const policyItems = [
  {
    heading: '1. Information we collect personal data',
    caption:
      'Includes name, email, address, phone number, and payment information. Usage Data: Information about your visit, such as IP address, browser type, and pages viewed. Cookies: We use cookies to enhance your experience and analyze service performance.'
  },
  {
    heading: '2. How we use your information',
    caption: 'Provide and maintain the Service Process transactions Improve our Service Comply with legal obligations'
  },
  {
    heading: '3. Sharing your information',
    caption: 'Service Providers: Trusted third parties assisting us. Legal Compliance: To comply with laws or protect our rights.'
  },
  {
    heading: '4. Data security',
    caption: 'We implement reasonable measures to protect your data, but no method of transmission is completely secure.'
  },
  {
    heading: '5. Your rights',
    caption:
      'You have rights including access, rectification, deletion, and objection to the processing of your personal data. To exercise these rights, contact us at info@Capitalta.com.'
  },
  {
    heading: '6. Data retention',
    caption: 'We retain your personal data only as long as necessary for the purposes it was collected.'
  },
  {
    heading: '7. Third-party links',
    caption: 'Our Service may contain links to other websites. We are not responsible for their privacy practices.'
  },
  {
    heading: '8. Illustration notice',
    caption:
      'The feature images included in this template are non-editable within Framer. They serve as static visual elements for design purposes. If you require editable images, please consider customizing your own assets externally.'
  },
  {
    heading: '9. Refund policy',
    caption:
      'This is a one-time purchase, and all sales are final. Once the product is purchased, it is non-refundable. Kindly ensure that the product meets your needs before making your purchase.'
  },
  {
    heading: '10. Contact us',
    caption: 'For questions about this Privacy Policy, contact us at: info@Capitalta.com'
  }
];

/***************************  PRIVACY POLICY - 2 ***************************/

/**
 *
 * Demos:
 * - [PrivacyPolicy2](https://www.Capitalta.io/blocks/privacy-policy/privacy-policy2)
 */

export default function PrivacyPolicy2() {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      {policyItems.map((item, index) => (
        <Stack key={index} sx={{ py: { xs: 1, sm: 1.5, md: 3 }, px: { md: 3 }, gap: 1, '&:first-of-type': { pt: { sm: 0 } } }}>
          <Typography variant="h4">{item.heading}</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {item.caption}
          </Typography>
        </Stack>
      ))}
    </ContainerWrapper>
  );
}
