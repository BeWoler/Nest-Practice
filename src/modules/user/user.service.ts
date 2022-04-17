import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { errors } from 'src/res/errors';
import { User, UserDocument } from 'src/schemas/user.schema';
import {
  UserPassword,
  UserPasswordDocument,
} from 'src/schemas/userPassword.schema';
import {
  GetUserResponseDto,
  GetUsersResponseDto,
} from './dtos/getUser.response.dto';
import { UserRequestDto } from './dtos/user.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserPassword.name)
    private userPasswordModel: Model<UserPasswordDocument>,
  ) {}

  async registration(body: UserRequestDto): Promise<GetUserResponseDto> {
    const isUserEmail = await this.userModel
      .findOne({ email: body.email })
      .lean();
    const isUserUsername = await this.userModel
      .findOne({
        username: body.username,
      })
      .lean();

    if (isUserEmail) {
      throw new HttpException(
        errors.EMAIL_ALREADY_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (isUserUsername) {
      throw new HttpException(
        errors.USERNAME_ALREADY_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userModel.create({
      email: body.email,
      username: body.username,
    });

    await this.userPasswordModel.create({
      userId: user.id,
      password: body.password,
    });

    return { user };
  }

  async getUserById(id: string): Promise<GetUserResponseDto> {
    const user = await this.userModel
      .findOne({ _id: new Types.ObjectId(id) })
      .lean();

    return { user };
  }

  async getUsers(): Promise<GetUsersResponseDto> {
    const users = await this.userModel.find().lean();

    return { users };
  }
}
