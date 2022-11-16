/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-14 17:52:15
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-14 18:15:05
 */
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
// import { Roles } from "src/common/decorators/roles.decorator";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    //   @Roles("admin")
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.userService.findOne(id);
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
