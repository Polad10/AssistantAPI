import express, {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client'
import httpStatusCodes from '../constants/httpStatusCodes.js';
import { treatmentPostValidator, treatmentDeleteValidator, treatmentPutValidator } from './validators/treatmentValidators.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js';
import prismaExceptionCodes from '../constants/prismaExceptionCodes.js';

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try
  {
    const treatments = await prisma.treatment.findMany({
      where: {user_id: res.locals.userId}
    })
    
    res.json(treatments)
  }
  catch(ex) {
    res.sendStatus(httpStatusCodes.internalServerError)
  } 
})

router.post('/', treatmentPostValidator, async (req: Request, res: Response) => {
  try {
    const treatment = await prisma.treatment.create({
      data: {...req.body, user_id: res.locals.userId}
    })

    res.status(httpStatusCodes.created).json(treatment)
  }
  catch(ex) {
    res.sendStatus(httpStatusCodes.internalServerError)
  }  
})

router.put('/', treatmentPutValidator, async (req: Request, res: Response) => {
  try {
    const treatment = await prisma.treatment.update({
      where: {id: req.body.id, user_id: res.locals.userId},
      data: req.body
    })

    res.status(httpStatusCodes.ok).json(treatment)
  }
  catch(ex) {
    if(ex instanceof PrismaClientKnownRequestError) {
      if(ex.code === prismaExceptionCodes.recordNotFound) {
        return res.status(httpStatusCodes.notFound).json({error: 'Treatment not found'})
      }
    }
    
    res.sendStatus(httpStatusCodes.internalServerError)
  }
})

router.delete('/:id', treatmentDeleteValidator, async (req: Request, res: Response) => {
  try {
    await prisma.treatment.delete({
      where: {id: Number(req.params.id), user_id: res.locals.userId}
    })

    res.sendStatus(httpStatusCodes.noContent)
  }
  catch(ex) {
    if(ex instanceof PrismaClientKnownRequestError) {
      if(ex.code === prismaExceptionCodes.recordNotFound) {
        return res.status(httpStatusCodes.notFound).json({error: 'Treatment not found'})
      }
    }

    res.sendStatus(httpStatusCodes.internalServerError)
  }
})

export default router