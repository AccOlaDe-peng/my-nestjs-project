/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-14 17:50:35
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-23 14:47:41
 */
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { encryptPassword, makeSalt } from "src/utils/cryptogram.util";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserDocument } from "./user.schema";

@Injectable()
export class UserService {
    // 注册Schema后，可以使用 @InjectModel() 装饰器将 User 模型注入到 UserService 中:
    constructor(@InjectModel("User") private userModel: Model<UserDocument>) {}

    async register(createUserDto: CreateUserDto) {
        const { password, repassword, username } = createUserDto;
        if (password !== repassword) {
            return {
                code: 400,
                msg: "两次密码输入不一致"
            };
        }
        const user = await this.userModel.findOne({ username });
        if (user) {
            return {
                code: 400,
                msg: "用户已存在"
            };
        }

        const salt = makeSalt(); // 制作密码盐
        const hashPwd = encryptPassword(password, salt); // 加密密码

        const registerUser = {
            username,
            password: hashPwd,
            passwd_salt: salt
        };

        const createUser = new this.userModel(registerUser);
        const temp = await createUser.save();
        return temp;
    }

    async findAll() {
        return await this.userModel.find().exec();
    }

    async findById(id: string) {
        return await this.userModel.findById(id).exec();
    }

    async findOne(params: object) {
        return await this.userModel.findOne(params).exec();
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return await this.userModel.updateOne({ id }, updateUserDto).exec();
    }

    async remove(id: string) {
        return await this.userModel.deleteOne({ id }).exec();
    }
}
