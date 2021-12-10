import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RatesService } from './rates.service';

@Injectable()
export class RateCommand {
  constructor(private readonly ratesService: RatesService) {}

  @Command({
    command: 'create:rates <name>',
    describe: 'create a rate',
  })
  async create(
    @Positional({
      name: 'name',
      describe: 'the name',
      type: 'string',
    })
    name: string,
    @Positional({
      name: 'rate',
      describe: 'the rate',
      type: 'number',
    })
    rate: number,
    @Positional({
      name: 'currency_uuid',
      describe: 'the currency_uuid',
      type: 'string',
    })
    currency_uuid: string,
  ) {
    const result = await this.ratesService.create({
      currency_uuid,
      name,
      rate,
    });
    console.log(result);
  }
}
