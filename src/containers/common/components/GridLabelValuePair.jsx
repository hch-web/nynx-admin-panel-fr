import React from 'react';
import { Box, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import propTypes from 'prop-types';
import moment from 'moment';
import { setIconByFileType } from 'utilities/helpers';
import { saveAs } from 'file-saver';

function GridLabelValuePair({ label, value, type, mb }) {
  const theme = useTheme();

  // COLORS
  const colors = theme.palette;
  const border = colors.border.main;
  const lightOrange = colors.primary.main;

  const handleSaveFile = file => {
    saveAs(file);
  };
  return (
    <Box>
      {label !== 'Attachments' && (
        <Box>
          {type !== 'text' ? (
            <Grid container mb={mb}>
              <Grid item xs={12} md={4}>
                <Typography variant="body1" fontWeight={500}>
                  {label}:
                </Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <Card sx={{ borderColor: lightOrange }}>
                  <CardContent>
                    <Typography variant="body1">{value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Grid container mb={mb}>
              <Grid item xs={12} md={4}>
                <Typography variant="body1" fontWeight={500}>
                  {label}:
                </Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <Typography variant="body1">{value}</Typography>
              </Grid>
            </Grid>
          )}
        </Box>
      )}
      {label === 'Attachments' && (
        <Grid container mb={mb}>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" fontWeight={500}>
              {label}:
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            {/* FILES CONTAINER */}
            <Box className="d-flex align-items-center my-3 gap-4">
              {value?.map(fileObj => (
                <Card
                  className="pointer"
                  onClick={() => handleSaveFile(fileObj.attachment)}
                  key={fileObj?.id}
                  sx={{ borderColor: border }}
                >
                  <CardContent className="text-center py-3 px-2">
                    <img src={setIconByFileType(fileObj?.attachment)} alt="file-Icon" />

                    <Box className="mt-2">
                      <Typography variant="body2" sx={{ fontSize: '10px' }} className="text-muted">
                        {moment(fileObj?.created_at)?.fromNow()}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

GridLabelValuePair.propTypes = {
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  type: propTypes.string,
  mb: propTypes.number,
};

GridLabelValuePair.defaultProps = {
  mb: 2,
  type: 'text',
};

export default GridLabelValuePair;
