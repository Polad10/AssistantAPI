import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const patients = await prisma.patient.findMany()
  
  res.json(patients)
})

export default router