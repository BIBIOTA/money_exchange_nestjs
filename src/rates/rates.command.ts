import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RatesService } from './rates.service';
import { CurrenciesService } from '../currencies/currencies.service';
import * as csv from 'csvtojson/v2';
import * as fs from 'fs';
import * as math from 'mathjs';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class RateCommand {
  constructor(
    private readonly ratesService: RatesService,
    private readonly currenciesService: CurrenciesService,
    private httpService: HttpService,
  ) {}

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

  @Command({
    command: 'create:twbankRates',
    describe: 'create taiwanbank rates',
  })
  async createTwbankRates() {
    const result = await this.httpService
      .get('https://rate.bot.com.tw/xrt/flcsv/0/day')
      .toPromise();

    fs.writeFileSync('ExchangeRate.csv', result.data);

    const csvFilePath = 'ExchangeRate.csv';
    const jsonArray = await csv().fromFile(csvFilePath);
    console.log(jsonArray);

    const { currency_uuid } = await this.currenciesService.findByName('TWD');

    try {
      if (jsonArray && jsonArray.length > 0) {
        for (const item of jsonArray) {
          const { 幣別, 現金 } = item;
          if (typeof +現金 === 'number' && +現金 !== 0) {
            const divideRate = await math.divide(1, +現金);
            await this.ratesService.create({
              currency_uuid,
              name: 幣別,
              rate: +divideRate,
            });
          } else {
            continue;
          }
        }
        console.log('create done');
      }
    } catch (error) {
      console.error(error);
    }
  }
}
