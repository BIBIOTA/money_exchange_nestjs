import { Field, InputType, ID } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
@InputType()
export class CreateCurrencyInput {
  @MinLength(1)
  @Field(() => String)
  name: string;
}

@InputType()
export class ListCurrencyInput {
  @Field(() => ID, { nullable: true })
  currency_uuid?: string;
  @Field(() => String, { nullable: true })
  name?: string;
}

@InputType()
export class UpdateCurrencyInput {
  @Field(() => ID)
  currency_uuid?: string;
  @Field(() => String, { nullable: true })
  name?: string;
}
