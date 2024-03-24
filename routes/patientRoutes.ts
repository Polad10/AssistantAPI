import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import httpStatusCodes from '../constants/httpStatusCodes.js';
import { patientPostValidator, patientPutValidator, patientDeleteValidator } from './validators/patientValidators.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js';
import prismaExceptionCodes from '../constants/prismaExceptionCodes.js';

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try
  {
    const patients = await prisma.patient.findMany({
      where: {user_id: res.locals.userId}
    })
    
    res.json(patients)
  }
  catch(ex) {
    res.sendStatus(httpStatusCodes.internalServerError)
  }  
})

router.post('/', patientPostValidator, async (req: Request, res: Response) => {
  try {
    const patient = await prisma.patient.create({
      data: {...req.body, user_id: res.locals.userId}
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
      where: {id: req.body.id, user_id: res.locals.userId},
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
      where: {id: Number(req.params.id), user_id: res.locals.userId}
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