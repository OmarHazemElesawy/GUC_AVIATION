import express from 'express';
import { getFlights,createFlights,deleteFlight,updateFlight} from '../controllers/flight.js';

const router=express.Router();

router.get("/",getFlights);
router.post("/",createFlights);
router.delete('/:id',deleteFlight);
router.put('/update/:id',updateFlight);
router.get('/searchData',getFlights);
export default router;

