import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.model';
import * as mongoose from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  id?: string | undefined | null = null;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  dueDate?: Date | undefined | null;

  @Prop()
  completed: Boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  /*@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }] })
  lists: List[];*/
}

export const TaskSchema = SchemaFactory.createForClass(Task);
