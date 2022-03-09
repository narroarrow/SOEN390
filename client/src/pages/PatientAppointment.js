import * as React from 'react';
import {useState} from 'react';
import {Container, Typography, Box, Grid, FormLabel, RadioGroup, Radio, FormControl, FormControlLabel, TextField, CssBaseline, Button, Avatar, MenuItem, stepConnectorClasses} from '@mui/material'
import Axios from 'axios';



let items=['Monday 8h30-9h','Monday 9h-9h40', 'Tuesday 16h-16h30','Wednesday 13h30-14h','Friday 15h-15h30'];
let itemList=[];
items.forEach((item,index)=>{
  itemList.push( 
<FormControlLabel value={item} name={item} id={index} control={<Radio />} label={item} />
  // <Grid item xs={12}>
    
  //{/* <Button id={index} name={index} type="submit" variant="contained" fullWidth color="primary" onClick={testing= {item}}> */}
    // {item}
  //  {/* </Button> */}
// </Grid>
  )
})





function PatientAppointment() {
  
  const [value, setValue] = React.useState('');
  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  let submitSAppointmentForm = (event) =>{
    event.preventDefault();
    console.log(value);
    if(value != ''){
      Axios.post('http://localhost:8080/PatientAppointment',{
      }, {withCredentials: true}).then(()=>{
        //will have user authentication here
        alert("success");
      });
    }
    else{
      alert("Please select a valid appointment");
    }
    
  };
  return (

    
    <Container component="main" maxWidth="xs">
    <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
      {/* <Box component="form" noValidate onSubmit={submitSAppointmentForm} sx={{ mt: 3,alignItems: 'center'}}> */}
      <form onSubmit={submitSAppointmentForm}>
      <FormControl sx={{ m: 3 }} variant="standard">
        <FormLabel id="demo-error-radios">Book your appointment</FormLabel>
        <RadioGroup aria-labelledby="demo-error-radios" name="appointment" onChange={handleRadioChange}>
          {itemList}
        </RadioGroup>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Submit
        </Button>
      </FormControl>
    </form>

        {/* </Box> */}
      </Box>
    </Container>


  )
}

  export default PatientAppointment



// import * as React from 'react';
// import {useState} from 'react';
// import { Paper, styled, TableCell, Table, TableBody, TableContainer, TableHead, TableRow} from '@mui/material'


// // function createData(name, calories, fat) {
// //   return { name, calories, fat };
// // }

// const tdTaken = styled(TableCell)(({ theme }) => ({
//     // border: "1px solid black",
//     // backgroundColor: "green",
//     // height: "15px"
//   }));

//   const tdFree = styled(TableCell)(({ theme }) => ({
//     border: "1px solid black",
//     height: "15px"
//   }));
  

// // const rows = [
// //   createData('Cupcake', 305, 3.7),
// //   createData('Donut', 452, 25.0),
// //   createData('Eclair', 262, 16.0),
// //   createData('Frozen yoghurt', 159, 6.0),
// //   createData('Gingerbread', 356, 16.0),
// //   createData('Honeycomb', 408, 3.2),
// //   createData('Ice cream sandwich', 237, 9.0),
// //   createData('Jelly Bean', 375, 0.0),
// //   createData('KitKat', 518, 26.0),
// //   createData('Lollipop', 392, 0.2),
// //   createData('Marshmallow', 318, 0),
// //   createData('Nougat', 360, 19.0),
// //   createData('Oreo', 437, 18.0),
// // ].sort((a, b) => (a.calories < b.calories ? -1 : 1));


  

// function PatientAppointment() {
// //     const [page, setPage] = React.useState(0);
// //     const [rowsPerPage, setRowsPerPage] = React.useState(5);

// //   // Avoid a layout jump when reaching the last page with empty rows.
// //   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

//   // const [freedom, setFreedom] = React.useState('Free');

//   // const handleChange = () => {
//   //   if (freedom == 'Free')
//   //   setFreedom('Taken');
//   //   else
//   //   setFreedom('Free');
//   // };

//   return (
   

//     // <TableContainer>
//     //   <Table >
//     //     <TableHead>
//     //       <TableRow>
//     //         <TableCell>Dessert (100g serving)</TableCell>
//     //         <TableCell>Calories</TableCell>
//     //         <TableCell>Fat&nbsp;(g)</TableCell>
//     //         <TableCell>Carbs&nbsp;(g)</TableCell>
//     //         <TableCell>Protein&nbsp;(g)</TableCell>
//     //       </TableRow>
//     //     </TableHead>
//     //     <TableBody>
//     //         <TableRow>
//     //           <tdTaken> Hello</tdTaken>
//     //           <tdTaken> world </tdTaken>
//     //           <tdTaken>afe</tdTaken>
//     //           <tdTaken>efwff</tdTaken>
//     //           <tdTaken>edfwfdew</tdTaken>
//     //         </TableRow>
//     //     </TableBody>
//     //   </Table>
//     // </TableContainer>

   

//     <table aria-label="custom pagination table" style={{border: "1px solid black"}}>
//         <thead>
//           <tr>
//             <th>time</th>
//             <th style={{border: "1px solid black"}}>Sunday</th>
//             <th style={{border: "1px solid black"}}>Monday</th>
//             <th style={{border: "1px solid black"}}>Tuesday</th>
//             <th style={{border: "1px solid black"}}>Wednesday</th>
//             <th style={{border: "1px solid black"}}>Thursday</th>
//             <th style={{border: "1px solid black"}}>Friday</th>
//             <th style={{border: "1px solid black"}}>Saturday</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* for (i=0; i<=7; i++){
//             <tr>
//               for (j=0; j<=24; j++){
//                 <td id="j+i*7" className='if from backend then free, else not free' onclick() =>(do smt)></td>
//               }
//             </tr>
//           } */}
//             <tr>
//                 <td style={{border: "1px solid black"}}>8h</td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//             </tr>
//             <tr>
//                 <td style={{border: "1px solid black"}}>8h30</td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//             </tr>
//             <tr>
//                 <td style={{border: "1px solid black"}}>9h</td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//             </tr>
//             <tr>
//                 <td style={{border: "1px solid black"}}>9h30</td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//             </tr>
//             <tr>
//                 <td style={{border: "1px solid black"}}>10h</td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//             </tr>
//             <tr>
//                 <td style={{border: "1px solid black"}}>10h30</td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//             </tr>
//             <tr>
//                 <td style={{border: "1px solid black"}}>11h</td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//             </tr>
//             <tr>
//             <td style={{border: "1px solid black"}}>11h30</td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//             </tr>
//             <tr>
//             <td style={{border: "1px solid black"}}>12h</td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//             </tr>
//             <tr>
//             <td style={{border: "1px solid black"}}>12h30</td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//             </tr>
//             <tr>
//                 <td style={{border: "1px solid black"}}>13h</td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//             </tr>
//             <tr>
//                 <td style={{border: "1px solid black"}}>13h30</td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//             </tr>
//             <tr>
//                 <td style={{border: "1px solid black"}}>14h</td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black", backgroundColor: "green"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//             </tr>
//             <tr>
//                 <td style={{border: "1px solid black"}}>14h30</td>
//                 <td style={{border: "1px solid black", backgroundColor: "green"}}></td>
//                 <td style={{border: "1px solid black", backgroundColor: "green"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black", backgroundColor: "green"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//             </tr>
//             <tr>
//                 <td style={{border: "1px solid black"}}>15h</td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black", backgroundColor: "green"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//                 <td style={{border: "1px solid black"}}></td>
//             </tr>
//            {/* {(rowsPerPage > 0
//     //         ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//     //         : rows
//     //       ).map((row) => (
//     //         <tr key={row.name}>
//     //           <td>{row.name}</td>
//     //           <td style={{ width: 160 }} align="right">
//     //             {row.calories}
//     //           </td>
//     //           <td style={{ width: 160 }} align="right">
//     //             {row.fat}
//     //           </td>
//     //         </tr>
//     //       ))}

//     //       {emptyRows > 0 && (
//     //         <tr style={{ height: 41 * emptyRows }}>
//     //           <td colSpan={3} />
//     //         </tr>
//     //       )} */}
//         </tbody>
//      </table>


//   )
// }

// export default PatientAppointment