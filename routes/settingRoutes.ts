import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from 'express';
import httpStatusCodes from "../constants/httpStatusCodes.js"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import prismaExceptionCodes from "../constants/prismaExceptionCodes.js";
import { settingPostValidator, settingPutValidator } from "./validators/settingValidators.js";

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try
  {
    const setting = await prisma.setting.findUnique({
      where: {user_id: res.locals.userId}
    })
    
    res.json(setting)
  }
  catch(ex) {
    res.sendStatus(httpStatusCodes.internalServerError)
  }  
})

router.post('/', settingPostValidator, async (req: Request, res: Response) => {
  try {
    const setting = await prisma.setting.create({
      data: {...req.body, user_id: res.locals.userId}
    })

    res.status(httpStatusCodes.created).json(setting)
  }
  catch(ex) {
    res.sendStatus(httpStatusCodes.internalServerError)
  }  
})

router.put('/', settingPutValidator, async (req: Request, res: Response) => {
  try {
    const setting = await prisma.setting.update({
      where: {user_id: res.locals.userId},
      data: req.body
    })

    res.status(httpStatusCodes.ok).json(setting)
  }
  catch(ex) {
    if(ex instanceof PrismaClientKnownRequestError) {
      if(ex.code === prismaExceptionCodes.recordNotFound) {
        return res.status(httpStatusCodes.notFound).json({error: 'Setting not found'})
      }
    }
    
    res.sendStatus(httpStatusCodes.internalServerError)
  }
})

export default router