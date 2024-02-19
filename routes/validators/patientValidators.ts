import { body, param } from "express-validator"
import validationErrorCheck from "./validationErrorCheck.js"

const patientPostValidator = [
  body('first_name').notEmpty(),
  body('last_name').notEmpty(),
  body('dob').if(value => value).isISO8601().toDate(),
  validationErrorCheck
]

const patientPutValidator = [
  body('id').notEmpty().isInt().toInt(),
  ...patientPostValidator
]

const patientDeleteValidator = [
  param('id').notEmpty().isInt().toInt(),
  validationErrorCheck
]

export { patientPostValidator, patientPutValidator, patientDeleteValidator }