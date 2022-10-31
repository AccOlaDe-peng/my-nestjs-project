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
