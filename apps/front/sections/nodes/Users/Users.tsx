import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Card, CardContent, CardHeader, Box, Chip } from '@mui/material';
import { useRouter } from 'next/router';
import { useGetNodeUsers } from '@/api/nodeUsers';
import Progress from '@/components/Progress/Progress';
import NoData from '@/components/NoData/NoData';

const UsersList: React.FC = () => {
  const router = useRouter();
  const nodeId = router.query.id as string;
  const { data, isLoading } = useGetNodeUsers(nodeId);

  const columns: GridColDef[] = [
    { field: 'username', headerName: 'Username', minWidth: 200 },
    {
      field: 'groups',
      headerName: 'Groups',
      minWidth: 600,
      renderCell: (cellValues) => {
        const { groups } = cellValues.row;
        return groups.map((groupName) => (
          <Box key={groupName} mr={2}>
            <Chip label={groupName} />
          </Box>
        ));
      },
    },
  ];

  if (isLoading) {
    return <Progress />;
  }

  if (!data) {
    return <NoData />;
  }

  return (
    <Card variant="outlined">
      <CardHeader title="Users List" />
      <CardContent>
        <DataGrid
          autoHeight
          getRowId={({ username }) => username}
          rows={data.users}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </CardContent>
    </Card>
  );
};
export default UsersList;
