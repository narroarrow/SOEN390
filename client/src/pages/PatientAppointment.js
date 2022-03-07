import * as React from 'react';
import {useState} from 'react';
import { Paper, styled, TableCell, Table, TableBody, TableContainer, TableHead, TableRow} from '@mui/material'


// function createData(name, calories, fat) {
//   return { name, calories, fat };
// }

const tdTaken = styled(TableCell)(({ theme }) => ({
    // border: "1px solid black",
    // backgroundColor: "green",
    // height: "15px"
  }));

  const tdFree = styled(TableCell)(({ theme }) => ({
    border: "1px solid black",
    height: "15px"
  }));
  

// const rows = [
//   createData('Cupcake', 305, 3.7),
//   createData('Donut', 452, 25.0),
//   createData('Eclair', 262, 16.0),
//   createData('Frozen yoghurt', 159, 6.0),
//   createData('Gingerbread', 356, 16.0),
//   createData('Honeycomb', 408, 3.2),
//   createData('Ice cream sandwich', 237, 9.0),
//   createData('Jelly Bean', 375, 0.0),
//   createData('KitKat', 518, 26.0),
//   createData('Lollipop', 392, 0.2),
//   createData('Marshmallow', 318, 0),
//   createData('Nougat', 360, 19.0),
//   createData('Oreo', 437, 18.0),
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1));


  

function PatientAppointment() {
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };


const [color, setColor] = useState("green");

  return (
   

    <TableContainer>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell>Calories</TableCell>
            <TableCell>Fat&nbsp;(g)</TableCell>
            <TableCell>Carbs&nbsp;(g)</TableCell>
            <TableCell>Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <tdTaken> Hello</tdTaken>
              <tdTaken> world </tdTaken>
              <tdTaken>afe</tdTaken>
              <tdTaken>efwff</tdTaken>
              <tdTaken>edfwfdew</tdTaken>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>


    // <table aria-label="custom pagination table" style={{border: "1px solid black"}}>
    //     <thead>
    //       <tr>
    //         <th>time</th>
    //         <th style={{border: "1px solid black"}}>Sunday</th>
    //         <th style={{border: "1px solid black"}}>Monday</th>
    //         <th style={{border: "1px solid black"}}>Tuesday</th>
    //         <th style={{border: "1px solid black"}}>Wednesday</th>
    //         <th style={{border: "1px solid black"}}>Thursday</th>
    //         <th style={{border: "1px solid black"}}>Friday</th>
    //         <th style={{border: "1px solid black"}}>Saturday</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //         <tr>
    //             <tdFree></tdFree>
    //             <tdFree></tdFree>
    //             <tdFree></tdFree>
    //             <tdFree></tdFree>
    //             <tdFree></tdFree>
    //             <tdFree></tdFree>
    //             <tdFree></tdFree>
    //             <tdFree></tdFree>
    //         </tr>
    //         <tr>
    //             <td style={{border: "1px solid black"}, {height: "15px"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //         </tr>
    //         <tr>
    //             <td style={{border: "1px solid black"}, {height: "15px"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //         </tr>
    //         <tr>
    //             <td style={{border: "1px solid black"}, {height: "15px"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //         </tr>
    //         <tr>
    //             <td style={{border: "1px solid black"}, {height: "15px"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //         </tr>
    //         <tr>
    //             <td style={{border: "1px solid black"}, {height: "15px"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //         </tr>
    //         <tr>
    //             <td style={{border: "1px solid black"}, {height: "15px"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //         </tr>
    //         <tr>
    //             <td style={{border: "1px solid black"}, {height: "15px"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //         </tr>
    //         <tr>
    //             <td style={{border: "1px solid black"}, {height: "15px"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //         </tr>
    //         <tr>
    //             <td style={{border: "1px solid black"}, {height: "15px"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //         </tr>
    //         <tr>
    //             <td style={{border: "1px solid black"}, {height: "15px"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //         </tr>
    //         <tr>
    //             <td style={{border: "1px solid black"}, {height: "15px"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //         </tr>
    //         <tr>
    //             <td style={{border: "1px solid black"}, {height: "15px"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //         </tr>
    //         <tr>
    //             <td style={{border: "1px solid black"}, {height: "15px"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //         </tr>
    //         <tr>
    //             <td style={{border: "1px solid black"}, {height: "15px"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //         </tr>
    //         <tr>
    //             <td style={{border: "1px solid black"}, {height: "15px"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black", backgroundColor: {color}}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //             <td style={{border: "1px solid black"}}></td>
    //         </tr>
    //       {/* {(rowsPerPage > 0
    //         ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //         : rows
    //       ).map((row) => (
    //         <tr key={row.name}>
    //           <td>{row.name}</td>
    //           <td style={{ width: 160 }} align="right">
    //             {row.calories}
    //           </td>
    //           <td style={{ width: 160 }} align="right">
    //             {row.fat}
    //           </td>
    //         </tr>
    //       ))}

    //       {emptyRows > 0 && (
    //         <tr style={{ height: 41 * emptyRows }}>
    //           <td colSpan={3} />
    //         </tr>
    //       )} */}
    //     </tbody>
    // </table>


  )
}

export default PatientAppointment