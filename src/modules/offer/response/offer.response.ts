import { Expose, Type } from 'class-transformer';
import { City } from '../../../types/city.enum.js';
import { Coordinates, OfferFeature, OfferType } from '../../../types/offer.type.js';
import UserResponse from '../../user/response/user.response.js';

export class OfferResponse {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public description!: string;

  @Expose()
  public date!: string;

  @Expose()
  public city!: City;

  @Expose()
  public preview!: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: OfferType;

  @Expose()
  public rooms!: number;

  @Expose()
  public guests!: number;

  @Expose()
  public price!: number;

  @Expose()
  public features!: OfferFeature[];

  @Expose({ name: 'userId' })
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public comments!: number;

  @Expose()
  public coordinates!: Coordinates;
}
