import PropTypes from 'prop-types';
import React from 'react';
// material-ui
import { Box, Card, Chip, Grid, Stack, Typography } from '@mui/material';
// assets
import { ArrowUpwardOutlined, ArrowDownwardOutlined } from '@mui/icons-material';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

function AnalyticEcommerce({ color, title, count, percentage, isLoss, extra }) {
  return (
    <Card className="p-3">
      <Stack spacing={0.5}>
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h5" color="inherit">
              {count}
            </Typography>
          </Grid>
          {percentage && (
            <Grid item>
              <Chip
                variant="combined"
                color={color}
                icon={(
                  <>
                    {!isLoss && <ArrowUpwardOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                    {isLoss && <ArrowDownwardOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                  </>
                )}
                label={`${percentage}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          )}
        </Grid>
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        <Typography variant="caption" color="textSecondary">
          You made an extra{' '}
          <Typography component="span" variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
            {extra}
          </Typography>{' '}
          this year
        </Typography>
      </Box>
    </Card>
  );
}

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

AnalyticEcommerce.defaultProps = {
  color: 'primary',
  isLoss: false
};

export default AnalyticEcommerce;
