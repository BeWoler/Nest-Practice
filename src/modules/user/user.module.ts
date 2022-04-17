import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from 'src/schemas/user.schema';
import {
  UserPassword,
  UserPasswordSchema,
} from 'src/schemas/userPassword.schema';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: UserPassword.name, schema: UserPasswordSchema },
    ]),
  ],
})
export class UserModule {}
