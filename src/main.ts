import 'reflect-metadata';
import { Container as DependencyContainer } from 'inversify';
import { types } from '@typegoose/typegoose';
import { LoggerInterface } from './packages/logger/logger.interface.js';
import LoggerService from './packages/logger/logger.service.js';
import { Component } from './config/config.component.js';
import { ConfigInterface } from './config/config.interface.js';
import ConfigService from './config/config.service.js';
import Application from './app/application.js';
import DatabaseService from './packages/database/database.service.js';
import { DatabaseInterface } from './packages/database/database.interface.js';
import { UserServiceInterface } from './modules/user/user.interface.js';
import UserService from './modules/user/user.service.js';
import { UserEntity, UserModel } from './modules/user/user.entity.js';
import { OfferServiceInterface } from './modules/offer/offer-service.interface.js';
import OfferService from './modules/offer/offer.service.js';
import { OfferEntity, OfferModel } from './modules/offer/offer.entity.js';

const dependencyContainer = new DependencyContainer();
// singleton
dependencyContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
dependencyContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
dependencyContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
dependencyContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();

// interfaces
dependencyContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
dependencyContainer.bind<OfferServiceInterface>(Component.OfferServiceInterface).to(OfferService);

// models
dependencyContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
dependencyContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

const application = dependencyContainer.get<Application>(Component.Application);

await application.init();
