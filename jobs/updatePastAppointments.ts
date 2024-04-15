import { PrismaClient } from "@prisma/client"
import { AppointmentStatus } from 'assistant-common'
import { DateTime } from "luxon"

const prisma = new PrismaClient()

export async function updatePastAppointments() {
  try {
    await prisma.appointment.updateMany({
      where: {
        status: AppointmentStatus.Expected,
        datetime: {
          lt: DateTime.local().set({hour: 0, minute: 0, second: 0, millisecond: 0}).toISO()
        }
      },
      data: {
        status: AppointmentStatus.Finished
      }
    })
  }
  catch(ex) {
    console.log('Could not update past appointments')
  }  
}