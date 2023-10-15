import express from 'express'
import patientRoutes from './routes/patientRoutes.js'
import treatmentRoutes from './routes/treatmentRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

const app = express()
const port = 3000

app.use('/patients', patientRoutes)
app.use('/treatments', treatmentRoutes)
app.use('/appointments', appointmentRoutes)
app.use('/payments', paymentRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
