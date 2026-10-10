'use client';

import { Card, Stack, Typography, Box, LinearProgress } from '@mui/material';
import { forwardRef } from 'react';

const KPICard = forwardRef(({
  title,
  value,
  subtitle = '',
  icon: Icon,
  change = null,
  changeColor = 'success',
  color = 'primary',
  loading = false,
  progress = null,
  onClick = null
}, ref) => {
  return (
    <Card
      ref={ref}
      sx={{
        p: 2.5,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        '&:hover': onClick ? {
          boxShadow: 3,
          transform: 'translateY(-2px)'
        } : {}
      }}
      onClick={onClick}
    >
      <Stack spacing={1.5}>
        {/* Header: Icon + Title */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack spacing={0.5} flex={1}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontWeight: 500, fontSize: '0.875rem' }}
            >
              {title}
            </Typography>
          </Stack>
          {Icon && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 1,
                bgcolor: `${color}.lighter` || 'primary.lighter',
                color: `${color}.main` || 'primary.main'
              }}
            >
              <Icon size={20} />
            </Box>
          )}
        </Stack>

        {/* Value */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: 'textPrimary'
          }}
        >
          {loading ? '...' : value}
        </Typography>

        {/* Subtitle */}
        {subtitle && (
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ fontSize: '0.75rem' }}
          >
            {subtitle}
          </Typography>
        )}

        {/* Change indicator */}
        {change && !loading && (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: `${changeColor}.main`,
                fontSize: '0.8rem'
              }}
            >
              {change.value}%
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ fontSize: '0.75rem' }}
            >
              {change.label}
            </Typography>
          </Stack>
        )}

        {/* Progress bar */}
        {progress && !loading && (
          <Box sx={{ mt: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
              <Typography variant="caption" color="textSecondary">
                {progress.label}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {progress.value}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={progress.value}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  backgroundColor: progress.color || 'primary.main'
                }
              }}
            />
          </Box>
        )}
      </Stack>
    </Card>
  );
});

KPICard.displayName = 'KPICard';

export default KPICard;
