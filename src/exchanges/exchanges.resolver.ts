import { Resolver } from '@nestjs/graphql';
import { ExchangesService } from 'src/exchanges/exchanges.service';

@Resolver()
export class ExchangesResolver {
  constructor(private exchangesService: ExchangesService) {}
}
