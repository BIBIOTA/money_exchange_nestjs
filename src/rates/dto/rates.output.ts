import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('ExchangeOutput')
export class ExchangeOutput {
  @Field(() => String)
  result: string;
  @Field(() => String)
  from: string;
  @Field(() => String)
  to: string;
}
