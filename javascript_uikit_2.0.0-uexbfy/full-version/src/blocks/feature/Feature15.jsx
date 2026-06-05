'use client';
import PropTypes from 'prop-types';

// @mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FEATURE - BLOCK CONTENT ***************************/

function BoxContent({ icon, title, description, stackProps }) {
  return (
    (icon || title || description) && (
      <Stack sx={{ gap: { xs: 2, md: 3 }, position: 'relative', maxWidth: { xs: '80%', sm: 280, md: 320 }, ...stackProps?.sx }} {...stackProps}>
        {icon && (
          <Avatar sx={{ bgcolor: 'grey.300', width: { xs: 48, md: 60 }, height: { xs: 48, md: 60 }, borderRadius: 10 }}>
            <SvgIcon {...(typeof icon === 'string' ? { name: icon } : { ...icon })} />
          </Avatar>
        )}
        <Stack sx={{ gap: 1 }}>
          {title && <Typography variant="h3">{title}</Typography>}
          {description && <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>}
        </Stack>
      </Stack>
    )
  );
}

/***************************  FEATURE - CARD  ***************************/

function CardBlock({ image, title, description, icon, list, description2, actionBtn, actionBtn2, imageSx, inlineImage }) {
  const boxPadding = { xs: 3, md: 5 };

  const renderContent = (overrideMaxWidth = false) => (
    <Stack sx={{ height: 1, justifyContent: 'space-between', gap: inlineImage ? 3 : 7 }}>
      <BoxContent
        {...{ icon, title, description }}
        stackProps={overrideMaxWidth ? { sx: { maxWidth: '100%' } } : undefined}
      />
      {image && inlineImage && (
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: 1,
            height: 200,
            objectFit: 'cover',
            borderRadius: 2,
            ...imageSx
          }}
        />
      )}
      <Stack sx={{ gap: 2, alignItems: 'flex-start' }}>
        {list && (
          <List disablePadding sx={{ maxWidth: 320 }}>
            {list.map((item, index) => (
              <ListItem disablePadding key={index} sx={{ py: 0.25 }}>
                <ListItemAvatar sx={{ minWidth: 32, height: 24 }}>
                  <SvgIcon name="tabler-rosette-discount-check" stroke={1} color="grey.800" />
                </ListItemAvatar>
                <ListItemText>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.primary}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        )}
        {description2 && <Typography>{description2}</Typography>}
        {actionBtn && <Button variant="contained" color="primary" {...actionBtn} />}
        {actionBtn2 && <Button variant="outlined" color="primary" {...actionBtn2} />}
      </Stack>
    </Stack>
  );

  if (image && !inlineImage) {
    return (
      <GraphicsCard sx={{ height: 1, overflow: 'hidden' }}>
        <Grid container sx={{ height: 1 }}>
          <Grid size={{ xs: 12, md: 7 }} sx={{ p: boxPadding }}>
            {renderContent(true)}
          </Grid>
          <Grid size={{ xs: 12, md: 5 }} sx={{ position: 'relative', minHeight: { xs: 200, md: 'auto' } }}>
            <GraphicsImage
              image={image}
              sx={{
                width: 1,
                height: 1,
                objectFit: 'cover',
                ...imageSx
              }}
            />
          </Grid>
        </Grid>
      </GraphicsCard>
    );
  }

  return (
    <GraphicsCard sx={{ height: 1, position: 'relative' }}>
      <Box sx={{ p: boxPadding, height: 1 }}>
        {renderContent()}
      </Box>
    </GraphicsCard>
  );
}

/***************************  FEATURE - 15  ***************************/

/**
 *
 * Demos:
 * - [Feature15](https://www.Capitalta.io/blocks/feature/feature15)
 *
 * API
 * - [Feature15 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/feature/feature15#props-details)
 */

export default function Feature15({ heading, caption, blockData1, blockData2, blockData3, blockData4 }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Typeset
          {...{
            heading,
            caption,
            captionProps: { sx: { maxWidth: { sm: 630, md: 760 }, mx: 'auto' } },
            stackProps: { sx: { textAlign: 'center' } }
          }}
        />
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 7.5 }}>
            <CardBlock
              {...{
                image: blockData1.image,
                title: blockData1.title,
                description: blockData1.description,
                icon: blockData1.icon,
                list: blockData1.list,
                actionBtn: blockData1.actionBtn,
                imageSx: blockData1.imageSx
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4.5 }}>
            <CardBlock
              {...{
                image: blockData2.image,
                title: blockData2.title,
                description: blockData2.description,
                icon: blockData2.icon,
                description2: blockData2.description2,
                actionBtn2: blockData2.actionBtn2,
                inlineImage: true,
                imageSx: blockData2.imageSx
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4.5 }}>
            <CardBlock
              {...{
                image: blockData3.image,
                title: blockData3.title,
                description: blockData3.description,
                icon: blockData3.icon,
                description2: blockData3.description2,
                actionBtn2: blockData3.actionBtn2,
                inlineImage: true,
                imageSx: blockData3.imageSx
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 7.5 }}>
            <CardBlock
              {...{
                image: blockData4.image,
                title: blockData4.title,
                description: blockData4.description,
                icon: blockData4.icon,
                list: blockData4.list,
                actionBtn: blockData4.actionBtn,
                imageSx: blockData4.imageSx
              }}
            />
          </Grid>
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

BoxContent.propTypes = { icon: PropTypes.any, title: PropTypes.string, description: PropTypes.string };

CardBlock.propTypes = {
  image: PropTypes.any,
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
  list: PropTypes.array,
  description2: PropTypes.string,
  actionBtn: PropTypes.any,
  actionBtn2: PropTypes.any
};

Feature15.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  blockData1: PropTypes.any,
  blockData2: PropTypes.any,
  blockData3: PropTypes.any,
  blockData4: PropTypes.any
};
