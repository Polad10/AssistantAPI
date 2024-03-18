import { NextFunction, Response, Request } from "express";
import { getAuth } from "firebase-admin/auth";
import httpStatusCodes from "../constants/httpStatusCodes.js";

export async function auth(req: Request, res: Response, next: NextFunction) {
  const auth = getAuth()
  const idToken = req.headers.authorization
  
  if(!idToken) {
    return res.sendStatus(httpStatusCodes.unauthorized) 
  }

  try {
    const decodedIdToken = await auth.verifyIdToken(idToken)

    res.locals.userId = decodedIdToken.uid
    res.locals.email = decodedIdToken.email

    next()
  }
  catch(ex) {
    return res.sendStatus(httpStatusCodes.unauthorized)  
  }
}