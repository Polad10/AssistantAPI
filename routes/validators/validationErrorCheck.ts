import { validationResult } from "express-validator"
import httpStatusCodes from "../../constants/httpStatusCodes.js"
import { Request, Response, NextFunction } from "express"

const validationErrorCheck = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(httpStatusCodes.badRequest).json(errors)
  }

  next()
}

export default validationErrorCheck