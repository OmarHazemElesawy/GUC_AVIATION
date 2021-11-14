import express from 'express';
import { getFlights,createFlights } from '../controllers/flight.js';
import flight from '../models/flight.js';

const router=express.Router();

router.get("/",getFlights);
router.post("/",createFlights);

export default router;

