/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-16 16:24:48
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-23 18:12:22
 */
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { jwtConstants } from "./constants";
import { UserService } from "../user/user.service";
import { encryptPassword } from "src/utils/cryptogram.util";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // 请求被拒默认返回401未经授权的错误码
            secretOrKey: jwtConstants.secret
        });
    }

    // JWT验证 - Step 4: 被守卫调用 'Bearer '
    async validate(payload: any) {
        console.log(`JWT验证 - Step 4: 被守卫调用`);
        const user = await this.userService.findOne({
            username: payload.username
        });
        // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
        const hashedPassword = user.password;
        const hashPassword = payload.password;
        if (!user || hashedPassword !== hashPassword) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
