import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserPasswordDocument = UserPassword & Document;

@Schema()
export class UserPassword {
  @Prop({ ref: 'User' })
  userId: string;

  @Prop()
  password: string;
}

export const UserPasswordSchema = SchemaFactory.createForClass(UserPassword);
