/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-14 18:27:28
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-16 17:58:47
 */
export class CreateUserDto {
    readonly username: string;
    readonly realName: string;
    readonly password: string;
    readonly repassword: string;
    readonly mobile: number;
}
