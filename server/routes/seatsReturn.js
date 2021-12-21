import express from 'express';
import {getSeatsReturn,createSeatsReturn,updateSeatsReturn} from '../controllers/seatsReturn.js';

const router=express.Router();

router.get("/",getSeatsReturn);
router.post("/",createSeatsReturn);
router.post('/:id',updateSeatsReturn);
export default router;

