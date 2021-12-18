import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import * as csv from 'csvtojson/v2';

@Injectable()
export class CurrencyCommand {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Command({
    command: 'create:currencies <code> <name> <cn_name>',
    describe: 'create a currency',
  })
  async create(
    @Positional({
      name: 'code',
      describe: 'the code',
      type: 'string',
    })
    code: string,
    @Positional({
      name: 'name',
      describe: 'the name',
      type: 'string',
    })
    name: string,
  ) {
    const currency = await this.currenciesService.create({
      code,
      name,
    });
    console.log(currency);
  }

  @Command({
    command: 'create:codes',
    describe: 'create codes from ISO4217 csv',
  })
  async createCodes() {
    const csvFilePath = 'ISO4217.csv';
    const jsonArray = await csv().fromFile(csvFilePath);
    console.log(jsonArray);

    try {
      if (jsonArray && jsonArray.length > 0) {
        await this.currenciesService.deleteMany().then(async () => {
          for (const item of jsonArray) {
            const { code, name } = item;
            await this.currenciesService.create({
              code,
              name,
            });
          }
        });
        console.log('create done');
      }
    } catch (error) {
      console.error(error);
    }
  }
}
