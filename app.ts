import express from 'express'
import patientRoutes from './routes/patientRoutes.js'
import treatmentRoutes from './routes/treatmentRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import { auth } from './middlewares/auth.js'
import { initializeApp, applicationDefault } from 'firebase-admin/app'
import authRoutes from './routes/authRoutes.js'

const app = express()
const port = 3000

initializeApp({
  credential: applicationDefault()
})

app.use(express.json())
app.use(auth)

app.use('/patients', patientRoutes)
app.use('/treatments', treatmentRoutes)
app.use('/appointments', appointmentRoutes)
app.use('/payments', paymentRoutes)
app.use('/signUp', authRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
