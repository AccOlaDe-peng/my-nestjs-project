/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-23 14:50:49
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-23 14:51:51
 */
import {
    Catch,
    ArgumentsHost,
    HttpException,
    ExceptionFilter
} from "@nestjs/common";
import { Request, Response } from "express";
import { Logger } from "src/utils/log4js.util";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        Request original url: ${request.originalUrl}
        Method: ${request.method}
        IP: ${request.ip}
        Status code: ${status}
        Response: ${exception.toString()} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        `;
        Logger.info(logFormat);
        response.status(status).json({
            statusCode: status,
            error: exception.message,
            timestamp: new Date().toISOString(),
            path: request.url,
            msg: `${status >= 500 ? "Service Error" : "Client Error"}`
        });
    }
}
