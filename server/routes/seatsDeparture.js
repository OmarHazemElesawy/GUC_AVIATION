import express from 'express';
import {getSeatsDeparture,createSeatsDeparture,updateSeatsDeparture} from '../controllers/seatsDeparture.js';

const router=express.Router();

router.get("/",getSeatsDeparture);
router.post("/",createSeatsDeparture);
router.post('/:id',updateSeatsDeparture);
export default router;

