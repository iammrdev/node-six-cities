import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { UserType } from '../../../types/user.type.js';

export default class CreateUserDto {
  @IsString({ message: 'firstname is required' })
  @Length(1, 15, { message: 'min length is 1, max is 15' })
  public name!: string;

  @IsString({ message: 'email is required' })
  @IsEmail({}, { message: 'email must be valid address' })
  public email!: string;

  @IsString({ message: 'password is required' })
  @Length(6, 12, { message: 'min length for password is 6, max is 12' })
  public password!: string;

  @IsString({ message: 'type is required' })
  @IsEnum(UserType, { message: 'type must be valid' })
  public type!: UserType;
}
