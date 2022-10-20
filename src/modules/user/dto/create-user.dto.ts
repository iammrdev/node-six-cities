import { IsEmail, IsString, Length } from 'class-validator';

export default class CreateUserDto {
  @IsString({ message: 'firstname is required' })
  @Length(1, 15, { message: 'Min length is 1, max is 15' })
  public name!: string;

  @IsEmail({}, { message: 'email must be valid address' })
  public email!: string;

  @IsString({ message: 'avatar is required' })
  public avatar!: string;

  @IsString({ message: 'password is required' })
  @Length(6, 12, { message: 'Min length for password is 6, max is 12' })
  public password!: string;

  @IsString({ message: 'type is required' })
  public type!: 'base' | 'pro';
}
