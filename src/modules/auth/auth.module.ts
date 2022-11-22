/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-16 16:41:10
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-18 16:10:26
 */
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
// import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: 3600 * 24 * 7 + "s" }
        })
    ],
    providers: [AuthService, JwtStrategy, LocalStrategy],
    exports: [AuthService]
})
export class AuthModule {}
