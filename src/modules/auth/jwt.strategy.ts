/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-16 16:24:48
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-16 16:43:08
 */
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    // JWT验证 - Step 4: 被守卫调用
    async validate(payload: any) {
        console.log(`JWT验证 - Step 4: 被守卫调用`);
        return { userId: payload.sub, username: payload.username };
    }
}
