import React, { useMemo, useState } from 'react';
import { Box, Tabs, Tab, Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import TabPanel from 'containers/common/components/TabPanel';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useGetClientByIdQuery } from 'services/private/client';
import { useGetFreelancerByIdQuery } from 'services/private/freelancer';
import GlobalLoader from 'containers/common/loaders/GlobalLoader';
import UserDetail from './userInfo';
import Gigs from '../gigs';
import Workspaces from '../workspaces';
import Analytics from '../analytics';
import FreelancerSettings from '../settings';

export default function userDetailTabs() {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { id } = useParams();
  const isClient = useMemo(() => pathname.includes('client'), [pathname]);
  const { data: userInfo, isFetching } = isClient
    ? useGetClientByIdQuery(id, { skip: !id })
    : useGetFreelancerByIdQuery(id, { skip: !id });
  const isBuyer = userInfo?.is_buyer;

  // COLORS
  const colors = theme.palette;
  const lightOrange = colors.lightOrange.main;
  const [currentTab, setCurrentTab] = useState(0);
  const handleChange = (_, newValue) => {
    setCurrentTab(newValue);
  };
  return (
    <Box>
      {isFetching ? (
        <Box align="center" colSpan={12}>
          <Box>
            <GlobalLoader />
          </Box>
        </Box>
      ) : (
        <>
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
              <Tab label="User Info" />
              <Tab label={isBuyer ? 'WorkSpaces' : 'Gigs'} />
              <Tab label="Analytics" />
              <Tab label="Settings" />
            </Tabs>
            <Link to={-1}>
              <Button variant="contained">Back</Button>
            </Link>
          </Box>
          <Box className="mt-3">
            <TabPanel stateValue={currentTab} index={0}>
              <UserDetail />
            </TabPanel>

            <TabPanel stateValue={currentTab} index={1}>
              {isBuyer ? (
                <Workspaces jobs={userInfo?.user_workspace} />
              ) : (
                <Gigs gigs={userInfo?.profile_gig} />
              )}
            </TabPanel>
            <TabPanel stateValue={currentTab} index={2}>
              <Analytics />
            </TabPanel>
            <TabPanel stateValue={currentTab} index={3}>
              <FreelancerSettings settings={userInfo} />
            </TabPanel>
          </Box>
        </>
      )}
    </Box>
  );
}
