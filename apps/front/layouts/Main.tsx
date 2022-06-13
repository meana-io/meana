import { Toolbar } from '@mui/material';

import TopNavbar from '@/components/Layout/TopNavbar';
import NodeListDrawer from '@/components/Layout/NodeListDrawer';
import ServerDetailsDrawer from '@/components/Layout/ServerDetailsDrawer';
import LayoutContent from '@/components/Layout/LayoutContent';

import Node from '@/types/node';

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';

const TABS = [
  { label: 'disks', icon: <AccessAlarmIcon /> },
  { label: 'ram', icon: <ThreeDRotation /> },
];

interface MainLayoutProps {
  children: React.ReactNode;
  nodes: Node[];
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, nodes }) => {
  return (
    <>
      <TopNavbar />
      <NodeListDrawer nodes={nodes} />
      <ServerDetailsDrawer tabs={TABS} />
      <LayoutContent component="main" pt={2}>
        <Toolbar />
        {children}
      </LayoutContent>
    </>
  );
};

export default MainLayout;
