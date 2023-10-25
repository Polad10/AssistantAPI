import { body } from "express-validator"
import validationErrorCheck from "./validationErrorCheck.js"

const treatmentPostValidator = [
  body('start_date').notEmpty().isISO8601().toDate(),
  body('title').notEmpty(),
  body('patient_id').notEmpty().isInt().toInt(),
  validationErrorCheck
]

export default treatmentPostValidator