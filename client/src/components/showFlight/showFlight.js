import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(name, flightNo,departureTime,arrivalTime,ecoSeatNo,businessSeatNo,airport,terminal) {
  return { name, flightNo,departureTime,arrivalTime,ecoSeatNo,businessSeatNo,airport,terminal};
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  return (
      <>
      <h2>
          All Flights
      </h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Flight details</TableCell>
            <TableCell align="right" style={{width:'30%'}}>FlightNo</TableCell>
            <TableCell align="right" style={{width:'30%'}}>DepartureTime</TableCell>
            <TableCell align="right" style={{width:'30%'}}>ArrivalTime</TableCell>
            <TableCell align="right" style={{width:'30%'}}>EcoSeatNo</TableCell>
            <TableCell align="right" style={{width:'30%'}}>BusinessSeatNo</TableCell>
            <TableCell align="right" style={{width:'30%'}}>Airport</TableCell>
            <TableCell align="right" style={{width:'30%'}}>Terminal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.flightNo}</TableCell>
              <TableCell align="right">{row.departureTime}</TableCell>
              <TableCell align="right">{row.arrivalTime}</TableCell>
              <TableCell align="right">{row.ecoSeatNo}</TableCell>
              <TableCell align="right">{row.businessSeatNo}</TableCell>
              <TableCell align="right">{row.airport}</TableCell>
              <TableCell align="right">{row.terminal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
