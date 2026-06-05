// @mui
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { Copyright, FollowUS } from '@/components/footer';
import LogoSection from '@/components/logo';
import { NavMenu } from '@/components/navbar';

import { CopyrightType, MegaMenuType } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FOOTER - 6 DATA  ***************************/

/**
 *
 * Demos:
 * - [Footer6](https://www.Capitalta.io/blocks/footer/footer6)
 */

const navItems = [
  { id: 'overview', title: 'Overview' },
  { id: 'products', title: 'Products' },
  { id: 'pricing', title: 'Pricing' },
  {
    id: 'resource',
    title: 'Resource',
    expanded: true,
    megaMenu: {
      type: MegaMenuType.MEGAMENU2,
      toggleBtn: { children: 'Resource', size: 'small', sx: { color: 'text.primary', py: 1.5 } },
      menuItems: [
        {
          title: 'Blog',
          content: 'Ducimus dignissimos blanditiis.'
        },
        {
          title: 'Help center',
          content: 'Occaecati ut suscipit veritatis enim necessitatibus commodi.',
          selected: true
        },
        {
          title: 'Guides',
          content: 'Sint sit et consequatur consequatur assumenda ipsam dolores autem sint.'
        },
        {
          title: 'Events',
          content: 'Dolorem dolores dolores aut odio.'
        },
        {
          title: 'Security',
          content: 'Ut eos nam laudantium ut.'
        },
        {
          title: 'Payments',
          content: 'Get of your question answered'
        }
      ]
    }
  },
  { id: 'help', title: 'Help' }
];

/***************************  FOOTER - 6  ***************************/

export default function Footer6() {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack id="footer-6" role="contentinfo" rel="noopener noreferrer" aria-label="Footer 6" sx={{ gap: { xs: 3, sm: 4, md: 5 } }}>
        <Stack sx={{ alignItems: 'center', justifyContent: 'center', gap: { xs: 3, sm: 4 } }}>
          <LogoSection />
          <Stack direction="row" sx={{ justifyContent: 'center', flexWrap: 'wrap' }}>
            <NavMenu {...{ navItems }} />
          </Stack>
        </Stack>
        <Divider />
        <Stack direction={{ md: 'row' }} sx={{ alignItems: 'center', justifyContent: { xs: 'center', md: 'space-between' }, gap: 4 }}>
          <FollowUS heading={false} color="background.default" />
          <Copyright type={CopyrightType.TYPE2} isDivider={false} />
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}
