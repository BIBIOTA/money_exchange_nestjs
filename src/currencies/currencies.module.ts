import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Currency, CurrencySchema } from './currencies.model';
import { CurrenciesService } from './currencies.service';
import { CurrenciesResolver } from './currencies.resolver';

import { Rate, RateSchema } from '../rates/rates.model';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Currency.name, schema: CurrencySchema },
      { name: Rate.name, schema: RateSchema },
    ]),
  ],
  providers: [CurrenciesService, CurrenciesResolver],
})
export class CurrenciesModule {}
