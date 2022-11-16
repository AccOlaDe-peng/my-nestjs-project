/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-14 17:54:11
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-14 18:15:35
 */
import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

describe("UserController", () => {
    let controller: UserController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService]
        }).compile();

        controller = module.get<UserController>(UserController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
