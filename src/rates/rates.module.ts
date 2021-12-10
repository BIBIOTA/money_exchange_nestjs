import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Rate, RateSchema } from './rates.model';
import { RatesService } from './rates.service';
import { RatesResolver } from './rates.resolver';

import { RateCommand } from './rates.command';

import { Currency, CurrencySchema } from '../currencies/currencies.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Rate.name, schema: RateSchema },
      { name: Currency.name, schema: CurrencySchema },
    ]),
  ],
  providers: [RatesService, RatesResolver, RateCommand],
})
export class RatesModule {}
