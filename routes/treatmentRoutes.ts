import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const treatments = await prisma.treatment.findMany()
  
  res.json(treatments)
})

export default router