import { body } from "express-validator"
import validationErrorCheck from "./validationErrorCheck.js"

const settingPostValidator = [
  body('language').notEmpty(),
  validationErrorCheck
]

const settingPutValidator = [
  ...settingPostValidator
]

export { settingPostValidator, settingPutValidator }