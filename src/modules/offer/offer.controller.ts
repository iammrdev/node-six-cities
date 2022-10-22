
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Component } from '../../config/config.component.js';
import { Controller } from '../../controller/controller.js';
import { DocumentExistsMiddleware } from '../../middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../middlewares/private-route.middleware.js';
import { ValidateDtoMiddleware } from '../../middlewares/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../middlewares/validate-objectid.middleware.js';
import HttpError from '../../packages/errors/http-error.js';
import { LoggerInterface } from '../../packages/logger/logger.interface.js';
import { HttpMethod } from '../../types/http.enum.js';
import { fillDTO } from '../../utils/fillDTO.js';
import { CommentServiceInterface } from '../comment/comment.interface.js';
import CommentResponse from '../comment/response/comment.response.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { OfferServiceInterface } from './offer.interface.js';
import { OfferResponse } from './response/offer.response.js';


type ParamsGetOffer = {
  offerId: string;
}

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');
    this.addRoute({
      path: '/', method: HttpMethod.Get, handler: this.index, middlewares:
        [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateOfferDto)]
    });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.show });
    this.addRoute({
      path: '/:offerId', method: HttpMethod.Delete, handler: this.delete, middlewares:
        [new PrivateRouteMiddleware(), new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]
    });
    this.addRoute({
      path: '/:offerId', method: HttpMethod.Patch, handler: this.update, middlewares:
        [new PrivateRouteMiddleware(), new ValidateObjectIdMiddleware('offerId'), new ValidateDtoMiddleware(UpdateOfferDto)]
    });
    this.addRoute({
      path: '/:offerId/comments', method: HttpMethod.Get, handler: this.getComments, middlewares:
        [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const offersResponse = fillDTO(OfferResponse, offers);
    this.send(res, StatusCodes.OK, offersResponse);
  }

  public async create(req: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>, res: Response): Promise<void> {
    const { body, user } = req;

    const existOffer = await this.offerService.findByOffersName(body.name);

    if (existOffer) {
      const errorMessage = `Offers with name «${body.name}» exists.`;
      this.send(res, StatusCodes.UNPROCESSABLE_ENTITY, { error: errorMessage });
      return this.logger.error(errorMessage);
    }

    const result = await this.offerService.create({ ...body, userId: user.id });
    this.send(res, StatusCodes.CREATED, fillDTO(OfferResponse, result));
  }

  public async show(req: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response): Promise<void> {
    const { offerId } = req.params;
    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${offerId} not found.`, 'OfferController');
    }

    this.ok(res, fillDTO(OfferResponse, offer));
  }

  public async delete(req: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response): Promise<void> {
    const { offerId } = req.params;
    const offer = await this.offerService.deleteById(offerId);

    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${offerId} not found.`, 'OfferController');
    }

    this.noContent(res, offer);
  }

  public async update(req: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateOfferDto>, res: Response): Promise<void> {
    const { body, params } = req;
    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    if (!updatedOffer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${params.offerId} not found.`, 'OfferController');
    }

    this.ok(res, fillDTO(OfferResponse, updatedOffer));
  }

  public async getComments(req: Request<core.ParamsDictionary | ParamsGetOffer, object, object>, res: Response): Promise<void> {
    const { params } = req;
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }
}
