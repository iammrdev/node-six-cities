import { Request, Response } from 'express';
import { inject } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import CommentResponse from './response/comment.response.js';
import { Component } from '../../config/config.component.js';
import { Controller } from '../../controller/controller.js';
import { CommentServiceInterface } from './comment.interface.js';
import { OfferServiceInterface } from '../offer/offer.interface.js';
import { HttpMethod } from '../../types/http.enum.js';
import HttpError from '../../packages/errors/http-error.js';
import { fillDTO } from '../../utils/fillDTO.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { LoggerInterface } from '../../packages/logger/logger.interface.js';
import { ValidateDtoMiddleware } from '../../middlewares/validate-dto.middleware.js';
import { PrivateRouteMiddleware } from '../../middlewares/private-route.middleware.js';
import { ConfigInterface } from '../../config/config.interface.js';

export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for CommentController…');

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateCommentDto)] });
  }

  public async create(req: Request<object, object, CreateCommentDto>, res: Response): Promise<void> {
    const { body } = req;

    if (!await this.offerService.exists(body.offerId)) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${body.offerId} not found.`, 'CommentController');
    }

    const comment = await this.commentService.create({ ...body, userId: req.user.id });
    await this.offerService.incComments(body.offerId);

    this.created(res, fillDTO(CommentResponse, comment));
  }
}
