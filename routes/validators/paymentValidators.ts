import { body } from "express-validator"
import validationErrorCheck from "./validationErrorCheck.js"

const paymentPostValidator = [
  body('date').notEmpty().isISO8601().toDate(),
  body('amount').notEmpty().isDecimal(),
  body('treatment_id').notEmpty().isInt(),
  validationErrorCheck
]

export default paymentPostValidator