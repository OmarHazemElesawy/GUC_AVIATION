import express from 'express';
import { getFlights,createFlights,deleteFlight} from '../controllers/flight.js';

const router=express.Router();

router.get("/",getFlights);
router.post("/",createFlights);
router.delete('/:id',deleteFlight);
export default router;

