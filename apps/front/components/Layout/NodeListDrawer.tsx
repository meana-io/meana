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
import { useDeleteNode } from '@/api/nodes';

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
  const { mutateAsync, isLoading } = useDeleteNode((oldData, deleteId) =>
    oldData.filter(({ uuid }) => uuid !== deleteId)
  );

  const onDelete = async (id: string) => {
    try {
      await mutateAsync(id);
    } catch (e) {
      console.log(e);
      // alert('error');
    }
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <Toolbar />
      <List>
        {nodes?.map(({ uuid, name }, index) => (
          <Link key={uuid} passHref href={`/nodes/${uuid}`}>
            <ListItem
              disablePadding
              secondaryAction={
                index > 2 && (
                  <IconButton
                    disabled={isLoading}
                    edge="end"
                    aria-label="delete"
                    onClick={() => onDelete(uuid)}
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
