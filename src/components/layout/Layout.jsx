import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import AppBar from './AppBar';
import Footer from './Footer';

const Layout = ({ children, title, breadcrumb, onAddClick, showAddButton }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          ml: '50px',
        }}
      >
        <AppBar 
          title={title} 
          breadcrumb={breadcrumb}
          onAddClick={onAddClick}
          showAddButton={showAddButton}
        />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
