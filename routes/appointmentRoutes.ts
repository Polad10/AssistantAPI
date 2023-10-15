import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const appointments = await prisma.appointment.findMany()
  
  res.json(appointments)
})

export default router