import { Injectable, NotFoundException } from '@nestjs/common';
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
    const found = await this.currencyModel.findOne({ currency_uuid }).exec();

    if (!found) {
      throw new NotFoundException(`Currency with ${currency_uuid} not found`);
    }

    return { currency: found._id, ...othersPayload };
  }

  async create(payload: CreateRateInput) {
    const data = await this.getCurrencyIdAndProcessData(payload);
    const createdRate = new this.rateModel(data);
    return createdRate.save();
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
    const { rate_uuid, data } = await this.getCurrencyIdAndProcessData(payload);
    const found = await this.rateModel
      .findOneAndUpdate({ rate_uuid }, data, { new: true })
      .exec();

    if (!found) {
      throw new NotFoundException(`Currency with ${rate_uuid} not found`);
    }

    return found;
  }

  async delete(rate_uuid: string) {
    const found = await this.rateModel.findOneAndDelete({ rate_uuid }).exec();

    if (!found) {
      throw new NotFoundException(`Rate with ${rate_uuid} not found`);
    }

    return found;
  }
}
