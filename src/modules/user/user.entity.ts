import { User, UserType } from '../../types/user.type.js';
import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/crypto.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.email = data.email;
    this.avatar = data.avatar;
    this.name = data.name;
    this.type = data.type;
  }

  @prop({ unique: true, required: true })
  public email!: string;

  @prop({ required: true })
  public avatar!: string;

  @prop({ required: true, min: 1, max: 15 })
  public name!: string;

  @prop({ required: true })
  public type!: UserType;

  @prop({ required: true })
  private password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
