
import { inject, injectable } from 'inversify';

import { HttpMethod } from '../../types/http.enum.js';
import { Request, Response } from 'express';
import CreateUserDto from './dto/create-user.dto.js';
import { Component } from '../../config/config.component.js';
import { Controller } from '../../controller/controller.js';
import { LoggerInterface } from '../../packages/logger/logger.interface.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({ path: '/test', method: HttpMethod.Get, handler: this.test });
    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
  }

  public test(
    _req: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response
  ): void {
    this.ok(res, { status: 'ok' });
  }

  public create(
    _req: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    _res: Response
  ): void {
    throw new Error('[UserController] Oops');
  }
}
