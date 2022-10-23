
import { inject, injectable } from 'inversify';

import { HttpMethod } from '../../types/http.enum.js';
import { Request, Response } from 'express';
import CreateUserDto from './dto/create-user.dto.js';
import { Component } from '../../config/config.component.js';
import { Controller } from '../../controller/controller.js';
import { LoggerInterface } from '../../packages/logger/logger.interface.js';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../packages/errors/http-error.js';
import LoginUserDto from './dto/login-user.dto.js';
import { UserServiceInterface } from './user.interface.js';
import { fillDTO } from '../../utils/fillDTO.js';
import { ConfigInterface } from '../../config/config.interface.js';
import UserResponse from './response/user.response.js';
import { ValidateDtoMiddleware } from '../../middlewares/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../middlewares/validate-objectid.middleware.js';
import { UploadFileMiddleware } from '../../middlewares/upload-file.middleware.js';
import LoggedUserResponse from './response/logged-user.response.js';
import UploadUserAvatarResponse from './response/upload-user-avatar.response.js';
import { createJWT } from '../../utils/crypto.js';
import { JWT_ALGORITM } from './user.constant.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for UserController…');

    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.register, middlewares: [new ValidateDtoMiddleware(CreateUserDto)] });
    this.addRoute({ path: '/login', method: HttpMethod.Get, handler: this.checkAuth });
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login, middlewares: [new ValidateDtoMiddleware(LoginUserDto)] });
    this.addRoute({
      path: '/:userId/avatar', method: HttpMethod.Post, handler: this.uploadAvatar, middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
  }

  public async register(req: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>, res: Response,): Promise<void> {
    const { body } = req;
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(StatusCodes.CONFLICT, `User with email «${body.email}» exists.`, 'UserController');
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));

    this.send(res, StatusCodes.CREATED, fillDTO(UserResponse, result));
  }

  public async login(req: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>, res: Response,): Promise<void> {
    const { body } = req;
    const user = await this.userService.findByEmail(body.email);

    if (!user) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, `User with email ${body.email} not found.`, 'UserController',);
    }

    const token = await createJWT(
      JWT_ALGORITM,
      this.configService.get('JWT_SECRET'),
      { email: user.email, id: user.id }
    );

    this.ok(res, { ...fillDTO(LoggedUserResponse, user), token });
  }

  public async checkAuth(req: Request, res: Response) {
    if (!req.user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    const user = await this.userService.findByEmail(req.user.email);

    this.ok(res, fillDTO(LoggedUserResponse, user));
  }

  public async uploadAvatar(req: Request, res: Response) {
    const { userId } = req.params;
    const uploadFile = { avatar: req.file?.filename };
    await this.userService.updateById(userId, uploadFile);
    this.created(res, fillDTO(UploadUserAvatarResponse, uploadFile));
  }
}
