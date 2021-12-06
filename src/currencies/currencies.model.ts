import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
@ObjectType()
@Schema()
export class Currency {
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => ID)
  @Prop({ type: String, default: uuid })
  currency_uuid: string;

  @Field(() => String)
  @Prop({
    unique: true,
  })
  name: string;
}

export type CurrencyDocument = Currency & Document;

export const CurrencySchema = SchemaFactory.createForClass(Currency);
