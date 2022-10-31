import { Module } from "@nestjs/common";
// import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
// import { RolesGuard } from "./common/guards/roles.guard";
// import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot("mongodb://localhost/nest")
  ],
  controllers: [],
  providers: [
    // { provide: APP_GUARD, useClass: RolesGuard },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor
    // }
  ]
})
export class AppModule {}
