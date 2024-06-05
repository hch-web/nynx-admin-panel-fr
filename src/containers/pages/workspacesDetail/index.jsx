import React, { useState, useEffect } from 'react';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';

import { ArrowBackIos } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import moment from 'moment';

// API HOOKS
import { useGetJobByIdQuery } from 'services/private/client';

// CUSTOM HOOKS
import useApiServices from 'customHooks/useApiServices';

// STYLES
import {
  workspaceCardStyles,
  workspaceHeaderCardSubTitleStyles,
  workspaceHeaderCardTitleStyles,
  workspaceResponsiveWidth,
  workspaceTotalBudgetCardStyle,
} from 'styles/containers/workspace-styles';

// COMPONENTS & UTILITIES
import TabPanel from 'containers/common/components/TabPanel';
import { formatStatus } from 'utilities/utility-functions';
import GlobalLoader from 'containers/common/loaders/GlobalLoader';
import JobPostingTabPanel from '../jobPostingTabPanel';
import ExpertTabPanel from '../expertTabPanel';
import TasksTabPanel from '../tasksTabPanel';
import Deliverable from '../deliverable/deliverable';
import ActivityTabPanel from '../ActivityTabPanel';

function WorkspacesDetail() {
  // REFERENCING HOOKS
  const theme = useTheme();
  const { id } = useParams();
  const { invalidatePrivateTags } = useApiServices();

  // STATE HOOKS
  const [currentTab, setCurrentTab] = useState(0);

  // API HOOKS
  const { data: workspaceData, isFetching } = useGetJobByIdQuery(id, { skip: !id });

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const lightOrange = colors.lightOrange.main;
  const navigate = useNavigate();
  // HANDLER FUNCTIONS
  const handleChange = (_, newValue) => {
    setCurrentTab(newValue);
  };

  const backToWorkplace = () => {
    navigate(-1);
  };

  useEffect(() => {
    invalidatePrivateTags(['GetWorkspace']);
  }, []);

  // CONSTANTS
  const createdDate = moment(workspaceData?.created_at).format('MMM D, YYYY');
  const status = workspaceData?.status;

  return (
    <>
      <Box className="d-flex align-items-center mb-3 mt-2" onClick={backToWorkplace} sx={{ cursor: 'pointer' }}>
        <ArrowBackIos sx={{ fontSize: '16px' }} />
        <Typography variant="body1" color={darkPurple}>
          Back to the Workspaces
        </Typography>
      </Box>
      {isFetching ? (
        <Box align="center" colSpan={12}>
          <Box>
            <GlobalLoader />
          </Box>
        </Box>
      ) : (
        <Paper variant="portal">
          {/* HEADER BOX CONTAINER */}
          <Box className="pb-0 common-border bg-white p-4">
            {/* HEADER WITH TITLE & BUTTONS */}
            <Box className="d-flex flex-column flex-md-row align-items-start justify-content-between">
              <Box className="col-12 col-md-7 col-lg-8 col-xl-9">
                <Typography variant="h5">{workspaceData?.title}</Typography>
              </Box>

              <Box className="col-12 col-md-5 col-lg-4 col-xl-3 d-flex align-items-center justify-content-end">
                <Typography variant="body2" className="text-muted">
                  {createdDate}
                </Typography>

                <Button className="mx-3 text-capitalize" variant="success">
                  {formatStatus(status)}
                </Button>
              </Box>
            </Box>

            {/* HEADER CARDS WITH IMAGES */}
            <Box className="d-flex flex-column flex-lg-row align-items-center justify-content-between">
              <Stack
                sx={workspaceResponsiveWidth}
                direction={{ xs: 'column', sm: 'row', md: 'row' }}
                spacing={2}
                className="align-items-center justify-content-center mb-lg-0"
              >
                <Card sx={workspaceCardStyles}>
                  <CardContent>
                    <Typography variant="body2" color={darkPurple} sx={workspaceHeaderCardTitleStyles}>
                      {`$${workspaceData?.pending_budget}` || 0}
                    </Typography>

                    <Typography variant="body2" color={darkPurple} sx={workspaceHeaderCardSubTitleStyles}>
                      Pending Tasks
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={workspaceCardStyles}>
                  <CardContent>
                    <Typography variant="body2" color={darkPurple} sx={workspaceHeaderCardTitleStyles}>
                      {`$${workspaceData?.completed_budget}` || 0}
                    </Typography>

                    <Typography variant="body2" color={darkPurple} sx={workspaceHeaderCardSubTitleStyles}>
                      Paid Tasks
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={workspaceTotalBudgetCardStyle}>
                  <CardContent>
                    <Typography variant="body2" color={darkPurple} sx={workspaceHeaderCardTitleStyles}>
                      {`$${workspaceData?.total_task_budget}` || 0}
                    </Typography>

                    <Typography variant="body2" color={darkPurple} sx={workspaceHeaderCardSubTitleStyles}>
                      Total Budget
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>

              <AvatarGroup className="ms-3">
                {workspaceData?.freelancers?.map(user => (
                  <Avatar key={v4()} src={user.freelancer_image || ''} alt={user.freelancer_username} />
                ))}
              </AvatarGroup>
            </Box>

            <Divider light className="my-2" />

            {/* TABS */}
            <Box>
              <Tabs
                value={currentTab}
                onChange={handleChange}
                variant="scrollable"
                allowScrollButtonsMobile
                sx={{
                  '& .MuiTabs-indicator': { background: lightOrange },
                  '& .Mui-selected': { color: `${lightOrange} !Important` },
                }}
              >
                <Tab label="Job Posting" />
                <Tab label="Experts" />
                <Tab label="Tasks" />
                <Tab label="Activity" />
                <Tab label="Deliverable" />
              </Tabs>
            </Box>
          </Box>
          <Divider />
          <Box className="mt-3" sx={{ borderRadius: '20px' }}>
            <TabPanel stateValue={currentTab} index={0}>
              <JobPostingTabPanel />
            </TabPanel>

            <TabPanel stateValue={currentTab} index={1}>
              <ExpertTabPanel />
            </TabPanel>

            <TabPanel stateValue={currentTab} index={2}>
              <TasksTabPanel />
            </TabPanel>
            <TabPanel stateValue={currentTab} index={3}>
              <ActivityTabPanel />
            </TabPanel>

            <TabPanel stateValue={currentTab} index={4}>
              <Deliverable />
            </TabPanel>
          </Box>
        </Paper>
      )}
    </>
  );
}

export default WorkspacesDetail;
