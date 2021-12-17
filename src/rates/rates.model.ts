import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

import { Currency } from '../currencies/currencies.model';
@ObjectType('Rate')
@Schema()
export class Rate {
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => ID)
  @Prop({ type: String, default: uuid })
  rate_uuid: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => Number)
  @Prop()
  rate: number;

  @Field(() => Currency)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Currency.name })
  currency: MongooseSchema.Types.ObjectId;

  @Field(() => Number)
  @Prop({ type: Number, default: new Date().getTime() })
  created_at: number;

  @Field(() => Number)
  @Prop({ type: Number, default: new Date().getTime() })
  updated_at: number;
}

export type RateDocument = Rate & Document;

export const RateSchema = SchemaFactory.createForClass(Rate);
