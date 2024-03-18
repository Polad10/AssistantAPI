import { PrismaClient } from "@prisma/client"
import express, { Request, Response } from "express"
import httpStatusCodes from "../constants/httpStatusCodes.js"

const router = express.Router()
const prisma = new PrismaClient()

router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.create({
      data: {
        id: res.locals.userId,
        email: res.locals.email
      }
    })
    
    res.status(httpStatusCodes.created).json(user)
  }
  catch(ex) {
    res.sendStatus(httpStatusCodes.internalServerError)
  }
})

export default router