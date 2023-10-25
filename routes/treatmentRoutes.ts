import express, {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client'
import httpStatusCodes from '../constants/httpStatusCodes.js';
import treatmentPostValidator from './validators/treatmentValidators.js';

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const treatments = await prisma.treatment.findMany()
  
  res.json(treatments)
})

router.post('/', treatmentPostValidator, async (req: Request, res: Response) => {
  try {
    const treatment = await prisma.treatment.create({
      data: req.body
    })

    res.status(httpStatusCodes.created).json(treatment)
  }
  catch(ex) {
    res.sendStatus(httpStatusCodes.internalServerError)
  }  
})

export default router