import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [UserModule, MongooseModule.forRoot("mongodb://localhost/nest")],
  // imports: [UserModule],
  controllers: [],
  providers: []
})
export class AppModule {}
