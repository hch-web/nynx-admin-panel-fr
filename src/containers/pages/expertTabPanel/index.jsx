import React, { useState } from 'react';
import { Box, Tab, Tabs, useTheme } from '@mui/material';

// COMPONENTS & UTILITIES
import TabPanel from 'containers/common/components/TabPanel';
import Team from '../team';
import Proposal from '../submittedProposal';

function ExpertTabPanel() {
  // REFERENCING HOOKS
  const theme = useTheme();
  // STATE HOOKS
  const [currentTab, setCurrentTab] = useState(0);

  // API HOOKS

  // COLORS
  const colors = theme.palette;
  const lightOrange = colors.lightOrange.main;
  // HANDLER FUNCTIONS
  const handleChange = (_, newValue) => {
    setCurrentTab(newValue);
  };

  return (
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
          <Tab label="Team" />
          <Tab label="Submitted Proposals" />
        </Tabs>
      </Box>
      <Box className="mt-3">
        <TabPanel stateValue={currentTab} index={0}>
          <Team />
        </TabPanel>

        <TabPanel stateValue={currentTab} index={1}>
          <Proposal />
          {/* {isBuyer ? <Workspaces jobs={userInfo?.user_workspace} /> : <Gigs gigs={userInfo?.profile_gig} />} */}
        </TabPanel>
      </Box>
    </>
  );
}

export default ExpertTabPanel;
