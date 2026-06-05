import PropTypes from 'prop-types';
// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

// @project
import { ProfileCard1 } from '@/components/cards/profile-card';
import ContainerWrapper from '@/components/ContainerWrapper';
import { SECTION_COMMON_PY } from '@/utils/constant';
import Typeset from '@/components/Typeset';

/***************************  TEAM - 1  ***************************/

/**
 *
 * Demos:
 * - [Team1](https://www.saasable.io/blocks/team/team1)
 *
 * API
 * - [Team1 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/team/team1#props-details)
 */

export default function Team1({ heading, caption, members }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: 4 }}>
        <Typeset {...{ heading, caption }} />
        <Grid container spacing={1.5}>
          {members.map((item, index) => (
            <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }}>
              <ProfileCard1 {...item} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Team1.propTypes = { heading: PropTypes.any, caption: PropTypes.any, members: PropTypes.any };
