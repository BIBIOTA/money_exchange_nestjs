import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Currency, CurrencyDocument } from './currencies.model';
import { Rate, RateDocument } from '../rates/rates.model';
import {
  CreateCurrencyInput,
  ListCurrencyInput,
  UpdateCurrencyInput,
} from './dto/currencies.inputs';
@Injectable()
export class CurrenciesService {
  constructor(
    @InjectModel(Currency.name) private currencyModel: Model<CurrencyDocument>,
    @InjectModel(Rate.name) private rateModel: Model<RateDocument>,
  ) {}

  create(payload: CreateCurrencyInput) {
    const createdCurrency = new this.currencyModel(payload);
    return createdCurrency.save();
  }

  async findByName(name: string) {
    const found = await this.currencyModel.findOne({ name }).exec();

    if (!found) {
      throw new NotFoundException(`Currency with ${name} not found`);
    }

    return found;
  }

  async getByUuId(currency_uuid: string) {
    const found = await this.currencyModel.findOne({ currency_uuid }).exec();

    if (!found) {
      throw new NotFoundException(`Currency with ${currency_uuid} not found`);
    }

    return found;
  }

  list(filters: ListCurrencyInput) {
    return this.currencyModel.find({ ...filters }).exec();
  }

  async update(payload: UpdateCurrencyInput) {
    const { currency_uuid } = payload;
    const found = await this.currencyModel
      .findOneAndUpdate(
        { currency_uuid },
        { ...payload, updated_at: new Date().getTime() },
        { new: true },
      )
      .exec();

    if (!found) {
      throw new NotFoundException(`Currency with ${currency_uuid} not found`);
    }

    return found;
  }

  async delete(currency_uuid: string) {
    const deleterates = await this.deleteRelationRates(currency_uuid);
    if (deleterates) {
      return this.currencyModel.findOneAndDelete({ currency_uuid }).exec();
    }

    throw new NotFoundException('delele currency process fail');
  }

  async deleteRelationRates(currency_uuid: string): Promise<boolean> {
    const foundCurrency = await this.currencyModel.findOne({ currency_uuid });

    if (!foundCurrency) {
      throw new NotFoundException(`Currency with ${currency_uuid} not found`);
    }

    const foundRates = await this.rateModel.deleteMany({
      currency_id: foundCurrency._id,
    });

    if (!foundRates) {
      throw new NotFoundException('delele rates process fail');
    }

    return true;
  }
}
