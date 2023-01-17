import { styled } from '@mui/system';
import Nav from '@/components/AppNav/AppNav';
import { Container, Toolbar } from '@mui/material';

import AppTopBar from '@/components/AppTopBar/AppTopBar';
import { useGetNodesList } from '@/api/nodes';
import TabsProvider from '@/contexts/tabsContext';

export const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
});

export const Main = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

interface NodesProps {
  children: React.ReactNode;
}

const NodesLayout: React.FC<NodesProps> = ({ children }) => {
  const { data: nodes = [] } = useGetNodesList();

  const navItems = nodes?.map(({ uuid, name }) => ({
    title: name,
    uuid,
  }));

  return (
    <StyledRoot>
      <AppTopBar />
      <Nav items={navItems} />
      <TabsProvider>
        <Main maxWidth="xl">
          <Toolbar />
          {children}
        </Main>
      </TabsProvider>
    </StyledRoot>
  );
};

export default NodesLayout;
