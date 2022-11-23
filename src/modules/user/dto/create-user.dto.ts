/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-14 18:27:28
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-23 15:56:36
 */
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "用户名不能为空" })
    readonly username: string | number;
    readonly realName: string;
    @IsNotEmpty({ message: "密码不能为空" })
    readonly password: string;
    @IsNotEmpty({ message: "重复密码不能为空" })
    readonly repassword: string;
    readonly mobile?: number;
    readonly role?: string | number;
}
