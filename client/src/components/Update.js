import React  from 'react';
import TextField from '@mui/material/TextField';
import { useParams,useNavigate } from 'react-router-dom';
import { Button,Stack,Box } from '@mui/material';
import axios from 'axios';
function Update() {
    const {id}:{id:string}=useParams();
    const navigate=useNavigate();

    const updateFlight=(ID)=>{
        axios.post(`http://localhost:5000/flights/${ID}`).then(()=>{
          window.location.reload(false);
        })
      }
    return (
    <div>
        update:{id}
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="FlightNo" variant="standard" />
      <TextField id="standard-basic" label="departureTime" variant="standard" />
      <TextField id="standard-basic" label="ArrivalTime" variant="standard" />
      <TextField id="standard-basic" label="EconomicSeaNo" variant="standard" />
      <TextField id="standard-basic" label="BuisnessSeatNo" variant="standard" />
      <TextField id="standard-basic" label="Airport" variant="standard" />
      <TextField id="standard-basic" label="Terminal" variant="standard" />
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={()=>{const confirmBox = window.confirm("Are you sure you want to update?")
                if(confirmBox===true){
                  updateFlight(id)
                  navigate("/")}}}>Update Flight</Button>
    </Stack>
    </Box>
    </div>
    );
}

export default Update;