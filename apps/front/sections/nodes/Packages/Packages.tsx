import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import {
  PriorityHigh as PriorityHighIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

import { useRouter } from 'next/router';
import Progress from '@/components/Progress/Progress';
import { useGetNodePackages } from '@/api/packages';

const Packages: React.FC = () => {
  const router = useRouter();
  const nodeId = router.query.id as string;
  const { data: packages, isLoading } = useGetNodePackages(nodeId);

  const columns: GridColDef[] = [
    { field: 'packageName', headerName: 'Package Name', minWidth: 400 },
    { field: 'packageVersion', headerName: 'Package Version', minWidth: 400 },
    {
      field: 'upgradable',
      headerName: 'Upgradable',
      minWidth: 150,
      renderCell: (cellValues) => {
        const { upgradable } = cellValues.row;
        return (
          <Button
            startIcon={upgradable && <PriorityHighIcon />}
            color={upgradable ? 'warning' : 'success'}
          >
            {upgradable ? 'Upgradable' : 'Up to date'}
          </Button>
        );
      },
    },
    {
      field: 'cve',
      headerName: 'CVE',
      minWidth: 150,
      renderCell: (cellValues) => {
        const { cve } = cellValues.row;
        return (
          <Button
            startIcon={cve && <ErrorIcon />}
            color={cve ? 'error' : 'success'}
          >
            {cve ? 'CVE Detected' : 'Up to date'}
          </Button>
        );
      },
    },
  ];

  if (isLoading) {
    return <Progress />;
  }

  return (
    <Card>
      <CardHeader title="Packages" />
      <CardContent>
        <DataGrid
          autoHeight
          getRowId={({ packageName }) => packageName}
          rows={packages}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
      </CardContent>
    </Card>
  );
};
export default Packages;
