import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { NODE_LIST_DRAWER_WIDTH } from '@/components/Layout/NodeListDrawer';
import { SERVER_DETAILS_DRAWER_WIDTH } from '@/components/Layout/ServerDetailsDrawer';

const LayoutContent = styled(
  Box,
  {}
)({
  width: `100%`,
  paddingLeft: `${NODE_LIST_DRAWER_WIDTH + 24}px`,
  paddingRight: `${SERVER_DETAILS_DRAWER_WIDTH + 24}px`,
});

export default LayoutContent;
