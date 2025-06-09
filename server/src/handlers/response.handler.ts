import { Response } from "express"

const success = (res: Response, data: unknown, message = ""): unknown => {
    return res.status(200).json({
        success: true,
        code: 200,
        data,
        message
    })
}

const create = (res: Response, data: unknown, message = ""): unknown => {
    return res.status(201).json({
        success: true,
        code: 201,
        data,
        message
    })
}

const badRequest = (res: Response, error: unknown, message = "Bad Request"): unknown => {
    return res.status(400).json({
        success: false,
        code: 400,
        error,
        message
    })
}

const notFound = (res: Response, message: string): unknown => {
    return res.status(404).json({
        success: false,
        code: 404,
        message
    })
}

const serverError = (res: Response, error: unknown, message = "Server Error : Somthing went wrong"): unknown => {
    return res.status(500).json({
        success: false,
        code: 500,
        error,
        message
    })
}

const resposeHandler = { success, create, notFound, badRequest, serverError };

export default resposeHandler;