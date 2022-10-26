import typegoose, { defaultClasses, getModelForClass, Ref, Severity } from '@typegoose/typegoose';
import { City } from '../../types/city.enum.js';

import {
  Coordinates,
  OfferFeature,
  OfferType,
} from '../../types/offer.type.js';
import { UserEntity } from '../user/user.entity.js';
import { OFFER_CONSTRAINT } from './offer.constants.js';

const { prop, modelOptions } = typegoose;

const {
  NAME_LENGTH_MIN,
  NAME_LENGTH_MAX,
  DESCRIPTION_LENGTH_MIN,
  DESCRIPTION_LENGTH_MAX,
  ROOMS_COUNT_MIN,
  ROOMS_COUNT_MAX,
  RATING_MIN,
  RATING_MAX,
  GUESTS_COUNT_MIN,
  GUESTS_COUNT_MAX,
  PRICE_MIN,
  PRICE_MAX,
} = OFFER_CONSTRAINT;

export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true, minlength: NAME_LENGTH_MIN, maxlength: NAME_LENGTH_MAX })
  public name!: string;

  @prop({ required: true, trim: true, minlength: DESCRIPTION_LENGTH_MIN, maxlength: DESCRIPTION_LENGTH_MAX })
  public description!: string;

  @prop({ required: true, type: Date })
  public date!: Date;

  @prop({ required: true })
  public city!: City;

  @prop({ default: '' })
  public preview!: string;

  @prop({ required: true })
  public photos!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true, min: RATING_MIN, max: RATING_MAX })
  public rating!: number;

  @prop({ required: true })
  public type!: OfferType;

  @prop({ required: true, min: ROOMS_COUNT_MIN, max: ROOMS_COUNT_MAX })
  public rooms!: number;

  @prop({ required: true, min: GUESTS_COUNT_MIN, max: GUESTS_COUNT_MAX })
  public guests!: number;

  @prop({ required: true, min: PRICE_MIN, max: PRICE_MAX })
  public price!: number;

  @prop({ required: true })
  public features!: OfferFeature[];

  @prop({ ref: UserEntity, required: true })
  public userId!: Ref<UserEntity>;

  @prop({ default: 0 })
  public comments!: number;

  @prop({ required: true })
  public coordinates!: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
