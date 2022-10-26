import { Toolbar } from '@mui/material';

import TopNavbar from '@/components/Layout/TopNavbar';
import NodeListDrawer from '@/components/Layout/NodeListDrawer';
import LayoutContent from '@/components/Layout/LayoutContent';

import { useGetNodes } from '@/hooks/queries/useNode';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { data: nodes } = useGetNodes();

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
