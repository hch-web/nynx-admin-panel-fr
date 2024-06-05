import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import { conditionalBadgeOfExpert, formatName } from 'utilities/helpers';
import { ArrowBackIos } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router';
// API HOOKS
import { useTaskDetailsQuery } from 'services/private/task-details';

// STYLES
import {
  tasksGigMainImgStyles,
  backButtonIconStyles,
  taskDetailsHeaderGigTitle,
  workspaceContainerStyles,
  workspaceResponsiveWidth,
} from 'styles/containers/workspace-styles';

// COMPONENTS & UTILITIES
import TabPanel from 'containers/common/components/TabPanel';
import { formatDate, formatStatus } from 'utilities/utility-functions';
import TimerCard from 'containers/pages/common/TimerCard';
import TaskDetailsRequirementsTabPanel from './components/TaskDetailsRequirementsTabPanel';
import TaskDetailTabPanel from './components/TaskDetailsDetailTabPanel';
import DeliverableFeedback from './components/DeliverableFeedback';

function TaskDetails() {
  // REFERENCING HOOKS
  const theme = useTheme();
  const { taskId, taskVia } = useParams();
  const navigate = useNavigate();

  // STATE HOOKS
  const [currentTab, setCurrentTab] = useState(0);

  // API HOOKS
  const { data: taskDetails } = useTaskDetailsQuery({ id: taskId, taskVia }, { skip: !(taskId && taskVia) });
  // COLORS
  const colors = theme.palette;
  const lightOrange = colors.lightOrange.main;
  const darkPurple = colors.darkPurple.main;

  // HANDLER FUNCTIONS
  const handleChange = (_, newValue) => {
    setCurrentTab(newValue);
  };

  const backToPrevious = () => {
    navigate(-1);
  };

  // Constants
  const profileLevelBadge = conditionalBadgeOfExpert(taskDetails?.seller_level);

  return (
    <>
      <Box className="d-flex align-item-start" mb={2}>
        <Stack direction="row" spacing={1} alignItems="center" onClick={backToPrevious} className="pointer">
          <ArrowBackIos sx={backButtonIconStyles} />
          <Typography variant="body1" color={darkPurple}>
            Back to previous page
          </Typography>
        </Stack>
      </Box>
      <Paper>
        {/* HEADER BOX CONTAINER */}
        <Box className="pb-0" sx={workspaceContainerStyles}>
          {/* HEADER WITH TITLE & BUTTONS */}
          <Box className="d-flex flex-column flex-md-row align-items-start justify-content-between mb-3">
            <Box className="col-12 col-md-7 col-lg-8 col-xl-9">
              <Typography variant="h5">{taskDetails?.workspace_title}</Typography>
            </Box>

            <Box className="col-12 col-md-5 col-lg-4 col-xl-3 d-flex align-items-center justify-content-end">
              <Typography variant="body2" className="text-muted">
                {formatDate(taskDetails?.delivery_date)}
              </Typography>

              <Button className="mx-3" variant="success">
                {formatStatus(taskDetails?.status)}
              </Button>
            </Box>
          </Box>

          {/* FREELANCER GIG + PROFILE & CARD WITH TIMER  */}
          <Box className="d-flex flex-column flex-xl-row align-items-center justify-content-start justify-content-xl-between">
            <Stack
              sx={workspaceResponsiveWidth}
              className="flex-column flex-sm-row align-items-center justify-content-between justify-content-xl-start mb-3 mb-xl-0 w-100"
            >
              {/* GIG IMAGE AND TITLE */}
              <Box className="order-2 order-sm-1 mt-2 mt-sm-0 d-flex flex-column flex-sm-row align-items-center justify-content-start mw-100">
                <Box
                  sx={{
                    background: `#f3f3f3 url(${taskDetails?.gig_main_image}) no-repeat center`,
                    ...tasksGigMainImgStyles,
                  }}
                />
                <Typography
                  variant="body1"
                  className="ms-0 ms-sm-3 text-center text-sm-start"
                  sx={taskDetailsHeaderGigTitle}
                >
                  {taskDetails?.title}
                </Typography>
              </Box>

              <Box className="order-1 order-sm-2 ms-0 ms-xl-3 mb-2 mb-sm-0 d-flex align-items-center">
                <Avatar src={taskDetails?.prof_img} alt={taskDetails?.first_name} />

                <Typography
                  className="ms-2 d-flex flex-column  align-items-center"
                  variant="body2"
                  color={darkPurple}
                >
                  <span className="d-flex  align-items-start">
                    {formatName(taskDetails?.first_name, taskDetails?.last_name)}
                  </span>
                  <img
                    className="d-flex align-items-start"
                    src={profileLevelBadge}
                    alt="profile-level-badge"
                  />
                </Typography>
              </Box>
            </Stack>

            <Stack
              sx={workspaceResponsiveWidth}
              spacing={2}
              className="flex-column flex-sm-row align-items-center justify-content-between justify-content-xl-end mb-0 w-100"
            >
              <Card className="align-self-stretch">
                <Box className="d-flex flex-column align-items-center align-items-md-start p-2">
                  <Typography variant="body2" className="fw-500">
                    {`$${taskDetails?.rates}`}
                  </Typography>

                  <Typography variant="body2">Total Payments</Typography>
                </Box>
              </Card>

              {/* TIMER CARD */}
              <TimerCard taskDetails={taskDetails} />
            </Stack>
          </Box>

          <Divider light className="mt-3 mb-2" />

          {/* TABS */}
          <Box className="d-flex align-items-center justify-content-between">
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
              <Tab label="Requirements" />
              <Tab label="Details" />
              <Tab label="Delivery & Feedback" />
            </Tabs>

          </Box>
        </Box>

        <Box className="mt-3">
          <TabPanel stateValue={currentTab} index={0}>
            <TaskDetailsRequirementsTabPanel gigId={taskDetails?.gig} />
          </TabPanel>

          <TabPanel stateValue={currentTab} index={1}>
            <TaskDetailTabPanel />
          </TabPanel>

          <TabPanel stateValue={currentTab} index={2}>
            <DeliverableFeedback />
          </TabPanel>
        </Box>
      </Paper>
    </>
  );
}
export default TaskDetails;
