import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';

export default class CreateCommentDto {
  @IsString({ message: 'text is required' })
  @Length(5, 1024, { message: 'Min length is 5, max is 1024' })
  public text!: string;

  @IsMongoId({ message: 'offerId field must be a valid id' })
  public offerId!: string;

  public userId!: string;

  @IsInt({ message: 'rating must be an integer' })
  @Min(1, { message: 'minimum is 1' })
  @Max(5, { message: 'maximum is 5' })
  public rating!: number;
}
