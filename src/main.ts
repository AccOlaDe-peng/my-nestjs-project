/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-14 17:47:14
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-14 18:06:08
 */
// import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import { HttpExceptionFilter } from "./common/filters/http-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("nestjs");
    //   app.useGlobalFilters(new HttpExceptionFilter());
    //   app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
