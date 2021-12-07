import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Rate, RateDocument } from './rates.model';
import {
  CreateRateInput,
  ListRateInput,
  UpdateRateInput,
} from './dto/rates.inputs';

@Injectable()
export class RatesService {
  constructor(@InjectModel(Rate.name) private rateModel: Model<RateDocument>) {}

  create(payload: CreateRateInput) {
    const createdRate = new this.rateModel(payload);
    return createdRate.save();
  }

  async creates(rates: [CreateRateInput]) {
    const rateIds = [];
    if (rates.length > 0) {
      for (const rate of rates) {
        const { _id } = await this.create(rate);
        rateIds.push(_id);
      }
    }
    return rateIds;
  }

  getByUuId(rate_uuid: string) {
    return this.rateModel.findOne({ rate_uuid }).exec();
  }

  list(filters: ListRateInput) {
    return this.rateModel.find({ ...filters }).exec();
  }

  update(payload: UpdateRateInput) {
    const { rate_uuid } = payload;
    return this.rateModel
      .findOneAndUpdate({ rate_uuid }, payload, { new: true })
      .exec();
  }

  async updates(rates: [UpdateRateInput]) {
    const rateIds = [];
    if (rates.length > 0) {
      for (const rate of rates) {
        const { _id } = await this.update(rate);
        rateIds.push(_id);
      }
    }
    return rateIds;
  }

  deletes(currency_uuid: string): boolean {
    this.rateModel.deleteMany({ currency_uuid }, function (err) {
      console.log(err);
      if (err) {
        console.log(err);
        return false;
      }
    });
    return true;
  }

  delete(rate_uuid: string) {
    return this.rateModel.findOneAndDelete({ rate_uuid }).exec();
  }
}
