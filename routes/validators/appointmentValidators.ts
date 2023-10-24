import { body } from "express-validator"
import validationErrorCheck from "./validationErrorCheck.js"

const appointmentPostValidator = [
  body('datetime').notEmpty().isISO8601().toDate(),
  body('treatment_id').notEmpty().isInt(),
  validationErrorCheck
]

export default appointmentPostValidator