import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Currency, CurrencyDocument } from './currencies.model';
import {
  CreateCurrencyInput,
  ListCurrencyInput,
  UpdateCurrencyInput,
} from './dto/currencies.inputs';
@Injectable()
export class CurrenciesService {
  constructor(
    @InjectModel(Currency.name) private currencyModel: Model<CurrencyDocument>,
  ) {}

  create(payload: CreateCurrencyInput) {
    const createdHobby = new this.currencyModel(payload);
    return createdHobby.save();
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
      .findOneAndUpdate({ currency_uuid }, payload, { new: true })
      .exec();
  }

  delete(currency_uuid: string) {
    return this.currencyModel.findOneAndDelete({ currency_uuid }).exec();
  }
}
