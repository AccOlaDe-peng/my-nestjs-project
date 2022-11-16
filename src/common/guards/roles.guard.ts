/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-16 18:31:27
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-16 18:31:27
 */
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>(
            "roles",
            context.getHandler()
        );
        console.log(roles);

        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const hasRole = () => user.roles.some((role) => roles.includes(role));
        console.log(user);
        return user && user.roles && hasRole();
    }
}
