import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
export class Rate {
  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => Number)
  rate: number;
}

@ObjectType()
@Schema()
export class Currency {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({
    unique: true,
  })
  name: string;

  @Field(() => [Rate])
  @Prop()
  rates: Rate[];
}

export type CurrencyDocument = Currency & Document;

export const CurrencySchema = SchemaFactory.createForClass(Currency);
