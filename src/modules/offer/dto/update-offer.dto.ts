import { City } from '../../../types/city.enum.js';
import { Coordinates, OfferFeature, OfferType } from '../../../types/offer.type.js';
import { UserId } from '../../../types/user.type.js';

export default class UpdateOfferDto {
  public name!: string;
  public description!: string;
  public date!: Date;
  public city!: City;
  public preview!: string;
  public photos!: string[];
  public isPremium!: boolean;
  public rating!: number;
  public type!: OfferType;
  public rooms!: number;
  public guests!: number;
  public price!: number;
  public features!: OfferFeature[];
  public userId!: UserId;
  public comments!: number;
  public coordinates!: Coordinates;
}
