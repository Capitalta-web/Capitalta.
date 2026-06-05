'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// @project
import SvgIcon from '@/components/SvgIcon';
import { IconType } from '@/enum';

const tablerIcon = [
  'tabler-home',
  'tabler-user',
  'tabler-lock',
  'tabler-mail',
  'tabler-chart-bar',
  'tabler-credit-card',
  'tabler-phone',
  'tabler-help-circle',
  'tabler-brand-apple',
  'tabler-coin',
  'tabler-brain',
  'tabler-route',
  'tabler-database',
  'tabler-devices-code',
  'tabler-briefcase',
  'tabler-sparkles',
  'tabler-users',
  'tabler-settings-up',
  'tabler-artboard'
];

const fillIcon = [
  'tabler-filled-brand-github',
  'tabler-filled-discord',
  'tabler-filled-facebook',
  'tabler-filled-dribble',
  'tabler-filled-instagram',
  'tabler-filled-linkedin',
  'tabler-filled-star',
  'tabler-filled-star2',
  'tabler-filled-youtube'
];

const customIcon = [
  'custom-ai',
  'custom-arrow',
  'custom-book',
  'custom-brain',
  'custom-calander',
  'custom-card',
  'custom-celebration',
  'custom-check',
  'custom-code',
  'custom-coin',
  'custom-data',
  'custom-data-switch',
  'custom-debitcard',
  'custom-developer',
  'custom-doller',
  'custom-folder',
  'custom-help',
  'custom-interface',
  'custom-lock',
  'custom-notes',
  'custom-path',
  'custom-remote',
  'custom-scoreboard',
  'custom-statastic',
  'custom-target',
  'custom-transfer',
  'custom-wallet'
];

const linkProps = { component: NextLink, target: '_blank', underline: 'hover', rel: 'noopener noreferrer' };

/***************************  ICON AVATAR  ***************************/

// Component to display an icon in an avatar with a tooltip and copy functionality
function IconAvatar({ icon, type = IconType.STROKE }) {
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {})
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <Tooltip
      slotProps={{
        tooltip: { sx: { color: 'primary.dark', bgcolor: 'secondary.lighter', borderRadius: 3 } },
        arrow: { sx: { color: 'secondary.lighter' } }
      }}
      arrow
      title={
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mx: 1 }}>
            {icon}
          </Typography>
          <IconButton size="small" onClick={() => copyToClipboard(icon)} rel="noopener noreferrer" aria-label="icon-copy">
            <SvgIcon name="tabler-copy" size={20} color="primary.dark" />
          </IconButton>
        </Stack>
      }
    >
      <Avatar variant="rounded" sx={{ cursor: 'pointer', bgcolor: 'grey.100', width: 72, height: 72, borderRadius: 4 }}>
        <SvgIcon name={icon} size={32} type={type} />
      </Avatar>
    </Tooltip>
  );
}

/***************************  ICON  ***************************/

/**
 *
 * Demos:
 * - [Icon](https://www.saasable.io/sections/icon)
 */

export default function Icon() {
  return (
    <Stack sx={{ gap: 3, mb: 6 }}>
      <Typography variant="h3" sx={{ mt: 3 }}>
        Tabler icons
      </Typography>
      <Stack direction="row" sx={{ alignItems: 'center', flexWrap: 'wrap', gap: { xs: 2, sm: 4 } }}>
        {tablerIcon.map((icon, index) => (
          <IconAvatar key={index} icon={icon} />
        ))}
        <Link href="https://tabler.io/icons" {...linkProps}>
          more...
        </Link>
      </Stack>
      <Typography variant="h3" sx={{ mt: 3 }}>
        Fill icons
      </Typography>
      <Stack direction="row" sx={{ alignItems: 'center', flexWrap: 'wrap', gap: { xs: 2, sm: 4 } }}>
        {fillIcon.map((icon, index) => (
          <IconAvatar key={index} icon={icon} type={IconType.FILL} />
        ))}
        <Link href="https://phoenixcoded.gitbook.io/saasable/ui-kit/theming/icon/tabler#tabler-fill-icons" {...linkProps}>
          docs...
        </Link>
      </Stack>
      <Typography variant="h3" sx={{ mt: 3 }}>
        Custom icons
      </Typography>
      <Stack direction="row" sx={{ alignItems: 'center', flexWrap: 'wrap', gap: { xs: 2, sm: 4 } }}>
        {customIcon.map((icon, index) => (
          <IconAvatar key={index} icon={icon} type={IconType.CUSTOM} />
        ))}
        <Link href="https://phoenixcoded.gitbook.io/saasable/ui-kit/theming/icon/custom-two-tone" {...linkProps}>
          docs...
        </Link>
      </Stack>
    </Stack>
  );
}

ality.propTypes = { icon: PropTypes.string, type: PropTypes.any };
