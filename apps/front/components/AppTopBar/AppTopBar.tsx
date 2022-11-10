import React from 'react';
import { AppBar, Box, styled, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { pageRoutes } from 'routes';

interface AppTopBarProps {
  children?: React.ReactNode;
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const AppTopBar: React.FC<AppTopBarProps> = ({ children }) => {
  return (
    <StyledAppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Link href={pageRoutes.dashboard}>
          <Typography variant="h6">Meana</Typography>
        </Link>
        <Box display="flex" sx={{ width: '100%' }} justifyContent="flex-end">
          {children}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppTopBar;
