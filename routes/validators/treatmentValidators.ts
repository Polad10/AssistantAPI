import { body, param } from "express-validator"
import validationErrorCheck from "./validationErrorCheck.js"

const treatmentPostValidator = [
  body('start_date').notEmpty().isISO8601().toDate(),
  body('title').notEmpty(),
  body('patient_id').notEmpty().isInt().toInt(),
  body('price').notEmpty().isFloat().toFloat(),
  validationErrorCheck
]

const treatmentPutValidator = [
  body('id').notEmpty().isInt().toInt(),
  ...treatmentPostValidator
]

const treatmentDeleteValidator = [
  param('id').notEmpty().isInt().toInt(),
  validationErrorCheck
]

export { treatmentPostValidator, treatmentPutValidator, treatmentDeleteValidator }