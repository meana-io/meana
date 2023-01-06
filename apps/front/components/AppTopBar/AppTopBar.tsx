import React from 'react';
import { AppBar, Box, styled, Toolbar } from '@mui/material';
import Link from 'next/link';
import { pageRoutes } from 'routes';
import Image from 'next/image';
import UserMenu from '../UserMenu/UserMenu';

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
          <Image src="/logo.png" alt="Meana" width="120" height="30" />
        </Link>
        <Box display="flex" sx={{ width: '100%' }} justifyContent="flex-end">
          {children}
        </Box>
        <UserMenu />
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppTopBar;
