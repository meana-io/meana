import { Toolbar } from '@mui/material';

import TopNavbar from '@/components/Layout/TopNavbar';
import NodeListDrawer from '@/components/Layout/NodeListDrawer';
import ServerDetailsDrawer from '@/components/Layout/ServerDetailsDrawer';
import LayoutContent from '@/components/Layout/LayoutContent';

import DiscFullIcon from '@mui/icons-material/DiscFull';
import SdStorageIcon from '@mui/icons-material/SdStorage';
import MemoryIcon from '@mui/icons-material/Memory';
import { useGetNodes } from '@/hooks/queries/useNode';

const TABS = [
  { label: 'disks', icon: <DiscFullIcon /> },
  { label: 'ram', icon: <SdStorageIcon /> },
  { label: 'processor', icon: <MemoryIcon /> },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { data: nodes } = useGetNodes();

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
