import { body } from "express-validator"
import validationErrorCheck from "./validationErrorCheck.js"

const patientPostValidator = [
  body('first_name').notEmpty(),
  body('last_name').notEmpty(),
  validationErrorCheck
]

export default patientPostValidator