import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('ExchangeOutput')
export class ExchangeOutput {
  @Field(() => Number)
  result: number;
  @Field(() => String)
  from: string;
  @Field(() => String)
  to: string;
}
