import { Field, InputType, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
@InputType()
export class CreateCurrencyInput {
  @Field(() => String)
  @IsNotEmpty({ message: '請填寫匯率名稱' })
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
  @IsNotEmpty()
  currency_uuid: string;
  @Field(() => String, { nullable: true })
  name?: string;
}
