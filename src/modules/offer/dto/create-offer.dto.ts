import { IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';
import { City } from '../../../types/city.enum.js';
import { Coordinates, OfferFeature, OfferType } from '../../../types/offer.type.js';
import { UserId } from '../../../types/user.type.js';

export default class CreateOfferDto {
  @MinLength(10, { message: 'minimum title length must be 10' })
  @MaxLength(100, { message: 'maximum title length must be 100' })
  public name!: string;

  @MinLength(20, { message: 'minimum description length must be 20' })
  @MaxLength(1024, { message: 'maximum description length must be 1024' })
  public description!: string;

  @IsDateString({}, { message: 'postDate must be valid ISO date' })
  public date!: Date;

  @IsEnum(City, { message: 'city must be enum City' })
  public city!: City;

  @MaxLength(256, { message: 'too short for field' })
  public preview!: string;

  @IsArray({ message: 'field categories must be an array' })
  public photos!: string[];

  @IsBoolean({ message: 'isPremium must be an boolean' })
  public isPremium!: boolean;

  @IsInt({ message: 'rating must be an integer' })
  public rating!: number;

  @IsEnum(OfferType, { message: 'type must be enum OfferType' })
  public type!: OfferType;

  @IsInt({ message: 'rooms must be an integer' })
  public rooms!: number;

  @IsInt({ message: 'guests must be an integer' })
  public guests!: number;

  @IsInt({ message: 'price must be an integer' })
  @Min(100, { message: 'minimum price is 100' })
  @Max(200000, { message: 'maximum price is 200000' })
  public price!: number;

  @IsArray({ message: 'features must be an array' })
  public features!: OfferFeature[];

  @IsMongoId({ message: 'userId field must be valid an id' })
  public userId!: UserId;

  @IsInt({ message: 'comments must be an integer' })
  public comments!: number;

  @IsArray({ message: 'coordinates must be an array' })
  public coordinates!: Coordinates;
}
