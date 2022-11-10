import { styled } from '@mui/system';
import Nav from '@/components/AppNav/AppNav';
import { Button, Container, Toolbar } from '@mui/material';

import AppTopBar from '@/components/AppTopBar/AppTopBar';
import Link from 'next/link';
import { useGetNodesList } from '@/api/nodes';
import { pageRoutes } from 'routes';

export const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
});

export const Main = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

interface DashboardProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardProps> = ({ children }) => {
  const { data: nodes = [] } = useGetNodesList();

  const navItems = nodes?.map(({ uuid, name }) => ({
    title: name,
    href: `${pageRoutes.nodes}/${uuid}`,
  }));

  return (
    <StyledRoot>
      <AppTopBar>
        <Link href="/add-new-node" passHref>
          <Button size="large">Add New Server</Button>
        </Link>
      </AppTopBar>
      <Nav items={navItems} />
      <Main maxWidth="xl">
        <Toolbar />
        {children}
      </Main>
    </StyledRoot>
  );
};

export default DashboardLayout;