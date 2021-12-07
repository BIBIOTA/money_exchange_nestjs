import { Field, InputType, ID } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateRateInput {
  @MinLength(1)
  @Field(() => String)
  name: string;

  @Field(() => Number)
  rate: number;

  @Field(() => ID)
  currency_uuid: string;
}

@InputType()
export class ListRateInput {
  @Field(() => ID, { nullable: true })
  rate_uuid?: string;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => Number, { nullable: true })
  rate?: number;
  @Field(() => ID)
  currency_uuid?: string;
}

@InputType()
export class UpdateRateInput {
  @Field(() => ID)
  rate_uuid?: string;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => Number, { nullable: true })
  rate?: number;
  @Field(() => ID)
  currency_uuid?: string;
}
