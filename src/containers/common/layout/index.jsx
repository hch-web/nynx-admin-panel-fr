import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { mainContainerStyles } from 'styles/mui/layoutStyles';
import { useSelector } from 'react-redux';

// COMPONENTS
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function LayoutWrapper() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { isAuthenticated } = useSelector(state => state?.auth);

  const handleToggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };
  return (
    isAuthenticated && (
      <Box>
        <Navbar isOpen={isSidebarOpen} handleToggleSidebar={handleToggleSidebar} />

        <Box className="d-flex align-items-start">
          <Sidebar isOpen={isSidebarOpen} handleToggleSidebar={handleToggleSidebar} />

          <Box sx={mainContainerStyles(isSidebarOpen)}>
            <Container className="p-0" maxWidth="1372px">
              <Outlet />
            </Container>
            <Footer />
          </Box>
        </Box>
      </Box>
    )
  );
}

export default LayoutWrapper;
