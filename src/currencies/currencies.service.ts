import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Currency, CurrencyDocument } from './currencies.model';
import { RatesService } from '../rates/rates.service';
import {
  CreateCurrencyInput,
  ListCurrencyInput,
  UpdateCurrencyInput,
} from './dto/currencies.inputs';
@Injectable()
export class CurrenciesService {
  constructor(
    @InjectModel(Currency.name) private currencyModel: Model<CurrencyDocument>,
    private readonly ratesService: RatesService,
  ) {}

  create(payload: CreateCurrencyInput) {
    const createdCurrency = new this.currencyModel(payload);
    return createdCurrency.save();
  }

  getByUuId(currency_uuid: string) {
    return this.currencyModel.findOne({ currency_uuid }).exec();
  }

  list(filters: ListCurrencyInput) {
    return this.currencyModel.find({ ...filters }).exec();
  }

  update(payload: UpdateCurrencyInput) {
    const { currency_uuid } = payload;
    return this.currencyModel
      .findOneAndUpdate({ currency_uuid }, { ...payload }, { new: true })
      .exec();
  }

  async delete(currency_uuid: string) {
    await this.deleteRelationRates(currency_uuid);
    return this.currencyModel.findOneAndDelete({ currency_uuid }).exec();
  }

  async deleteRelationRates(currency_uuid: string) {
    await this.ratesService.deletes(currency_uuid);
    await this.currencyModel.findOne({ currency_uuid }).exec();
  }
}
