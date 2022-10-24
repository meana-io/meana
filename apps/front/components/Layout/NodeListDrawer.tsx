import { styled } from '@mui/material/styles';
import Link from 'next/link';

import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  IconButton,
} from '@mui/material/';
import { Clear as ClearIcon } from '@mui/icons-material';

import Node from '@/types/node';
import { useDeleteNode } from '@/hooks/queries/useNode';

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
  const { mutate, isLoading } = useDeleteNode();

  const handleClick = (nodeId: string) => {
    return () => mutate(nodeId);
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <Toolbar />
      <List>
        {nodes.map(({ uuid, name }, index) => (
          <Link key={uuid} passHref href={`/nodes/${uuid}`}>
            <ListItem
              disablePadding
              secondaryAction={
                index !== 0 && (
                  <IconButton
                    disabled={isLoading}
                    edge="end"
                    aria-label="delete"
                    onClick={handleClick(uuid)}
                  >
                    <ClearIcon />
                  </IconButton>
                )
              }
            >
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
