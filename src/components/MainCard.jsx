'use client';
import PropTypes from 'prop-types';

// @mui
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

/***************************  MAIN CARD  ***************************/

export default function MainCard({ children, sx = {}, contentSX, title, content = true, ref, ...others }) {
  const defaultSx = (theme) => ({
    p: content ? { xs: 1.75, sm: 2.25, md: 3 } : 0,
    border: `1px solid ${(theme?.vars ? theme.vars.palette : theme.palette).divider}`,
    borderRadius: 4,
    boxShadow: theme?.vars?.customShadows?.section || theme?.customShadows?.section || theme?.shadows?.[1]
  });

  const combinedSx = (theme) => ({
    ...defaultSx(theme),
    ...(typeof sx === 'function' ? sx(theme) : sx)
  });

  return (
    <Card ref={ref} elevation={0} sx={combinedSx} {...others}>
      {title && (
        <>
          <Box sx={{ px: content ? 0 : { xs: 1.75, sm: 2.25, md: 3 }, pt: content ? 0 : { xs: 1.75, sm: 2.25, md: 3 } }}>
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Divider sx={{ mt: 2 }} />
        </>
      )}
      <Box sx={contentSX}>{children}</Box>
    </Card>
  );
}

MainCard.propTypes = {
  children: PropTypes.any,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  contentSX: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  content: PropTypes.bool,
  ref: PropTypes.any
};
