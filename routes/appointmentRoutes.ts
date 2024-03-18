import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import httpStatusCodes from '../constants/httpStatusCodes.js';
import {appointmentDeleteValidator, appointmentPostValidator, appointmentPutValidator } from './validators/appointmentValidators.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js';
import prismaExceptionCodes from '../constants/prismaExceptionCodes.js';

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const appointments = await prisma.appointment.findMany({
    where: {user_id: res.locals.userId}
  })
  
  res.json(appointments)
})

router.post('/', appointmentPostValidator, async (req: Request, res: Response) => {
  try {
    const appointment = await prisma.appointment.create({
      data: { ...req.body, user_id: res.locals.userId }
    })

    res.status(httpStatusCodes.created).json(appointment)
  }
  catch(ex) {
    res.sendStatus(httpStatusCodes.internalServerError)
  }  
})

router.put('/', appointmentPutValidator, async (req: Request, res: Response) => {
  try {
    const appointment = await prisma.appointment.update({
      where: {id: req.body.id, user_id: res.locals.userId},
      data: req.body
    })

    res.status(httpStatusCodes.ok).json(appointment)
  }
  catch(ex) {
    if(ex instanceof PrismaClientKnownRequestError) {
      if(ex.code === prismaExceptionCodes.recordNotFound) {
        return res.status(httpStatusCodes.notFound).json({error: 'Appointment not found'})
      }
    }
    
    res.sendStatus(httpStatusCodes.internalServerError)
  }
})

router.delete('/:id', appointmentDeleteValidator, async (req: Request, res: Response) => {
  try {
    await prisma.appointment.delete({
      where: {id: Number(req.params.id), user_id: res.locals.userId}
    })

    res.sendStatus(httpStatusCodes.noContent)
  }
  catch(ex) {
    if(ex instanceof PrismaClientKnownRequestError) {
      if(ex.code === prismaExceptionCodes.recordNotFound) {
        return res.status(httpStatusCodes.notFound).json({error: 'Appointment not found'})
      }
    }
    
    res.sendStatus(httpStatusCodes.internalServerError)
  }
})

export default router