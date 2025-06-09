import { Request, Response, NextFunction } from 'express';
import responseHandler from './response.handler';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("error : ", err)
    responseHandler.serverError(res, err);
};

export default errorHandler;
