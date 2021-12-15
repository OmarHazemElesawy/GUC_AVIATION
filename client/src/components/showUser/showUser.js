import {React,useEffect,useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {useNavigate} from 'react-router-dom';

export default function ShowUser() {
  const[userList, setUserList]=useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/users').then((allUsers)=>{
      setUserList(allUsers.data);
    })
  },[])
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize:14,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
 const navigate=useNavigate();
  return (
      <>
      <h2>
          My Profile
      </h2>
    <TableContainer component={Paper}>
      <Table style={{width : 200}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right" >First Name</StyledTableCell>
            <StyledTableCell align="right" >Last Name</StyledTableCell>
            <StyledTableCell align="right" >Email</StyledTableCell>
            <StyledTableCell align="right" >Passport No.</StyledTableCell>
            <StyledTableCell align="right" >Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((user,key) => (
            <StyledTableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell align="right">{user.firstName}</StyledTableCell>
              <StyledTableCell align="right">{user.lastName}</StyledTableCell>
              <StyledTableCell align="right">{user.email}</StyledTableCell>
              <StyledTableCell align="right">{user.passport}</StyledTableCell>
              <StyledTableCell align="right">
              <IconButton aria-label="update" onClick={()=>{navigate(`updateUser/${userList[0]._id}`)
              }}>
                <EditIcon />
                </IconButton>
            </StyledTableCell>
            </StyledTableRow>
             
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
    </>
  );
}
