import { Field, InputType, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateRateInput {
  @Field(() => String)
  @IsNotEmpty({ message: '請填寫匯率名稱' })
  name: string;

  @Field(() => Number)
  @IsNotEmpty({ message: '請填寫匯率' })
  rate: number;

  @Field(() => ID)
  @IsNotEmpty()
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
  @Field(() => ID, { nullable: true })
  currency_uuid?: string;
}

@InputType()
export class UpdateRateInput {
  @Field(() => ID)
  @IsNotEmpty()
  rate_uuid: string;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => Number, { nullable: true })
  rate?: number;
  @Field(() => ID)
  currency_uuid?: string;
}
