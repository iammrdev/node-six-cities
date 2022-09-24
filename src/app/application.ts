import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../packages/logger/logger.interface.js';
import { ConfigInterface } from '../config/config.interface.js';
import { Component } from '../config/config.component.js';

@injectable()
export default class Application {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface) {

  }

  public async init() {
    this.logger.info('Application initialization…');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
