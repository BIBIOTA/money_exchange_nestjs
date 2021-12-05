import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

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

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.currencyModel.findById(_id).exec();
  }

  list(filters: ListCurrencyInput) {
    return this.currencyModel.find({ ...filters }).exec();
  }

  update(payload: UpdateCurrencyInput) {
    return this.currencyModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.currencyModel.findByIdAndDelete(_id).exec();
  }
}
