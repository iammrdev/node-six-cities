import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { COMMENT_CONSTRAINT } from '../comment.constants.js';

const {
  TEXT_LENGTH_MIN,
  TEXT_LENGTH_MAX,
  RATING_MIN,
  RATING_MAX,
} = COMMENT_CONSTRAINT;

export default class CreateCommentDto {
  @IsString({ message: 'text is required' })
  @Length(TEXT_LENGTH_MIN, TEXT_LENGTH_MAX, { message: `Min length is ${TEXT_LENGTH_MIN}, max is ${TEXT_LENGTH_MAX}` })
  public text!: string;

  @IsMongoId({ message: 'offerId field must be a valid id' })
  public offerId!: string;

  @IsMongoId({ message: 'userId field must be a valid id' })
  public userId!: string;

  @IsInt({ message: 'rating must be an integer' })
  @Min(RATING_MIN, { message: `min rating value is ${RATING_MIN}` })
  @Max(RATING_MAX, { message: `max rating value is ${RATING_MAX}` })
  public rating!: number;
}
