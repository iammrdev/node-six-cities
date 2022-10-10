import typegoose, { defaultClasses, getModelForClass, Ref, Severity } from '@typegoose/typegoose';
import { City } from '../../types/city.enum.js';

import {
  Coordinates,
  OfferFeature,
  OfferType,
} from '../../types/offer.type.js';
import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions } = typegoose;

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
  @prop({ required: true, trim: true, minlength: 10, maxlength: 100 })
  public name!: string;

  @prop({ required: true, trim: true, minlength: 20, maxlength: 1024 })
  public description!: string;

  @prop({ required: true, type: Date })
  public date!: Date;

  @prop({ required: true })
  public city!: City;

  @prop({ required: true })
  public preview!: string;

  @prop({ required: true })
  public photos!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true, min: 1, max: 5 })
  public rating!: number;

  @prop({ required: true })
  public type!: OfferType;

  @prop({ required: true, min: 1, max: 8 })
  public rooms!: number;

  @prop({ required: true, min: 1, max: 10 })
  public guests!: number;

  @prop({ required: true, min: 100, max: 100000 })
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
