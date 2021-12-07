import {
  Args,
  Mutation,
  Query,
  Parent,
  Resolver,
  ResolveField,
  ID,
} from '@nestjs/graphql';

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
    @Args('currency_uuid', { type: () => ID }) currency_uuid: string,
  ) {
    return this.currenciesService.getByUuId(currency_uuid);
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
    @Args('currency_uuid', { type: () => ID })
    currency_uuid: string,
  ) {
    return this.currenciesService.delete(currency_uuid);
  }
}
