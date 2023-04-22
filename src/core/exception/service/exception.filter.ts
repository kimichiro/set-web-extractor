import {
    ArgumentsHost,
    ExceptionFilter as NestExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { Catch } from '@nestjs/common/decorators'
import { AxiosError } from 'axios'
import { Request, Response } from 'express'

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        let errorCode: string | number
        let errorMessage: string

        if (exception instanceof HttpException) {
            const cause = exception.cause
            if (cause instanceof AxiosError) {
                errorCode = cause.code
            } else {
                errorCode = exception.getStatus()
            }

            errorMessage = cause.message
        }

        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            path: request.url,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            errorCode,
            errorMessage,
        })
    }
}
