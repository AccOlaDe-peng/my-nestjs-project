/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-14 17:50:35
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-14 18:27:48
 */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserDocument } from "./user.schema";

@Injectable()
export class UserService {
    // 注册Schema后，可以使用 @InjectModel() 装饰器将 User 模型注入到 UserService 中:
    constructor(@InjectModel("User") private userModel: Model<UserDocument>) {}

    async create(createUserDto: CreateUserDto) {
        const { password, repassword, accountName } = createUserDto;
        console.log(password, repassword);
        if (password !== repassword) {
            return {
                code: 400,
                msg: "两次密码输入不一致"
            };
        }
        const user = await this.findOne(accountName);
        console.log(user);

        // if (user) {
        //     return {
        //         code: 400,
        //         msg: "用户已存在"
        //     };
        // }

        const createUser = new this.userModel(createUserDto);
        const temp = await createUser.save();
        return temp;
    }

    async findAll() {
        return await this.userModel.find().exec();
    }

    async findOne(id: string) {
        return await this.userModel.findById(id).exec();
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return await this.userModel.updateOne({ id }, updateUserDto).exec();
    }

    async remove(id: string) {
        return await this.userModel.deleteOne({ id }).exec();
    }
}
