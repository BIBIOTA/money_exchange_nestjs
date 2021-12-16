import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Rate, RateSchema } from './rates.model';
import { RatesService } from './rates.service';
import { RatesResolver } from './rates.resolver';

import { RateCommand } from './rates.command';

import { Currency, CurrencySchema } from '../currencies/currencies.model';

import { CurrenciesService } from '../currencies/currencies.service';

import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Rate.name, schema: RateSchema },
      { name: Currency.name, schema: CurrencySchema },
    ]),
  ],
  providers: [RatesService, CurrenciesService, RatesResolver, RateCommand],
})
export class RatesModule {}
