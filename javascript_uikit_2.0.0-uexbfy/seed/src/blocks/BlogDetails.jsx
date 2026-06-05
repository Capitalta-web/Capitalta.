import PropTypes from 'prop-types';
// @mui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import { ProfileCard2 } from '@/components/cards/profile-card';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import { NextLink } from '@/components/routes';
import SvgIcon from '@/components/SvgIcon';

import { IconType } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

import { Avatar, Link } from '@mui/material';

/*************************** SECTIONS - BLOG DETAILS ***************************/

export default function BlogDetails({ date, heading, image, socialIcons, mainImage, title, description, subTitle, blogDetails }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4, md: 5 } }}>
        <Stack sx={{ gap: { xs: 2, sm: 2.25, md: 2.5 } }}>
          <Typography variant="subtitle1" sx={{ color: 'grey.700' }}>
            {date}
          </Typography>
          <Typography variant="h2" sx={{ width: { xs: '100%', md: '85%' } }}>
            {heading}
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 1.5 }}
          >
            <ProfileCard2 avatar={image.src} name={image.name} role={image.role} />
            <Stack direction="row" sx={{ gap: 0.75, alignItems: 'center' }}>
              {socialIcons.map((item, index) => (
                <Link
                  component={NextLink}
                  key={index}
                  {...item.link}
                  sx={{ opacity: 0.4, '&:hover': { opacity: 1 }, ...item.link?.sx }}
                  rel="noopener noreferrer"
                  aria-label="follow us on social media"
                >
                  <Avatar
                    variant="rounded"
                    sx={{ bgcolor: 'transparent', width: 40, height: 40, borderRadius: 3, ':hover': { bgcolor: 'grey.300' } }}
                  >
                    <SvgIcon type={IconType.FILL} {...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon })} />
                  </Avatar>
                </Link>
              ))}
            </Stack>
          </Stack>
        </Stack>

        <GraphicsCard>
          <GraphicsImage image={mainImage} sx={{ height: { xs: 212, sm: 332, md: 600 } }} />
        </GraphicsCard>

        <Stack sx={{ gap: { xs: 2, sm: 3, md: 4 } }}>
          <Box>
            <Typography variant="h3">{title}</Typography>
            <Typography sx={{ color: 'text.secondary', mt: 2 }}>{description}</Typography>
          </Box>
          <Box>
            <Typography variant="h3" sx={{ mb: 2 }}>
              {subTitle}
            </Typography>

            {blogDetails.map((detail, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h4" sx={{ mb: { xs: 1, sm: 1.5 } }}>
                  {index + 1}. {detail.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{detail.content}</Typography>
                <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                  {detail.heading1}
                </Typography>

                {detail.dotList && (
                  <List>
                    {detail.dotList.map((item, index) => (
                      <ListItem key={index} sx={{ py: 0.2, alignItems: 'flex-start' }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <Box sx={{ width: 6, height: 6, bgcolor: 'secondary.main', borderRadius: '50%' }} />
                        </ListItemIcon>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          <strong>{item.title}</strong> {item.description}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                )}

                <Typography sx={{ color: 'text.secondary' }}>
                  {detail.heading2}
                  <strong>{detail.title1}</strong>
                </Typography>
              </Box>
            ))}
          </Box>
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}

BlogDetails.propTypes = {
  date: PropTypes.any,
  heading: PropTypes.any,
  image: PropTypes.any,
  socialIcons: PropTypes.any,
  mainImage: PropTypes.any,
  title: PropTypes.any,
  description: PropTypes.any,
  subTitle: PropTypes.any,
  blogDetails: PropTypes.any
};
