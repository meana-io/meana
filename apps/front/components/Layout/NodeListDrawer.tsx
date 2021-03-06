import { styled } from '@mui/material/styles';
import Link from 'next/link';

import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material/';

import Node from '@/types/node';

export const NODE_LIST_DRAWER_WIDTH = 168 as const;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(() => ({
  width: NODE_LIST_DRAWER_WIDTH,
}));

interface NodeListDrawerProps {
  nodes: Node[];
}

const NodeListDrawer: React.FC<NodeListDrawerProps> = ({ nodes }) => {
  return (
    <Drawer variant="permanent" anchor="left">
      <Toolbar />
      <List>
        {nodes.map(({ uuid, name }) => (
          <Link key={uuid} passHref href={`/nodes/${uuid}`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default NodeListDrawer;
