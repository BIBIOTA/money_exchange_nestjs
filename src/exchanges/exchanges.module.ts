import { Module } from '@nestjs/common';
import { ExchangesResolver } from './exchanges.resolver';
import { ExchangesService } from './exchanges.service';

@Module({
  providers: [ExchangesResolver, ExchangesService],
})
export class ExchangesModule {}
