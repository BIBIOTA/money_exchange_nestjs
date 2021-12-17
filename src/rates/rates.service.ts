import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Model } from 'mongoose';
import { chain } from 'mathjs';

import { Rate, RateDocument } from './rates.model';

import {
  CreateRateInput,
  ListRateInput,
  UpdateRateInput,
  ExchangeInput,
} from './dto/rates.inputs';
import { ExchangeOutput } from './dto/rates.output';

import { Currency, CurrencyDocument } from '../currencies/currencies.model';

@Injectable()
export class RatesService {
  constructor(
    @InjectModel(Rate.name) private rateModel: Model<RateDocument>,
    @InjectModel(Currency.name) private currencyModel: Model<CurrencyDocument>,
  ) {}

  async getCurrencyIdAndProcessData(payload) {
    const { currency_uuid, ...othersPayload } = payload;
    const found = await this.currencyModel.findOne({ currency_uuid }).exec();

    if (!found) {
      throw new NotFoundException(`Currency with ${currency_uuid} not found`);
    }

    return { currency: found._id, ...othersPayload };
  }

  async updateCurrencyTimestamp(id: string) {
    const found = await this.currencyModel.findOne({ id }).exec();

    if (!found) {
      throw new NotFoundException(`Currency with ${id} not found`);
    }

    await this.currencyModel
      .findOneAndUpdate({ _id: id }, { updated_at: new Date().getTime() })
      .exec();
  }

  async exchange(exchangeInput: ExchangeInput): Promise<ExchangeOutput> {
    const { currency_uuid, rate_uuid, amount } = exchangeInput;
    const currency = await this.currencyModel.findOne({ currency_uuid }).exec();
    if (!currency) {
      throw new NotFoundException(`Currency with ${currency_uuid} not found`);
    }
    const rate = await this.getByUuId(rate_uuid);
    if (!rate) {
      throw new NotFoundException(`Rate with ${rate_uuid} not found`);
    }
    const result = await this.caculate(rate.rate, amount);
    return {
      result,
      from: currency.name,
      to: rate.name,
    };
  }

  async caculate(rate: number, amount: number): Promise<number> {
    const caculateAmount = chain(amount).multiply(rate);
    return +caculateAmount;
  }

  async findHasUniqueRateData(
    currency: MongooseSchema.Types.ObjectId,
    name: string,
  ): Promise<boolean> {
    const found = await this.rateModel.findOne({ currency, name }).exec();

    if (!found) {
      return false;
    }

    return true;
  }

  async create(payload: CreateRateInput) {
    const data = await this.getCurrencyIdAndProcessData(payload);
    const hasdata = await this.findHasUniqueRateData(data.currency, data.name);
    if (!hasdata) {
      const createdRate = new this.rateModel(data);
      await this.updateCurrencyTimestamp(data.currency);
      return createdRate.save();
    } else {
      throw new NotFoundException(
        `rate ${data.currency} and ${data.name} is created`,
      );
    }
  }

  async getByUuId(rate_uuid: string) {
    const found = await this.rateModel.findOne({ rate_uuid }).exec();

    if (!found) {
      throw new NotFoundException(`Rate with ${rate_uuid} not found`);
    }

    return found;
  }

  async list(filters: ListRateInput) {
    let data = {};
    if (filters) {
      data = await this.getCurrencyIdAndProcessData(filters);
    }
    return this.rateModel.find({ ...data }).exec();
  }

  async update(payload: UpdateRateInput) {
    const { rate_uuid, ...othersPayload } = payload;
    const data = await this.getCurrencyIdAndProcessData(othersPayload);

    const hasdata = await this.findHasUniqueRateData(data.currency, data.name);
    if (!hasdata) {
      const found = await this.rateModel
        .findOneAndUpdate(
          { rate_uuid },
          { ...data, updated_at: new Date().getTime() },
          { new: true },
        )
        .exec();

      if (!found) {
        throw new NotFoundException(`rate with ${rate_uuid} not found`);
      }

      await this.updateCurrencyTimestamp(data.currency);

      return found;
    } else {
      throw new NotFoundException(
        `rate ${data.currency} and ${data.name} is created`,
      );
    }
  }

  async delete(rate_uuid: string) {
    const found = await this.rateModel.findOneAndDelete({ rate_uuid }).exec();

    if (!found) {
      throw new NotFoundException(`Rate with ${rate_uuid} not found`);
    }

    return found;
  }
}
