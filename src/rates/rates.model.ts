import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
@ObjectType()
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

  @Field(() => ID)
  @Prop()
  currency_uuid: string;
}

export type RateDocument = Rate & Document;

export const RateSchema = SchemaFactory.createForClass(Rate);
