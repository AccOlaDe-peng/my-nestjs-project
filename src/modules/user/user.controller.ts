/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-14 17:52:15
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-16 18:26:19
 */
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthService } from "../auth/auth.service";
import { AuthGuard } from "@nestjs/passport";
// import { Roles } from "src/common/decorators/roles.decorator";

@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

    @UseGuards(AuthGuard("jwt"))
    @Post("register")
    async register(@Body() body: CreateUserDto) {
        return await this.userService.register(body);
    }

    @Post("login")
    async login(@Body() loginParams: any) {
        console.log("JWT验证 - Step 1: 用户请求登录");
        const authResult = await this.authService.validateUser(
            loginParams.accountName,
            loginParams.password
        );
        switch (authResult.code) {
            case 1:
                return this.authService.certificate(authResult.user);
            case 2:
                return {
                    code: 600,
                    msg: `账号或密码不正确`
                };
            default:
                return {
                    code: 600,
                    msg: `查无此人`
                };
        }
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.userService.findById(id);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.userService.remove(id);
    }
}
