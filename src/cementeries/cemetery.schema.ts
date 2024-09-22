import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { City } from '../cities/city.schema';
import { v4 as uuidv4 } from 'uuid';

export type CemeteryDocument = Cemetery & Document;

@Schema({ collection: 'cemeteries', timestamps: true })
export class Cemetery {
  @Prop({ unique: true, default: () => uuidv4() })
  id: string;
  
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'City', required: true })
  city: City | Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CemeterySchema = SchemaFactory.createForClass(Cemetery);
