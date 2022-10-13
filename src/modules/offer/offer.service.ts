import { inject, injectable } from 'inversify';
import { OfferServiceInterface } from './offer.interface.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { Component } from '../../config/config.component.js';
import { LoggerInterface } from '../../packages/logger/logger.interface.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_COUNT } from './offer.constants.js';
import { SortType } from '../../types/common.type.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) { }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate('userId').exec();
  }

  public async findByOffersName(offerName: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findOne({ name: offerName }).populate('userId').exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $unset: 'user.password'
      },
      { $limit: count || 60 },
    ]).exec();
  }

  public async findNew(count?: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({}, {}, { limit: count || DEFAULT_OFFER_COUNT })
      .sort({ createdAt: SortType.Down })
      .populate('userId')
      .exec();
  }

  public async findDiscussed(count?: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({}, {}, { limit: count || DEFAULT_OFFER_COUNT })
      .sort({ comments: SortType.Down })
      .populate('userId')
      .exec();
  }

  public deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate('userId')
      .exec();
  }

  public async incComments(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          comments: 1,
        }
      }).exec();
  }

  public async calculateRating(offerId: string, rating: number): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': { rating },
        '$mul': { rating: 0.5 }
      }).exec();
  }

  public async exists(id: string): Promise<boolean> {
    return (await this.offerModel
      .exists({ _id: id })) !== null;
  }
}
