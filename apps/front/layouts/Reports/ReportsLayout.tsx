import { styled } from '@mui/system';
import Nav from '@/components/AppNav/AppNav';
import { Container, Toolbar } from '@mui/material';

import AppTopBar from '@/components/AppTopBar/AppTopBar';
import { useGetNodesList } from '@/api/nodes';

export const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
});

export const Main = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

interface ReportsProps {
  children: React.ReactNode;
}

const ReportsLayout: React.FC<ReportsProps> = ({ children }) => {
  const { data: nodes = [] } = useGetNodesList();

  const navItems = nodes?.map(({ uuid, name }) => ({
    title: name,
    uuid,
  }));

  return (
    <StyledRoot>
      <AppTopBar />
      <Nav items={navItems} />
      <Main maxWidth="xl">
        <Toolbar />
        {children}
      </Main>
    </StyledRoot>
  );
};

export default ReportsLayout;
