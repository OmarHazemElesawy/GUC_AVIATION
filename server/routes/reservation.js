import express from 'express';
import {getReservation,createReservation1,createReservation2,deleteReservation,updateReservation1,updateReservation2} from '../controllers/reservation.js';

const router=express.Router();

router.get("/",getReservation);
router.post("/",createReservation1);
router.post("/",createReservation2);
router.delete('/:id',deleteReservation);
router.post('/:id',updateReservation1);
router.post('/:id',updateReservation2);
export default router;

