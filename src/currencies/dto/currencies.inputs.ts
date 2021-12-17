import { Field, InputType, ID } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { IsNotEmpty } from 'class-validator';
@InputType()
export class CreateCurrencyInput {
  @Field(() => String)
  @IsNotEmpty({ message: '請填寫代碼' })
  code: string;

  @Field(() => String)
  @IsNotEmpty({ message: '請填寫匯率英文名稱' })
  name: string;

  @Field(() => String)
  @IsNotEmpty({ message: '請填寫匯率中文名稱' })
  cn_name: string;
}

@InputType()
export class ListCurrencyInput {
  @Field(() => ID, { nullable: true })
  currency_uuid?: string;
  @Field(() => String, { nullable: true })
  code?: string;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  cn_name?: string;
}

@InputType()
export class UpdateCurrencyInput {
  @Field(() => ID)
  @IsNotEmpty()
  currency_uuid: string;
  @Field(() => String, { nullable: true })
  code?: string;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  cn_name?: string;
}
