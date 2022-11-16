/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-14 17:50:25
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-14 17:50:25
 */
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserSchema } from "./user.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "User", schema: UserSchema }])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
