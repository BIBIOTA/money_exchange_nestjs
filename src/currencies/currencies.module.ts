import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Currency, CurrencySchema } from './currencies.model';
import { CurrenciesService } from './currencies.service';
import { CurrenciesResolver } from './currencies.resolver';
import { RatesModule } from '../rates/rates.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Currency.name, schema: CurrencySchema },
    ]),
    RatesModule,
  ],
  providers: [CurrenciesService, CurrenciesResolver],
})
export class CurrenciesModule {}
