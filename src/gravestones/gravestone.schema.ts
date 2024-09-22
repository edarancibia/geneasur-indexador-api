import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type GravestoneDocument = Gravestone & Document;

@Schema({ collection: 'gravestones', timestamps: true })
export class Gravestone {
  //   @Prop({ required: true })
  //   inscription: string;
  @Prop({ unique: true, default: () => uuidv4() })
  id: string;

  @Prop({ type: Types.ObjectId, ref: 'cemeteries', required: true })
  cemetery: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  dateOfDeath: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const GravestoneSchema = SchemaFactory.createForClass(Gravestone);
