/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-16 16:24:48
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-23 11:06:44
 */
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { jwtConstants } from "./constants";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // 请求被拒默认返回401未经授权的错误码
            secretOrKey: jwtConstants.secret
        });
    }

    // JWT验证 - Step 4: 被守卫调用 'Bearer '
    async validate(payload: any) {
        console.log(`JWT验证 - Step 4: 被守卫调用`);
        const user = await this.authService.validateUser(
            payload.username,
            payload.password
        );
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
