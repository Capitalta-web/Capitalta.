import PropTypes from 'prop-types';
// @mui
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

// @project
import branding from '@/branding.json';
import { NextLink } from '../routes';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { IconType } from '@/enum';

/***************************  FOLLOW US - DATA  ***************************/

const linkProps = { target: '_blank', rel: 'noopener noreferrer' };
const socialIcons = [
  {
    icon: 'tabler-brand-facebook',
    link: { href: `${branding.company.socialLink.facebook}`, ...linkProps }
  },
  {
    icon: 'tabler-brand-instagram',
    link: { href: `${branding.company.socialLink.instagram}`, ...linkProps }
  },
  {
    icon: 'tabler-brand-tiktok',
    link: { href: `${branding.company.socialLink.tiktok}`, ...linkProps }
  },
  {
    icon: 'tabler-brand-linkedin',
    link: { href: `${branding.company.socialLink.linkedin}`, ...linkProps }
  }
];

/***************************  FOOTER - FOLLOW US  ***************************/

export default function FollowUS({ heading = true, color }) {
  return (
    <Stack sx={{ alignItems: { xs: 'center', md: 'flex-start' }, gap: 2, textAlign: { xs: 'center', md: 'left' } }}>
      {heading && <Typeset {...{ heading: typeof heading === 'string' ? heading : 'Follow us on', headingProps: { variant: 'h4' } }} />}
      <Stack direction="row" sx={{ gap: { xs: 0.5, sm: 1.5 } }}>
        {socialIcons.map((item, index) => (
          <Link
            component={NextLink}
            key={index}
            {...item.link}
            sx={{ ...item.link?.sx }}
            rel="noopener noreferrer"
            aria-label="follow us on social media"
          >
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: 'transparent',
                width: { xs: 40, sm: 52, lg: 56 },
                height: { xs: 40, sm: 52, lg: 56 },
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                color: 'text.primary',
                ':hover': { 
                  bgcolor: 'primary.main', 
                  color: 'common.white',
                  borderColor: 'primary.main' 
                },
                transition: 'all 0.3s ease'
              }}
            >
              <SvgIcon 
                type={IconType.STROKE} 
                {...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon })} 
                size={24}
                stroke={1.5}
              />
            </Avatar>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}

FollowUS.propTypes = { heading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]), color: PropTypes.string };
