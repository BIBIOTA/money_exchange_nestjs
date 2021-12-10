import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

@Injectable()
export class CurrencyCommand {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Command({
    command: 'create:currencies <name>',
    describe: 'create a currency',
  })
  async create(
    @Positional({
      name: 'name',
      describe: 'the name',
      type: 'string',
    })
    name: string,
  ) {
    const currency = await this.currenciesService.create({
      name,
    });
    console.log(currency);
  }
}
