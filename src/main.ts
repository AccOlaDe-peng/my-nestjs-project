/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-14 17:47:14
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-23 14:58:32
 */
// import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as express from "express";
import { AppModule } from "./app.module";
import { logger } from "./common/middleware/logger.middleware";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { AllExceptionsFilter } from "./common/filters/any-exception.filter";
import { TransformInterceptor } from "./common/interceptors/transform.interceptors";
// import { JwtAuthGuard } from "./common/guards/jwt-auth.guard";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(express.json()); // For parsing application/json
    app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
    // 监听所有的请求路由，并打印日志
    app.use(logger);
    // 使用拦截器打印出参
    app.useGlobalInterceptors(new TransformInterceptor());
    app.setGlobalPrefix("nestjs");
    // app.useGlobalGuards(new JwtAuthGuard());
    //   app.useGlobalPipes(new ValidationPipe());
    // 过滤处理 HTTP 异常
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(3000);
}
bootstrap();
