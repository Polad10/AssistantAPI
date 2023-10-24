import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import httpStatusCodes from '../constants/httpStatusCodes.js';
import appointmentPostValidator from './validators/appointmentValidators.js';

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const appointments = await prisma.appointment.findMany()
  
  res.json(appointments)
})

router.post('/', appointmentPostValidator, async (req:Request, res:Response) => {
  try {
    const appointment = await prisma.appointment.create({
      data: req.body
    })

    res.status(httpStatusCodes.created).json(appointment)
  }
  catch(ex) {
    res.sendStatus(httpStatusCodes.internalServerError)
  }  
})

export default router