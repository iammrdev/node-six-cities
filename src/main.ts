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
import { OfferServiceInterface } from './modules/offer/offer.interface.js';
import OfferService from './modules/offer/offer.service.js';
import { OfferEntity, OfferModel } from './modules/offer/offer.entity.js';
import { CommentServiceInterface } from './modules/comment/comment.interface.js';
import CommentService from './modules/comment/comment.service.js';
import { CommentEntity, CommentModel } from './modules/comment/comment.entity.js';
import UserController from './modules/user/user.contoller.js';
import { ControllerInterface } from './controller/controller.interface.js';
import ExceptionFilter from './packages/errors/exception-filter.js';
import { ExceptionFilterInterface } from './packages/errors/exception-filter.interface.js';
import OfferController from './modules/offer/offer.controller.js';
import CommentController from './modules/comment/comment.controller.js';

const dependencyContainer = new DependencyContainer();
// singleton
dependencyContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
dependencyContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
dependencyContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
dependencyContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();
dependencyContainer.bind<ExceptionFilterInterface>(Component.ExceptionFilterInterface).to(ExceptionFilter).inSingletonScope();

// interfaces
dependencyContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
dependencyContainer.bind<OfferServiceInterface>(Component.OfferServiceInterface).to(OfferService);
dependencyContainer.bind<CommentServiceInterface>(Component.CommentServiceInterface).to(CommentService);

// models
dependencyContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
dependencyContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
dependencyContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

// controllers
dependencyContainer.bind<ControllerInterface>(Component.UserController).to(UserController).inSingletonScope();
dependencyContainer.bind<ControllerInterface>(Component.OfferController).to(OfferController).inSingletonScope();
dependencyContainer.bind<ControllerInterface>(Component.CommentController).to(CommentController).inSingletonScope();

const application = dependencyContainer.get<Application>(Component.Application);

await application.init();
