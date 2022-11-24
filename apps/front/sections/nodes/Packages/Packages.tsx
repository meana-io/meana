import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import {
  PriorityHigh as PriorityHighIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

import { useRouter } from 'next/router';

const PACKAGES = [
  {
    packageName: '123',
    packageVersion: 1,
    upgradable: true,
    cve: true,
  },
  {
    packageName: '345',
    packageVersion: 2,
    upgradable: false,
    cve: false,
  },
  {
    packageName: '678',
    packageVersion: 3,
    upgradable: true,
    cve: false,
  },
  {
    packageName: '346',
    packageVersion: 4,
    upgradable: true,
    cve: true,
  },
];

const Packages: React.FC = ({}) => {
  const router = useRouter();
  const nodeId = router.query.id as string;
  const isLoading = true;
  // const { data: users, isLoading } = newEroror(nodeId);
  // <Chip label="Chip Filled" />
  const columns: GridColDef[] = [
    { field: 'packageName', headerName: 'Package Name', minWidth: 200 },
    { field: 'packageVersion', headerName: 'Package Version', minWidth: 200 },
    {
      field: 'upgradable',
      headerName: 'Upgradable',
      minWidth: 200,
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
      minWidth: 200,
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

  return (
    <Card>
      <CardHeader title="Packages" />
      <CardContent>
        <DataGrid
          // loading={isLoading}
          disableColumnSelector
          autoHeight
          getRowId={({ packageName }) => packageName}
          rows={PACKAGES}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
      </CardContent>
    </Card>
  );
};
export default Packages;
