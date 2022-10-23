import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsIn, IsInt, IsMongoId, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import { City } from '../../../types/city.enum.js';
import { Coordinates, OfferFeature, OfferType } from '../../../types/offer.type.js';
import { UserId } from '../../../types/user.type.js';
import { OFFER_CONSTRAINT } from '../offer.constants.js';

const {
  NAME_LENGTH_MIN,
  NAME_LENGTH_MAX,
  DESCRIPTION_LENGTH_MIN,
  DESCRIPTION_LENGTH_MAX,
  ROOMS_COUNT_MIN,
  ROOMS_COUNT_MAX,
  RATING_MIN,
  RATING_MAX,
  PHOTOS_COUNT,
  GUESTS_COUNT_MIN,
  GUESTS_COUNT_MAX,
  PRICE_MIN,
  PRICE_MAX,
} = OFFER_CONSTRAINT;


export default class CreateOfferDto {
  @MinLength(NAME_LENGTH_MIN, { message: 'minimum title length must be 10' })
  @MaxLength(NAME_LENGTH_MAX, { message: 'maximum title length must be 100' })
  public name!: string;

  @MinLength(DESCRIPTION_LENGTH_MIN, { message: 'minimum description length must be 20' })
  @MaxLength(DESCRIPTION_LENGTH_MAX, { message: 'maximum description length must be 1024' })
  public description!: string;

  @IsDateString({}, { message: 'date must be valid ISO date' })
  public date!: Date;

  @IsEnum(City, { message: 'city must be valid' })
  public city!: City;


  @IsArray({ message: 'field categories must be an array' })
  @ArrayMinSize(PHOTOS_COUNT, { message: 'photos length must be 6' })
  @ArrayMaxSize(PHOTOS_COUNT, { message: 'photos length must be 6' })
  @Matches(/[\w/-]+.(jpg|png)/, { each: true, message: 'photo must be jpg or png' })
  public photos!: string[];

  @IsBoolean({ message: 'isPremium must be an boolean' })
  public isPremium!: boolean;

  @IsInt({ message: 'rating must be an integer' })
  @Min(RATING_MIN)
  @Max(RATING_MAX)
  public rating!: number;

  @IsEnum(OfferType, { message: 'type must be enum OfferType' })
  public type!: OfferType;

  @IsInt({ message: 'rooms must be an integer' })
  @Min(ROOMS_COUNT_MIN, { message: 'minimum rooms must be 1' })
  @Max(ROOMS_COUNT_MAX, { message: 'maximum rooms must be 8' })
  public rooms!: number;

  @IsInt({ message: 'guests must be an integer' })
  @Min(GUESTS_COUNT_MIN, { message: 'minimum guests must be 1' })
  @Max(GUESTS_COUNT_MAX, { message: 'maximum guests must be 10' })
  public guests!: number;

  @IsInt({ message: 'price must be an integer' })
  @Min(PRICE_MIN, { message: 'minimum price is 100' })
  @Max(PRICE_MAX, { message: 'maximum price is 100000' })
  public price!: number;

  @IsArray({ message: 'features must be an array' })
  @IsEnum(OfferFeature, { each: true, message: 'features must be from valid list' })
  public features!: OfferFeature[];

  @IsMongoId({ message: 'userId field must be valid an id' })
  public userId!: UserId;

  @IsInt({ message: 'comments must be an integer' })
  public comments!: number;

  @IsArray({ message: 'coordinates must be an array' })
  public coordinates!: Coordinates;
}
