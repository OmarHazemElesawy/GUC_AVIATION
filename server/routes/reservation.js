import express from 'express';
import {getReservation,createReservation1,createReservation2,deleteReservation} from '../controllers/reservation.js';

const router=express.Router();

router.get("/",getReservation);
router.post("/",createReservation1);
router.post("/",createReservation2);
router.delete('/:id',deleteReservation);
export default router;

