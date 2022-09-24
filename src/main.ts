import 'reflect-metadata';
import { Container } from 'inversify';
import { LoggerInterface } from './packages/logger/logger.interface.js';
import LoggerService from './packages/logger/logger.service.js';
import { Component } from './config/config.component.js';
import { ConfigInterface } from './config/config.interface.js';
import ConfigService from './config/config.service.js';
import Application from './app/application.js';

const applicationContainer = new Container();
applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();

const application = applicationContainer.get<Application>(Component.Application);
await application.init();
