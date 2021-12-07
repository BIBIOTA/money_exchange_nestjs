import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Rate, RateSchema } from './rates.model';
import { RatesService } from './rates.service';
import { RatesResolver } from './rates.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rate.name, schema: RateSchema }]),
    RatesModule,
  ],
  providers: [RatesService, RatesResolver],
  exports: [RatesService],
})
export class RatesModule {}
