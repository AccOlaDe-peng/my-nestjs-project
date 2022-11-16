/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-14 18:27:28
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-14 18:27:28
 */
export class CreateUserDto {
    readonly accountName: string;
    readonly realName: string;
    readonly password: string;
    readonly repassword: string;
    readonly mobile: number;
}
