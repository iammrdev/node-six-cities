import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, IsOptional, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
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

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(NAME_LENGTH_MIN, { message: `minimum title length must be ${NAME_LENGTH_MIN}` })
  @MaxLength(NAME_LENGTH_MAX, { message: `maximum title length must be ${NAME_LENGTH_MAX}` })
  public name?: string;

  @IsOptional()
  @MinLength(DESCRIPTION_LENGTH_MIN, { message: `minimum description length must be ${DESCRIPTION_LENGTH_MIN}` })
  @MaxLength(DESCRIPTION_LENGTH_MAX, { message: `maximum description length must be ${DESCRIPTION_LENGTH_MAX}` })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: 'date must be valid ISO date' })
  public date?: Date;

  @IsOptional()
  @IsEnum(City, { message: 'city must be enum City' })
  public city?: City;

  @IsOptional()
  @MaxLength(256, { message: 'too short for field' })
  public preview?: string;

  @IsOptional()
  @IsArray({ message: 'field categories must be an array' })
  @ArrayMinSize(PHOTOS_COUNT, { message: `photos length must be ${PHOTOS_COUNT}` })
  @ArrayMaxSize(PHOTOS_COUNT, { message: `photos length must be ${PHOTOS_COUNT}` })
  @Matches(/[\w/-]+.(jpg|png)/, { each: true, message: 'photo must be jpg or png' })
  public photos?: string[];

  @IsOptional()
  @IsBoolean({ message: 'isPremium must be an boolean' })
  public isPremium?: boolean;

  @IsOptional()
  @IsInt({ message: 'rating must be an integer' })
  @Min(RATING_MIN, { message: `min rating value be ${RATING_MIN}` })
  @Max(RATING_MAX, { message: `max rating value be ${RATING_MAX}` })
  public rating?: number;

  @IsOptional()
  @IsEnum(OfferType, { message: 'type must be enum OfferType' })
  public type?: OfferType;

  @IsOptional()
  @IsInt({ message: 'rooms must be an integer' })
  @Min(ROOMS_COUNT_MIN, { message: `minimum rooms must be ${ROOMS_COUNT_MIN}` })
  @Max(ROOMS_COUNT_MAX, { message: `maximum rooms must be ${ROOMS_COUNT_MAX}` })
  public rooms?: number;

  @IsOptional()
  @IsInt({ message: 'guests must be an integer' })
  @Min(GUESTS_COUNT_MIN, { message: `minimum guests must be ${GUESTS_COUNT_MIN}` })
  @Max(GUESTS_COUNT_MAX, { message: `maximum guests must be ${GUESTS_COUNT_MAX}` })
  public guests?: number;

  @IsOptional()
  @IsInt({ message: 'price must be an integer' })
  @Min(PRICE_MIN, { message: `minimum price is ${PRICE_MIN}` })
  @Max(PRICE_MAX, { message: `maximum price is ${PRICE_MAX}` })
  public price?: number;

  @IsOptional()
  @IsArray({ message: 'features must be an array' })
  @IsEnum(OfferFeature, { each: true, message: 'features must be from valid list' })
  public features?: OfferFeature[];

  @IsOptional()
  @IsMongoId({ message: 'userId field must be valid an id' })
  public userId?: UserId;

  @IsOptional()
  @IsInt({ message: 'comments must be an integer' })
  public comments?: number;

  @IsOptional()
  @IsArray({ message: 'coordinates must be an array' })
  public coordinates?: Coordinates;
}
