import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import httpStatusCodes from '../constants/httpStatusCodes.js';
import paymentPostValidator from './validators/paymentValidators.js';

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const payments = await prisma.payment.findMany()
  
  res.json(payments)
})

router.post('/', paymentPostValidator, async (req: Request, res: Response) => {
  try {
    const payment = await prisma.payment.create({
      data: req.body
    })

    res.status(httpStatusCodes.created).json(payment)
  }
  catch(ex) {
    res.sendStatus(httpStatusCodes.internalServerError)
  }  
})

export default router