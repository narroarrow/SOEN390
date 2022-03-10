import { Paper, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, Button,  Typography, Checkbox, FormGroup, Box, Container} from '@mui/material'; 
import React from 'react'; 
import Axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';


// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'firstName', headerName: 'First name', width: 130 },
//     { field: 'lastName', headerName: 'Last name', width: 130 },
//     {
//       field: 'age',
//       headerName: 'Age',
//       type: 'number',
//       width: 90,
//     },
//     {
//       field: 'fullName',
//       headerName: 'Full name',
//       description: 'This column has a value getter and is not sortable.',
//       sortable: false,
//       width: 160,
//       valueGetter: (params) =>
//         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//     },
//   ];
  
//   const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   ];




export default function DoctorSchedule(){
  
        return (

            <div align="Center">
            <Paper elevation={24} component="form" sx={{ width: 1400, height: 2000, mt: 10}}>
            <h1>Doctor Schedule</h1>

            <Box sx = {{ display: 'flex', justifyContent: 'center'}}>
            <FormGroup sx={{ px:5,  border: 1}}>
            <FormLabel component="legend">Monday</FormLabel>
               
                <FormControlLabel control={<Checkbox/>} label="8:00 - 8:30"/>
                <FormControlLabel control={<Checkbox/>} label="8:30 - 9:00" />
                <FormControlLabel control={<Checkbox/>} label="9:00 - 9:30"/>
                <FormControlLabel control={<Checkbox/>} label="9:30 - 10:00" />
                <FormControlLabel control={<Checkbox/>} label="10:00 - 10:30"/>
                <FormControlLabel control={<Checkbox/>} label="10:30 - 11:00" />
                <FormControlLabel control={<Checkbox/>} label="11:00 - 11:30"/>
                <FormControlLabel control={<Checkbox/>} label="11:30 - 12:00" />
                <FormControlLabel control={<Checkbox/>} label="12:00 - 12:30"/>
                <FormControlLabel control={<Checkbox/>} label="12:30 - 13:00" />
                <FormControlLabel control={<Checkbox/>} label="13:00 - 13:30"/>
                <FormControlLabel control={<Checkbox/>} label="13:30 - 14:00" />
                <FormControlLabel control={<Checkbox/>} label="14:00 - 14:30"/>
                <FormControlLabel control={<Checkbox/>} label="15:30 - 16:00" />
                <FormControlLabel control={<Checkbox/>} label="16:00 - 16:30"/>
                <FormControlLabel control={<Checkbox/>} label="16:30 - 17:00" />
               
                
            </FormGroup>

            <FormGroup sx={{ px:5, textAlign:"center"}}>
            <FormLabel component="legend">Tuesday</FormLabel>
            <FormControlLabel control={<Checkbox/>} label="8:00 - 8:30"/>
                <FormControlLabel control={<Checkbox/>} label="8:30 - 9:00" />
                <FormControlLabel control={<Checkbox/>} label="9:00 - 9:30"/>
                <FormControlLabel control={<Checkbox/>} label="9:30 - 10:00" />
                <FormControlLabel control={<Checkbox/>} label="10:00 - 10:30"/>
                <FormControlLabel control={<Checkbox/>} label="10:30 - 11:00" />
                <FormControlLabel control={<Checkbox/>} label="11:00 - 11:30"/>
                <FormControlLabel control={<Checkbox/>} label="11:30 - 12:00" />
                <FormControlLabel control={<Checkbox/>} label="12:00 - 12:30"/>
                <FormControlLabel control={<Checkbox/>} label="12:30 - 13:00" />
                <FormControlLabel control={<Checkbox/>} label="13:00 - 13:30"/>
                <FormControlLabel control={<Checkbox/>} label="13:30 - 14:00" />
                <FormControlLabel control={<Checkbox/>} label="14:00 - 14:30"/>
                <FormControlLabel control={<Checkbox/>} label="15:30 - 16:00" />
                <FormControlLabel control={<Checkbox/>} label="16:00 - 16:30"/>
                <FormControlLabel control={<Checkbox/>} label="16:30 - 17:00" />
                
            </FormGroup>

            <FormGroup sx={{ px:5}}>
            <FormLabel component="legend">Wednesday</FormLabel>
            <FormControlLabel control={<Checkbox/>} label="8:00 - 8:30"/>
                <FormControlLabel control={<Checkbox/>} label="8:30 - 9:00" />
                <FormControlLabel control={<Checkbox/>} label="9:00 - 9:30"/>
                <FormControlLabel control={<Checkbox/>} label="9:30 - 10:00" />
                <FormControlLabel control={<Checkbox/>} label="10:00 - 10:30"/>
                <FormControlLabel control={<Checkbox/>} label="10:30 - 11:00" />
                <FormControlLabel control={<Checkbox/>} label="11:00 - 11:30"/>
                <FormControlLabel control={<Checkbox/>} label="11:30 - 12:00" />
                <FormControlLabel control={<Checkbox/>} label="12:00 - 12:30"/>
                <FormControlLabel control={<Checkbox/>} label="12:30 - 13:00" />
                <FormControlLabel control={<Checkbox/>} label="13:00 - 13:30"/>
                <FormControlLabel control={<Checkbox/>} label="13:30 - 14:00" />
                <FormControlLabel control={<Checkbox/>} label="14:00 - 14:30"/>
                <FormControlLabel control={<Checkbox/>} label="15:30 - 16:00" />
                <FormControlLabel control={<Checkbox/>} label="16:00 - 16:30"/>
                <FormControlLabel control={<Checkbox/>} label="16:30 - 17:00" />
                
            </FormGroup>

            <FormGroup sx={{ px:5}}>
            <FormLabel component="legend">Thursday</FormLabel>
            <FormControlLabel control={<Checkbox/>} label="8:00 - 8:30"/>
                <FormControlLabel control={<Checkbox/>} label="8:30 - 9:00" />
                <FormControlLabel control={<Checkbox/>} label="9:00 - 9:30"/>
                <FormControlLabel control={<Checkbox/>} label="9:30 - 10:00" />
                <FormControlLabel control={<Checkbox/>} label="10:00 - 10:30"/>
                <FormControlLabel control={<Checkbox/>} label="10:30 - 11:00" />
                <FormControlLabel control={<Checkbox/>} label="11:00 - 11:30"/>
                <FormControlLabel control={<Checkbox/>} label="11:30 - 12:00" />
                <FormControlLabel control={<Checkbox/>} label="12:00 - 12:30"/>
                <FormControlLabel control={<Checkbox/>} label="12:30 - 13:00" />
                <FormControlLabel control={<Checkbox/>} label="13:00 - 13:30"/>
                <FormControlLabel control={<Checkbox/>} label="13:30 - 14:00" />
                <FormControlLabel control={<Checkbox/>} label="14:00 - 14:30"/>
                <FormControlLabel control={<Checkbox/>} label="15:30 - 16:00" />
                <FormControlLabel control={<Checkbox/>} label="16:00 - 16:30"/>
                <FormControlLabel control={<Checkbox/>} label="16:30 - 17:00" />
                
            </FormGroup>

            <FormGroup sx={{ px:5}}>
            <FormLabel component="legend">Friday</FormLabel>
            <FormControlLabel control={<Checkbox/>} label="8:00 - 8:30"/>
                <FormControlLabel control={<Checkbox/>} label="8:30 - 9:00" />
                <FormControlLabel control={<Checkbox/>} label="9:00 - 9:30"/>
                <FormControlLabel control={<Checkbox/>} label="9:30 - 10:00" />
                <FormControlLabel control={<Checkbox/>} label="10:00 - 10:30"/>
                <FormControlLabel control={<Checkbox/>} label="10:30 - 11:00" />
                <FormControlLabel control={<Checkbox/>} label="11:00 - 11:30"/>
                <FormControlLabel control={<Checkbox/>} label="11:30 - 12:00" />
                <FormControlLabel control={<Checkbox/>} label="12:00 - 12:30"/>
                <FormControlLabel control={<Checkbox/>} label="12:30 - 13:00" />
                <FormControlLabel control={<Checkbox/>} label="13:00 - 13:30"/>
                <FormControlLabel control={<Checkbox/>} label="13:30 - 14:00" />
                <FormControlLabel control={<Checkbox/>} label="14:00 - 14:30"/>
                <FormControlLabel control={<Checkbox/>} label="15:30 - 16:00" />
                <FormControlLabel control={<Checkbox/>} label="16:00 - 16:30"/>
                <FormControlLabel control={<Checkbox/>} label="16:30 - 17:00" />
                
            </FormGroup>
            </Box>


              {/* <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                
              /> */}

              </Paper>
            </div>
          );
        }
  

