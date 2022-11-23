/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-16 18:31:27
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-23 10:37:40
 */
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        console.log(context.getHandler());
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log(user);
        return true;
    }
}
