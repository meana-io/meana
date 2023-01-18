import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { NextPage } from 'next';
import BaseLayout from '@/layouts/Base/BaseLayout';
import { useDeleteUser, useGetUsersList } from '@/api/user';
import Link from 'next/link';
import { pageRoutes } from 'routes';
import Progress from '@/components/Progress/Progress';
import NoData from '@/components/NoData/NoData';
import useAuth from '@/hooks/useAuth';

const UsersList: NextPage = () => {
  const { user } = useAuth();
  const { data: users, isLoading } = useGetUsersList();
  const { mutateAsync } = useDeleteUser();

  if (isLoading) {
    return <Progress />;
  }

  if (!users) {
    return <NoData />;
  }

  const onDelete = async (event, cellValues) => {
    await mutateAsync(cellValues.row.uuid);
  };

  const columns: GridColDef[] = [
    // { field: 'uuid', headerName: 'ID', width: 180 },
    { field: 'login', headerName: 'Login', width: 200 },
    { field: 'firstName', headerName: 'Name', width: 200 },
    { field: 'lastName', headerName: 'Last Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'updatedAt',
      headerName: 'Update At',
      width: 200,
      renderCell: (cellValues) => {
        const updatedAt = new Date(cellValues.row.updatedAt);
        return (
          <Typography>
            {updatedAt.toLocaleTimeString()} - {updatedAt.toLocaleDateString()}
          </Typography>
        );
      },
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
      renderCell: (cellValues) => {
        const createdAt = new Date(cellValues.row.createdAt);
        return (
          <Typography>
            {createdAt.toLocaleTimeString()} - {createdAt.toLocaleDateString()}
          </Typography>
        );
      },
    },
    {
      field: 'Edit',
      width: 80,
      renderCell: (cellValues) => {
        return (
          <Link href={`${pageRoutes.editUser}/${cellValues.row.uuid}`} passHref>
            <Button
              startIcon={<EditIcon />}
              color="inherit"
              data-cy="EditUser"
            />
          </Link>
        );
      },
    },

    {
      field: 'Delete',
      width: 80,
      renderCell: (cellValues) => {
        if (cellValues.id === user.sub) {
          return null;
        }

        return (git restore --staged
          <Button
            startIcon={<DeleteIcon />}
            color="error"
            onClick={(event) => {
              onDelete(event, cellValues);
            }}
          />
        );
      },
    },
  ];
  return (
    <BaseLayout>
      <Card variant="outlined">
        <CardHeader
          title="Users List"
          action={
            <Link href={pageRoutes.createUser} passHref>
              <Button startIcon={<AddIcon />} variant="contained">
                Create User
              </Button>
            </Link>
          }
        />
        <CardContent>
          <DataGrid
            autoHeight
            getRowId={({ uuid }) => uuid}
            rows={users}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
          />
        </CardContent>
      </Card>
    </BaseLayout>
  );
};
export default UsersList;
