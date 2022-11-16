/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-14 17:47:10
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-14 17:47:10
 */
import { Module } from "@nestjs/common";
// import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
// import { RolesGuard } from "./common/guards/roles.guard";
// import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AppController } from "./app.controller";

@Module({
    imports: [
        AuthModule,
        UserModule,
        MongooseModule.forRoot("mongodb://localhost/nest")
    ],
    controllers: [AppController],
    providers: [
        // { provide: APP_GUARD, useClass: RolesGuard },
        // {
        //   provide: APP_INTERCEPTOR,
        //   useClass: LoggingInterceptor
        // }
    ]
})
export class AppModule {}
