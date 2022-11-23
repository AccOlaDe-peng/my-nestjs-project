/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-16 18:31:27
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-23 18:14:18
 */
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException
} from "@nestjs/common";

@Injectable()
export class RolesGuard implements CanActivate {
    // constructor(private readonly reflector: Reflector) {}
    constructor(private readonly role: number) {}
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log(user.role, this.role);
        if (user.role > this.role) {
            throw new ForbiddenException("对不起，您无权操作");
        }
        return true;
    }
}
