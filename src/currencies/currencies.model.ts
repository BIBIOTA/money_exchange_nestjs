import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
@ObjectType('Currency')
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
  code: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => Number)
  @Prop({ type: Number, default: new Date().getTime() })
  created_at: number;

  @Field(() => Number)
  @Prop({ type: Number, default: new Date().getTime() })
  updated_at: number;
}

export type CurrencyDocument = Currency & Document;

export const CurrencySchema = SchemaFactory.createForClass(Currency);
