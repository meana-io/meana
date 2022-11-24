import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Box,
  Button,
  Card,
  Chip,
  CardContent,
  CardHeader,
  Grid,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';

const USERS = [
  { username: '1', groups: ['1', '2'] },
  { username: '2', groups: ['2', '3'] },
  { username: '3', groups: ['1', '3', '2'] },
  { username: '4', groups: ['1', '2'] },
  { username: '5', groups: ['1', '2'] },
  { username: '6', groups: ['1', '2'] },
];

const UsersList: React.FC = ({}) => {
  const router = useRouter();
  const nodeId = router.query.id as string;
  const isLoading = true;
  // const { data: users, isLoading } = newEroror(nodeId);

  const columns: GridColDef[] = [
    { field: 'username', headerName: 'Username', minWidth: 200 },
    {
      field: 'groups',
      headerName: 'Groups',
      minWidth: 400,
    },
  ];
  return (
    <Card>
      <CardHeader title="Users List" />
      <CardContent>
        <DataGrid
          loading={isLoading}
          autoHeight
          getRowId={({ username }) => username}
          rows={USERS}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
      </CardContent>
    </Card>
  );
};
export default UsersList;
