import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const payments = await prisma.payment.findMany()
  
  res.json(payments)
})

export default router