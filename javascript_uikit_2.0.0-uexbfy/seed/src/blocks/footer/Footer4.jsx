// @mui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import { Copyright, FollowUS, Sitemap } from '@/components/footer';
import LogoSection from '@/components/logo';

import { CopyrightType } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FOOTER - 4 DATA  ***************************/

/**
 *
 * Demos:
 * - [Footer4](https://www.saasable.io/blocks/footer/footer4)
 */

const data = [
  {
    id: 'product',
    grid: { size: { xs: 6, sm: 'auto' } },
    title: 'Product',
    menu: [
      {
        label: 'What’s New',
        link: { href: '#' }
      },
      {
        label: 'Integration',
        link: { href: '#' }
      },
      {
        label: 'Features',
        link: { href: '#' }
      },
      {
        label: 'Workflow',
        link: { href: '#' }
      },
      {
        label: 'Pricing',
        link: { href: '#' }
      },
      {
        label: 'API Docs',
        link: { href: '#' }
      }
    ]
  },
  {
    id: 'download',
    grid: { size: { xs: 6, sm: 'auto' } },
    title: 'Download',
    menu: [
      {
        label: 'iOS & Android',
        link: { href: '#' }
      },
      {
        label: 'Mac & Windows',
        link: { href: '#' }
      },
      {
        label: 'Calendar',
        link: { href: '#' }
      },
      {
        label: 'Web Clipper',
        link: { href: '#' }
      }
    ]
  },
  {
    id: 'resource',
    grid: { size: { xs: 6, sm: 'auto' } },
    title: 'Resource',
    menu: [
      {
        label: 'Pricing',
        link: { href: '#' }
      },
      {
        label: 'Blog',
        link: { href: '#' }
      },
      {
        label: 'White paper',
        link: { href: '#' }
      },
      {
        label: 'Help Center',
        link: { href: '#' }
      },
      {
        label: 'Webinars',
        link: { href: '#' }
      },
      {
        label: 'Community',
        link: { href: '#' }
      }
    ]
  },
  {
    id: 'company',
    grid: { size: { xs: 6, sm: 'auto' } },
    title: 'Company',
    menu: [
      {
        label: 'About',
        link: { href: '#' }
      },
      {
        label: 'Career',
        link: { href: '#' }
      },
      {
        label: 'Contact us',
        link: { href: '#' }
      },
      {
        label: 'Privacy Policy',
        link: { href: '#' }
      },
      {
        label: 'Terms & Conditions',
        link: { href: '#' }
      }
    ]
  },
  {
    id: 'get-started',
    grid: { size: { xs: 6, sm: 'auto' } },
    title: 'Get started',
    menu: [
      {
        label: 'Switch from Confluence',
        link: { href: '#' }
      },
      {
        label: 'Switch from Asana',
        link: { href: '#' }
      },
      {
        label: 'Compare vs Jira',
        link: { href: '#' }
      },
      {
        label: 'Compare vs Clickup',
        link: { href: '#' }
      }
    ]
  }
];

/***************************  FOOTER - 4  ***************************/

export default function Footer4() {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack id="footer-4" role="contentinfo" rel="noopener noreferrer" aria-label="Footer 4" sx={{ gap: { xs: 3, sm: 4, md: 5 } }}>
        <Box sx={{ px: { xs: 2, sm: 3, md: 8 } }}>
          <Sitemap list={data} isMenuDesign />
        </Box>
        <GraphicsCard sx={{ borderRadius: { xs: 6, sm: 8 } }}>
          <Stack
            direction={{ sm: 'row' }}
            sx={{ alignItems: 'center', justifyContent: { xs: 'center', sm: 'space-between' }, gap: { xs: 3, sm: 4 }, p: 3 }}
          >
            <LogoSection />
            <Box sx={{ display: { xs: 'block', sm: 'none', md: 'block' } }}>
              <Copyright type={CopyrightType.TYPE3} />
            </Box>
            <FollowUS heading={false} />
          </Stack>
          <Box sx={{ pb: 3, display: { xs: 'none', sm: 'block', md: 'none' } }}>
            <Copyright type={CopyrightType.TYPE3} />
          </Box>
        </GraphicsCard>
      </Stack>
    </ContainerWrapper>
  );
}
