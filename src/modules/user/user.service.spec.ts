/**
 * @description:
 * @author: pengrenchang
 * @Date: 2022-11-14 17:50:31
 * @LastEditors: pengrenchang
 * @LastEditTime: 2022-11-14 17:50:31
 */
import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
describe("UserService", () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService]
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
