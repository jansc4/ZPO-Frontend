import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import MenuAppBar from '../app-bar/MenuAppBar';

import './HomePage.css';

function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Outlet />
    </Box>
  );
}

export default HomePage;
