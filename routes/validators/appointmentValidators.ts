import { body } from "express-validator"
import validationErrorCheck from "./validationErrorCheck.js"

const appointmentPostValidator = [
  body('datetime').notEmpty().isISO8601().toDate(),
  body('treatment_id').notEmpty().isInt().toInt(),
  validationErrorCheck
]

const appointmentPutValidator = [
  body('id').notEmpty().isInt().toInt(),
  ...appointmentPostValidator
]

export { appointmentPostValidator, appointmentPutValidator }