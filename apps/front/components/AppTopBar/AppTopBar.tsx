import React from 'react';
import { AppBar, Box, IconButton, styled, Toolbar } from '@mui/material';
import Link from 'next/link';
import { pageRoutes } from 'routes';
import Image from 'next/image';
import UserMenu from '../UserMenu/UserMenu';
import { Menu as MenuIcon } from '@mui/icons-material';
import useDrawer from '@/hooks/useDrawer';

interface AppTopBarProps {
  children?: React.ReactNode;
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const AppTopBar: React.FC<AppTopBarProps> = ({ children }) => {
  const { isMobile, toggleDrawer } = useDrawer();
  return (
    <StyledAppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{
              marginRight: 5,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
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
