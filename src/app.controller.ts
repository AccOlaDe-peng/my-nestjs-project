/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-14 17:47:01
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-16 16:53:33
 */
import { Controller, Request, Post, UseGuards, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./modules/auth/auth.service";

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {}

    // @UseGuards(AuthGuard("local"))
    // @Post("auth/login")
    // async login(@Request() req) {
    //     return this.authService.validateUser(req.user);
    // }

    @UseGuards(AuthGuard("jwt"))
    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }
}
