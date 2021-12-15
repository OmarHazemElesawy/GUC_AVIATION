import express from 'express';
import {getSeats,createSeats,updateSeats} from '../controllers/seats.js';

const router=express.Router();

router.get("/",getSeats);
router.post("/",createSeats);
router.post('/:id',updateSeats);
export default router;

