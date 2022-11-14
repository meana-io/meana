import { styled } from '@mui/material/styles';
import {
  ListItemIcon,
  ListItemText,
  List,
  ListItemButton,
  Drawer,
  ListItemButtonProps,
  Toolbar,
  ListSubheader,
} from '@mui/material';

import Link from 'next/link';
import { Box } from '@mui/system';
import { pageRoutes } from 'routes';

const StyledNavItem = styled((props: ListItemButtonProps) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

interface NavItemProps {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ title, href, icon }) => {
  return (
    <Link href={href}>
      <Box>
        <StyledNavItem
          sx={{
            '&.active': {
              color: 'text.primary',
              bgcolor: 'action.selected',
              fontWeight: 'fontWeightBold',
            },
          }}
        >
          <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
          <ListItemText disableTypography primary={title} />
        </StyledNavItem>
      </Box>
    </Link>
  );
};

export const NAV_WIDTH = 280;

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavProps {
  items: NavItem[];
}

const staticMenu = [
  {
    header: 'Users',
    list: [
      { title: 'List', href: pageRoutes.users },
      { title: 'Create', href: pageRoutes.createUser },
    ],
  },
  {
    header: 'Reports',
    list: [{ title: 'Create', href: pageRoutes.createReport }],
  },
];

const AppNav: React.FC<NavProps> = ({ items }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: NAV_WIDTH,
      }}
      PaperProps={{
        sx: {
          width: NAV_WIDTH,
          bgcolor: 'background.default',
          borderRightStyle: 'dashed',
        },
      }}
    >
      <Toolbar />
      <List
        disablePadding
        sx={{ p: 1 }}
        subheader={
          <ListSubheader
            sx={{
              bgcolor: 'background.default',
            }}
            component="div"
          >
            Nodes
          </ListSubheader>
        }
      >
        {items.map(({ title, icon, href }) => (
          <NavItem key={href} href={href} title={title} icon={icon} />
        ))}
      </List>
      {staticMenu.map(({ header, list }, index) => (
        <List
          key={index}
          disablePadding
          sx={{ p: 1 }}
          subheader={
            <ListSubheader
              sx={{
                bgcolor: 'background.default',
              }}
              component="div"
            >
              {header}
            </ListSubheader>
          }
        >
          {list.map(({ title, href }) => (
            <NavItem key={href} href={href} title={title} />
          ))}
        </List>
      ))}
    </Drawer>
  );
};

export default AppNav;
