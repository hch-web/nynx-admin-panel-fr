import { ArrowBackIos } from '@mui/icons-material';
import { Box, Button, Card, Chip, Paper, Stack, Typography } from '@mui/material';
import GlobalLoader from 'containers/common/loaders/GlobalLoader';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetJobDetailQuery } from 'services/private/client';
import theme from 'styles/mui/theme';
import { PROJECT_BASED } from 'utilities/constants';
import { formatTimeline, sumArrayElement } from 'utilities/helpers';

export default function JobDetail() {
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const { id } = useParams();
  const navigate = useNavigate();

  // CONSTANTS
  const rowClassName = 'd-flex align-items-start justify-content-between my-4 flex-wrap';
  const colLeftClassName = 'col-12 col-md-3 col-lg-4 text-center text-md-start mb-2 mb-md-0';
  const colRightClassName = 'col-12 col-md-9 col-lg-8 text-center text-md-start responsive-text';

  const { data, isFetching } = useGetJobDetailQuery(id, { skip: !id });
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
        <Typography variant="h5">Job Detail</Typography>
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
                Job Posting Title
              </Typography>

              <Typography className={`${colRightClassName} fw-600`} variant="body1">
                {data?.title}
              </Typography>
            </Box>

            {/* BUDGET ROW */}
            <Box className={rowClassName}>
              <Typography className={colLeftClassName} variant="label">
                Estimated Budget
              </Typography>

              <Typography className={`${colRightClassName} fw-600`} variant="body1">
                ${sumArrayElement(data?.job_skills, 'budget_amount')}
              </Typography>
            </Box>
            <Box className={rowClassName}>
              <Typography className={colLeftClassName} variant="label">
                Status
              </Typography>

              <Typography className={`${colRightClassName} fw-600`} variant="body1">
                <Button variant="outlined" color="success">
                  {data.status}
                </Button>
              </Typography>
            </Box>
            {/* SKILLS ROW */}
            <Box className={rowClassName}>
              <Typography className={colLeftClassName} variant="label">
                Skills
              </Typography>

              {/* SKILL ITEMS CONTAINER */}
              <Box className={colRightClassName}>
                {data.job_skills?.map(skill => {
                  const budgetType = skill.budget_type === PROJECT_BASED ? 'Adhoc' : 'Monthly';
                  const budgetAmount = `$${Math.floor(skill.budget_amount, 2)}`;
                  const isOpen = !skill.is_closed;

                  return (
                    <Card
                      key={skill.id}
                      sx={{ opacity: isOpen ? '1' : '0.6', border: '1px solid orange' }}
                      className="py-2 px-4 d-flex align-items-start align-items-xl-center flex-wrap flex-md-nowrap mb-2"
                    >
                      <Box className="col-12 col-md-5 pe-2">
                        <Typography variant="body" className="fw-600">
                          {`I need an expert of ${skill?.title}`}
                        </Typography>

                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={{ xs: 1, sm: 1, md: 2 }}
                          className="my-2 my-md-0 flex-wrap flex-xl-nowrap"
                        >
                          {skill.specializations?.map(tag => (
                            <Chip key={tag.id} label={tag.name} variant="outlined" />
                          ))}
                        </Stack>
                      </Box>

                      <Box className="col-6 col-sm-4 col-md-2 pe-2 text-center text-sm-start">
                        <Typography variant="body2" className="fw-600 mb-1 mb-md-2">
                          {budgetAmount}
                        </Typography>

                        <Typography variant="body2">{budgetType}</Typography>
                      </Box>

                      <Box className="col-6 col-sm-4 col-md-2 pe-2 text-center text-sm-start">
                        <Typography variant="body2" className="fw-600 mb-1 mb-md-2">
                          {formatTimeline(skill.timeline, skill.budget_type)}
                        </Typography>

                        <Typography variant="body2">Time</Typography>
                      </Box>
                    </Card>
                  );
                })}
              </Box>
            </Box>

            {/* DESCRIPTION ROW */}
            <Box className={`${rowClassName} mb-0`}>
              <Typography className={colLeftClassName} variant="label">
                Description
              </Typography>

              <Box className={colRightClassName}>
                <Typography variant="body2">{data.description}</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Paper>
    </>
  );
}
