import { Toolbar } from '@mui/material';

import TopNavbar from '@/components/Layout/TopNavbar';
import NodeListDrawer from '@/components/Layout/NodeListDrawer';
import LayoutContent from '@/components/Layout/LayoutContent';
import { useGetNodesList } from '@/api/nodes';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { data: nodes } = useGetNodesList();

  return (
    <>
      <TopNavbar />
      <NodeListDrawer nodes={nodes} />
      <LayoutContent component="main" pt={2}>
        <Toolbar />
        {children}
      </LayoutContent>
    </>
  );
};

export default MainLayout;
