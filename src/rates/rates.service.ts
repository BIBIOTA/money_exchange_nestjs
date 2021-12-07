import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Rate, RateDocument } from './rates.model';

import {
  CreateRateInput,
  ListRateInput,
  UpdateRateInput,
} from './dto/rates.inputs';

import { Currency, CurrencyDocument } from '../currencies/currencies.model';

@Injectable()
export class RatesService {
  constructor(
    @InjectModel(Rate.name) private rateModel: Model<RateDocument>,
    @InjectModel(Currency.name) private currencyModel: Model<CurrencyDocument>,
  ) {}

  async getCurrencyIdAndProcessData(payload) {
    const { currency_uuid, ...othersPayload } = payload;
    const { _id } = await this.currencyModel.findOne({ currency_uuid });
    return { currency: _id, ...othersPayload };
  }

  async create(payload: CreateRateInput) {
    const data = await this.getCurrencyIdAndProcessData(payload);
    const createdRate = new this.rateModel(data);
    return createdRate.save();
  }

  getByUuId(rate_uuid: string) {
    return this.rateModel.findOne({ rate_uuid }).exec();
  }

  list(filters: ListRateInput) {
    return this.rateModel.find({ ...filters }).exec();
  }

  async update(payload: UpdateRateInput) {
    const { rate_uuid, data } = await this.getCurrencyIdAndProcessData(payload);
    return this.rateModel
      .findOneAndUpdate({ rate_uuid }, data, { new: true })
      .exec();
  }

  delete(rate_uuid: string) {
    return this.rateModel.findOneAndDelete({ rate_uuid }).exec();
  }
}
