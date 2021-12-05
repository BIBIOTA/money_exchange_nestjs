import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { Currency } from './currencies.model';
import { CurrenciesService } from './currencies.service';
import {
  CreateCurrencyInput,
  ListCurrencyInput,
  UpdateCurrencyInput,
} from './dto/currencies.inputs';

@Resolver(() => Currency)
export class CurrenciesResolver {
  constructor(private currenciesService: CurrenciesService) {}

  @Query(() => Currency)
  async currency(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.currenciesService.getById(_id);
  }

  @Query(() => [Currency])
  async currencies(
    @Args('filters', { nullable: true }) filters?: ListCurrencyInput,
  ) {
    return this.currenciesService.list(filters);
  }

  @Mutation(() => Currency)
  async createCurrency(@Args('payload') payload: CreateCurrencyInput) {
    return this.currenciesService.create(payload);
  }

  @Mutation(() => Currency)
  async updateCurrency(@Args('payload') payload: UpdateCurrencyInput) {
    return this.currenciesService.update(payload);
  }

  @Mutation(() => Currency)
  async deleteCurrency(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.currenciesService.delete(_id);
  }
}
