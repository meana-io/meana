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
  IconButton,
  Box,
  Tooltip
} from '@mui/material';
import { Add as AddIcon} from '@mui/icons-material';
import Link from 'next/link';
import { pageRoutes } from 'routes';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useGetHealthCheck } from '@/api/healthCheck';

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
    <Link href={href} style={{ textDecoration: 'none' }}>
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
          <StyledNavItemIcon />
          <ListItemText disableTypography primary={title} />
        </StyledNavItem>
      </Box>
    </Link>
  );
};

interface NodeNavItemProps {
  title: string;
  uuid: string;
  icon?: React.ReactNode;
}

const NodeNavItem: React.FC<NodeNavItemProps> = ({ title, uuid, icon }) => {
  const { data } = useGetHealthCheck(uuid, {
    refetchInterval: 1000 * 5,
  });
  const isWorking = !!data;

  return (
    <Link
      href={`${pageRoutes.nodes}/${uuid}`}
      style={{ textDecoration: 'none' }}
    >
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
          <StyledNavItemIcon>
            <Tooltip title={isWorking ? 'Live' : 'Not Working'}>
              <IconButton size="small" color={isWorking ? 'success' : 'error'}>
                {isWorking ? <FiberManualRecordIcon /> : <PriorityHighIcon />}
              </IconButton>
            </Tooltip>
          </StyledNavItemIcon>
          <ListItemText disableTypography primary={title} />
        </StyledNavItem>
      </Box>
    </Link>
  );
};

export const NAV_WIDTH = 280;

interface NavItem {
  title: string;
  uuid: string;
  icon?: React.ReactNode;
  cy?: string;
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
    cy: 'Create',
  },
  {
    header: 'Reports',
    list: [{ title: 'Create', href: pageRoutes.createReport }],
    cy: 'CreateReports',
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
            <Box display="flex" justifyContent="space-between">
              <Box>Nodes</Box>
              <Box>
                <Link href={pageRoutes.createNode} passHref>
                  <IconButton color="primary">
                    <AddIcon />
                  </IconButton>
                </Link>
              </Box>
            </Box>
          </ListSubheader>
        }
      >
        {items.map(({ title, icon, uuid }) => (
          <NodeNavItem key={uuid} uuid={uuid} title={title} icon={icon} />
        ))}
      </List>
      {staticMenu.map(({ header, list, cy }, index) => (
        <List
          data-cy={cy}
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
