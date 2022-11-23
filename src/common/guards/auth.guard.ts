/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-23 10:25:18
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-23 10:30:25
 */
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { AuthGuard, IAuthGuard } from "@nestjs/passport";

@Injectable()
//  自定义Guard必须实现canActivate方法
export class RoleAuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log(context);
        //    在这里取metadata中的no-auth，得到的会是一个bool
        const noAuth = this.reflector.get<boolean>(
            "no-auth",
            context.getHandler()
        );
        const guard = RoleAuthGuard.getAuthGuard(noAuth);
        return guard.canActivate(context); //  执行所选策略Guard的canActivate方法
        // return true;
    }

    //  根据NoAuth的t/f选择合适的策略Guard
    private static getAuthGuard(noAuth: boolean): IAuthGuard {
        if (noAuth) {
            return new (AuthGuard("local"))();
        } else {
            return new (AuthGuard("jwt"))();
        }
    }
}
