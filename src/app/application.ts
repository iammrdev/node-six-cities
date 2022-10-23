import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import cors from 'cors';
import { LoggerInterface } from '../packages/logger/logger.interface.js';
import { ConfigInterface } from '../config/config.interface.js';
import { Component } from '../config/config.component.js';
import { DatabaseInterface } from '../packages/database/database.interface.js';
import { getURI } from '../packages/database/utils.js';
import { ControllerInterface } from '../controller/controller.interface.js';
import { ExceptionFilterInterface } from '../packages/errors/exception-filter.interface.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';

@injectable()
export default class Application {
  private server: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    @inject(Component.UserController) private userController: ControllerInterface,
    @inject(Component.OfferController) private offerController: ControllerInterface,
    @inject(Component.CommentController) private commentController: ControllerInterface,
    @inject(Component.ExceptionFilterInterface) private exceptionFilter: ExceptionFilterInterface,) {

    this.server = express();
  }

  public initRoutes() {
    this.server.use('/users', this.userController.router);
    this.server.use('/offers', this.offerController.router);
    this.server.use('/comments', this.commentController.router);
  }

  public initMiddleware() {
    this.server.use(express.json());
    this.server.use('/upload', express.static(this.config.get('UPLOAD_DIRECTORY')));
    this.server.use('/static', express.static(this.config.get('STATIC_DIRECTORY_PATH')));
    const authMiddleware = new AuthMiddleware(this.config.get('JWT_SECRET'));
    this.server.use(authMiddleware.execute.bind(authMiddleware));
    this.server.use(cors());
  }

  public initExceptionFilters() {
    this.server.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.logger.info('Application initialization…');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    const uri = getURI(
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
    );

    await this.databaseClient.connect(uri);
    this.initMiddleware();
    this.initRoutes();
    this.initExceptionFilters();
    this.server.listen(this.config.get('PORT'));
    this.logger.info(`Server started on http://${this.config.get('HOST')}:${this.config.get('PORT')}`);
  }
}
