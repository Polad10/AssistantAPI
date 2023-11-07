import { body, param } from "express-validator"
import validationErrorCheck from "./validationErrorCheck.js"

const paymentPostValidator = [
  body('date').notEmpty().isISO8601().toDate(),
  body('amount').notEmpty().isFloat().toFloat(),
  body('treatment_id').notEmpty().isInt().toInt(),
  validationErrorCheck
]

const paymentPutValidator = [
  body('id').notEmpty().isInt().toInt(),
  ...paymentPostValidator
]

const paymentDeleteValidator = [
  param('id').notEmpty().isInt().toInt(),
  validationErrorCheck
]

export { paymentPostValidator, paymentPutValidator, paymentDeleteValidator }