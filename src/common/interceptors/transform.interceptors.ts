/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-23 14:14:31
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-23 14:47:59
 */
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Logger } from "src/utils/log4js.util";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.getArgByIndex(1).req;
        return next.handle().pipe(
            map((data) => {
                const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    User: ${JSON.stringify(req.user)}
    Response data:\n ${JSON.stringify(data)}
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
                Logger.info(logFormat);
                Logger.access(logFormat);
                return data;
            })
        );
    }
}
