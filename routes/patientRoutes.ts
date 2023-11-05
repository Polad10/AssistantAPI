import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import httpStatusCodes from '../constants/httpStatusCodes.js';
import { patientPostValidator, patientPutValidator, patientDeleteValidator } from './validators/patientValidators.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js';
import prismaExceptionCodes from '../constants/prismaExceptionCodes.js';

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

router.put('/', patientPutValidator, async (req: Request, res: Response) => {
  try {
    const patient = await prisma.patient.update({
      where: {id: req.body.id},
      data: req.body
    })

    res.status(httpStatusCodes.ok).json(patient)
  }
  catch(ex) {
    if(ex instanceof PrismaClientKnownRequestError) {
      if(ex.code === prismaExceptionCodes.recordNotFound) {
        return res.status(httpStatusCodes.notFound).json({error: 'Patient not found'})
      }
    }
    
    res.sendStatus(httpStatusCodes.internalServerError)
  }
})

router.delete('/:id', patientDeleteValidator, async (req: Request, res: Response) => {
  try {
    await prisma.patient.delete({
      where: {id: Number(req.params.id)}
    })

    res.sendStatus(httpStatusCodes.noContent)
  }
  catch(ex) {
    if(ex instanceof PrismaClientKnownRequestError) {
      if(ex.code === prismaExceptionCodes.recordNotFound) {
        return res.status(httpStatusCodes.notFound).json({error: 'Patient not found'})
      }
    }

    res.sendStatus(httpStatusCodes.internalServerError)
  }
})

export default router