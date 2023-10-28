import { body, param } from "express-validator"
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

const appointmentDeleteValidator = [
  param('id').notEmpty().isInt().toInt(),
  validationErrorCheck
]

export { appointmentPostValidator, appointmentPutValidator, appointmentDeleteValidator }