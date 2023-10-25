import { body } from "express-validator"
import validationErrorCheck from "./validationErrorCheck.js"

const paymentPostValidator = [
  body('date').notEmpty().isISO8601().toDate(),
  body('amount').notEmpty().isFloat().toFloat(),
  body('treatment_id').notEmpty().isInt().toInt(),
  validationErrorCheck
]

export default paymentPostValidator