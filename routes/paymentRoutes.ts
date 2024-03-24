import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import httpStatusCodes from '../constants/httpStatusCodes.js';
import { paymentPostValidator, paymentPutValidator, paymentDeleteValidator } from './validators/paymentValidators.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js';
import prismaExceptionCodes from '../constants/prismaExceptionCodes.js';

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try
  {
    const payments = await prisma.payment.findMany({
      where: {user_id: res.locals.userId}
    })
    
    res.json(payments)
  }
  catch(ex) {
    res.sendStatus(httpStatusCodes.internalServerError)
  }  
})

router.post('/', paymentPostValidator, async (req: Request, res: Response) => {
  try {
    const payment = await prisma.payment.create({
      data: {...req.body, user_id: res.locals.userId}
    })

    res.status(httpStatusCodes.created).json(payment)
  }
  catch(ex) {
    res.sendStatus(httpStatusCodes.internalServerError)
  }  
})

router.put('/', paymentPutValidator, async (req: Request, res: Response) => {
  try {
    const payment = await prisma.payment.update({
      where: {id: req.body.id, user_id: res.locals.userId},
      data: req.body
    })

    res.status(httpStatusCodes.ok).json(payment)
  }
  catch(ex) {
    if(ex instanceof PrismaClientKnownRequestError) {
      if(ex.code === prismaExceptionCodes.recordNotFound) {
        return res.status(httpStatusCodes.notFound).json({error: 'Payment not found'})
      }
    }
    
    res.sendStatus(httpStatusCodes.internalServerError)
  }
})

router.delete('/:id', paymentDeleteValidator, async (req: Request, res: Response) => {
  try {
    await prisma.payment.delete({
      where: {id: Number(req.params.id), user_id: res.locals.userId}
    })

    res.sendStatus(httpStatusCodes.noContent)
  }
  catch(ex) {
    if(ex instanceof PrismaClientKnownRequestError) {
      if(ex.code === prismaExceptionCodes.recordNotFound) {
        return res.status(httpStatusCodes.notFound).json({error: 'Payment not found'})
      }
    }

    res.sendStatus(httpStatusCodes.internalServerError)
  }
})

export default router