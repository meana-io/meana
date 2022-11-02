
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import {Delete as DeleteIcon, Edit as EditIcon}  from '@mui/icons-material';
import { NextPage } from 'next';

const handleClick = (event, cellValues) => {
  console.log(cellValues.row);
};

const handleCellClick = (param, event) => {
};

const handleRowClick = (param, event) => {
};



const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'login', headerName: 'Login', width: 130 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'lastLame', headerName: 'LastLame', width: 130,},
  { field: 'email', headerName: 'Email', width: 300,},
  {
    field: 'Edit',
    width: 80,
    renderCell: (cellValues) => {
      return (
        <Button
        startIcon={<EditIcon  />}
        color = 'inherit'
        onClick={(event) => {
          handleClick(event, cellValues);
        }}
        >
        </Button>
      )
    }
  },

  {
    field: 'Delete',
    width: 80,
    renderCell: (cellValues) => {
      return (
        <Button
        startIcon={<DeleteIcon  />}
        color='error'
        onClick={(event) => {
          handleClick(event, cellValues);
        }}
        >

        </Button>
      )
    }
  }

];

const rows = [
  { id: 1, login: 'snow_j', name: 'Jon', lastLame: 'Snow', email: 'snow_j@gmail.com', },
  { id: 2, login: 'lannister_c', name: 'Cersei', lastLame: 'Lannister', email: 'lannister_c@gmail.com' },
  { id: 3, login: 'lannister_j', name: 'Jaime', lastLame: 'Lannister', email: 'lannister_j@gmail.com' },
  { id: 4, login: 'stark_a', name: 'Arya', lastLame: 'Stark', email: 'stark_a@gmail.com' },
  { id: 5, login: 'targaryen_d', name: 'Daenerys', lastLame: 'Targaryen', email: 'targaryen_d@gmail.com' },
  { id: 6, login: 'melisandre_d', name: 'Daenerys', lastLame: 'Melisandre', email: 'melisandre_d@gmail.com' },
  { id: 7, login: 'clifford_f', name: 'Ferrara', lastLame: 'Clifford', email: 'clifford_f@gmail.com' },
  { id: 8, login: 'frances_r', name: 'Rossini', lastLame: 'Frances', email: 'frances_r@gmail.com' },
  { id: 9, login: 'roxie_h', name: 'Harvey', lastLame: 'Roxie', email: 'roxie_h@gmail.com' },
];


const UsersList: NextPage = () => {

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onCellClick={handleCellClick}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
export default UsersList
