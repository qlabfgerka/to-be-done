import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.model';
import * as mongoose from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  id?: string | undefined | null = null;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  /*@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }] })
  lists: List[];*/
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
