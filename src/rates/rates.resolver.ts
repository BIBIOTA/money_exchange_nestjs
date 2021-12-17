import {
  Args,
  Mutation,
  Query,
  Parent,
  Resolver,
  ResolveField,
  ID,
} from '@nestjs/graphql';

import { Rate } from './rates.model';
import { RatesService } from './rates.service';
import { RateDocument } from './rates.model';

import {
  CreateRateInput,
  ListRateInput,
  UpdateRateInput,
  ExchangeInput,
} from './dto/rates.inputs';
import { ExchangeOutput } from './dto/rates.output';
import { Currency } from 'src/currencies/currencies.model';

@Resolver(() => Rate)
export class RatesResolver {
  constructor(private ratesService: RatesService) {}

  @Query(() => ExchangeOutput)
  async exchange(
    @Args('exchangeInput') exchangeInput: ExchangeInput,
  ): Promise<ExchangeOutput> {
    return this.ratesService.exchange(exchangeInput);
  }

  @Query(() => Rate)
  async rate(@Args('rate_uuid', { type: () => ID }) rate_uuid: string) {
    return this.ratesService.getByUuId(rate_uuid);
  }

  @Query(() => [Rate])
  async rates(@Args('filters', { nullable: true }) filters?: ListRateInput) {
    return this.ratesService.list(filters);
  }

  @Mutation(() => Rate)
  async createRate(@Args('payload') payload: CreateRateInput) {
    return this.ratesService.create(payload);
  }

  @Mutation(() => Rate)
  async updateRate(@Args('payload') payload: UpdateRateInput) {
    return this.ratesService.update(payload);
  }

  @Mutation(() => Rate)
  async deleteRate(
    @Args('rate_uuid', { type: () => ID })
    rate_uuid: string,
  ) {
    return this.ratesService.delete(rate_uuid);
  }

  @ResolveField()
  async currency(@Parent() rate: RateDocument) {
    await rate.populate({ path: 'currency', model: Currency.name });
    return rate.currency;
  }
}
