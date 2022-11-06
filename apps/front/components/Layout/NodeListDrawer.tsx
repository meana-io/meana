import { styled } from '@mui/material/styles';
import Link from 'next/link';

import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  ListSubheader,
  Divider,
} from '@mui/material/';
import Node from '@/types/node';

export const NODE_LIST_DRAWER_WIDTH = 200 as const;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(() => ({
  width: NODE_LIST_DRAWER_WIDTH,
}));

interface MenuItemProps {
  name: string;
  href: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, href }) => {
  return (
    <ListItem disablePadding>
      <Link passHref href={href}>
        <ListItemButton>
          <ListItemText primary={name} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

interface NodeListDrawerProps {
  nodes: Node[];
}

const NodeListDrawer: React.FC<NodeListDrawerProps> = ({ nodes }) => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: { width: NODE_LIST_DRAWER_WIDTH },
      }}
    >
      <Toolbar />
      <List
        dense
        subheader={<ListSubheader component="div">Nodes</ListSubheader>}
      >
        {nodes?.map(({ uuid, name }) => (
          <MenuItem key={uuid} href={`/nodes/${uuid}`} name={name} />
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default NodeListDrawer;
