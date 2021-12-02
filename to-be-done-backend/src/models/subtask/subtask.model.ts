import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.model';
import * as mongoose from 'mongoose';
import { Task } from '../task/task.model';

export type SubtaskDocument = Subtask & Document;

@Schema()
export class Subtask {
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

  //owner je task id

  /*@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }] })
  lists: List[];*/
}

export const SubtaskSchema = SchemaFactory.createForClass(Subtask);
