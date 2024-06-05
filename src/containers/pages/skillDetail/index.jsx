import { ArrowBackIos, CheckCircleOutline, HighlightOff } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import GlobalLoader from 'containers/common/loaders/GlobalLoader';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetSkillByIdQuery } from 'services/private/skills';
import theme from 'styles/mui/theme';
import { ADHOC, MONTHLY, PROJECT_BASED } from 'utilities/constants';
import { formatTimeline } from 'utilities/helpers';

export default function SkillDetail() {
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const { id } = useParams();
  const navigate = useNavigate();

  // CONSTANTS
  const rowClassName = 'd-flex align-items-start justify-content-between my-4 flex-wrap';
  const colLeftClassName = 'col-12 col-md-3 col-lg-4 text-center text-md-start mb-2 mb-md-0';
  const colRightClassName = 'col-12 col-md-9 col-lg-8 text-center text-md-start responsive-text';

  const { data, isFetching } = useGetSkillByIdQuery(id, { skip: !id });
  const backToPage = () => {
    navigate(-1);
  };
  return (
    <>
      <Box className="d-flex align-items-center" onClick={backToPage} sx={{ cursor: 'pointer' }} mb={1}>
        <ArrowBackIos sx={{ fontSize: '16px' }} />
        <Typography variant="body1" color={darkPurple}>
          Go to Previous Page
        </Typography>
      </Box>
      <Paper className="p-4">
        <Typography variant="h5">Skill Detail</Typography>
        {isFetching ? (
          <Box align="center" colSpan={12}>
            <Box>
              <GlobalLoader />
            </Box>
          </Box>
        ) : (
          <Box className="px-4">
            {/* JOB POSTING TITLE ROW */}
            <Box className={rowClassName}>
              <Typography className={colLeftClassName} variant="label">
                Skill Title
              </Typography>

              <Typography className={`${colRightClassName} fw-600`} variant="body1">
                {data?.title}
              </Typography>
            </Box>

            {/* BUDGET ROW */}
            <Box className={rowClassName}>
              <Typography className={colLeftClassName} variant="label">
                Budget Type
              </Typography>

              <Typography className={`${colRightClassName} fw-600`} variant="body1">
                {data?.budget_type === PROJECT_BASED ? ADHOC : MONTHLY}
              </Typography>
            </Box>
            <Box className={rowClassName}>
              <Typography className={colLeftClassName} variant="label">
                Estimated Budget
              </Typography>

              <Typography className={`${colRightClassName} fw-600`} variant="body1">
                ${data?.budget_amount}
              </Typography>
            </Box>

            <Box className={`${rowClassName} mb-0`}>
              <Typography className={colLeftClassName} variant="label">
                Timeline
              </Typography>

              <Box className={colRightClassName}>
                <Typography variant="body2">{formatTimeline(data.timeline, data.budget_type)}</Typography>
              </Box>
            </Box>
            <Box className={`${rowClassName} mb-0`}>
              <Typography className={colLeftClassName} variant="label">
                Is Hired
              </Typography>

              <Box className={colRightClassName}>
                <Typography variant="body2">
                  {data?.is_hired ? <CheckCircleOutline color="success" /> : <HighlightOff color="error" />}
                </Typography>
              </Box>
            </Box>
            <Box className={`${rowClassName} mb-0`}>
              <Typography className={colLeftClassName} variant="label">
                Is Closed
              </Typography>

              <Box className={colRightClassName}>
                <Typography variant="body2">
                  {data?.is_closed ? <CheckCircleOutline color="success" /> : <HighlightOff color="error" />}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Paper>
    </>
  );
}
