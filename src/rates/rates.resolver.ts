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
} from './dto/rates.inputs';

@Resolver(() => Rate)
export class RatesResolver {
  constructor(private ratesService: RatesService) {}

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

  //TODO 關聯currency
  // @ResolveField()
  // async rates(
  //   @Parent() currency: CurrencyDocument,
  //   @Args('populate') populate: boolean,
  // ) {
  //   if (populate) await currency.populate({ path: 'rates', model: Rate.name });

  //   return currency.rates;
  // }
}
