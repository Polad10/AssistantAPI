import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import { body, validationResult } from 'express-validator';
import httpStatusCodes from '../constants/httpStatusCodes.js';
import patientPostValidator from './validators/patientValidators.js';

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const patients = await prisma.patient.findMany()
  
  res.json(patients)
})

router.post('/', patientPostValidator, async (req: Request, res: Response) => {
  try {
    const patient = await prisma.patient.create({
      data: req.body
    })

    res.status(httpStatusCodes.created).json(patient)
  }
  catch(ex) {
    res.sendStatus(httpStatusCodes.internalServerError)
  }
})

export default router