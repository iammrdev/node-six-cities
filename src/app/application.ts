import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import express, { Express } from 'express';

import { LoggerInterface } from '../packages/logger/logger.interface.js';
import { ConfigInterface } from '../config/config.interface.js';
import { Component } from '../config/config.component.js';
import { DatabaseInterface } from '../packages/database/database.interface.js';
import { getURI } from '../packages/database/utils.js';

@injectable()
export default class Application {
  private server: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface) {

    this.server = express();
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

    this.server.listen(this.config.get('PORT'));
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
