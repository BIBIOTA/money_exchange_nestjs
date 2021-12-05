import { Schema as MongooseSchema } from 'mongoose';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRateInput {
  @Field(() => String)
  name: string;
  @Field(() => Number)
  rate: number;
}

@InputType()
export class CreateCurrencyInput {
  @Field(() => String)
  name: string;
  @Field(() => [CreateRateInput])
  rates: CreateRateInput[];
}

@InputType()
export class ListRateInput {
  @Field(() => String, { nullable: true })
  name: string;
}

@InputType()
export class ListCurrencyInput {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => ListRateInput, { nullable: true })
  rate?: ListRateInput;
}

@InputType()
export class UpdateCurrencyInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => [CreateRateInput])
  rates?: CreateRateInput[];
}
