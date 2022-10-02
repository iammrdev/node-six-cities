import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../packages/logger/logger.interface.js';
import { ConfigInterface } from '../config/config.interface.js';
import { Component } from '../config/config.component.js';
import { DatabaseInterface } from '../packages/database/database.interface.js';
import { getURI } from '../packages/database/utils.js';

@injectable()
export default class Application {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface) {

  }

  public async init() {
    this.logger.info('Application initialization…');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);
  }
}
