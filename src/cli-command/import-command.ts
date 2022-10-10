import chalk from 'chalk';
import { OfferServiceInterface } from '../modules/offer/offer.interface.js';
import { OfferModel } from '../modules/offer/offer.entity.js';
import OfferService from '../modules/offer/offer.service.js';
import { UserModel } from '../modules/user/user.entity.js';
import { UserServiceInterface } from '../modules/user/user.interface.js';
import UserService from '../modules/user/user.service.js';
import { DatabaseInterface } from '../packages/database/database.interface.js';
import DatabaseService from '../packages/database/database.service.js';
import { getURI } from '../packages/database/utils.js';
import { TSVFileReader } from '../packages/file-reader/tsv-file-reader.js';
import ConsoleLoggerService from '../packages/logger/console-logger.service.js';
import { LoggerInterface } from '../packages/logger/logger.interface.js';
import { OfferGenerator } from '../packages/offer-generator/offer-generator.js';
import { Offer } from '../types/offer.type.js';
import { getErrorMessage } from '../utils/errors.js';
import { CliCommandInterface } from './cli-command.interface.js';


export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private offerService!: OfferServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger!: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onEnd = this.onEnd.bind(this);

    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: 'test'
    }, this.salt);

    await this.offerService.create({
      ...offer,
      userId: user.id
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = OfferGenerator.createOffer(line);

    this.logger.info('Offer created', offer);

    await this.saveOffer(offer);
    resolve();
  }

  private onEnd(count: number) {
    console.log(chalk.green(`${count} rows imported.`));
    this.databaseService.disconnect();
  }

  public async execute(filename: string, host: string, port: string, dbname: string, salt: string, login: string, password: string,): Promise<void> {
    console.log({ login, password, host, port, dbname });
    const uri = getURI(host, Number(port), dbname, login, password,);
    this.salt = salt;

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onEnd);

    try {
      await fileReader.read();
    } catch (error) {
      console.log(chalk.red(`Can't read the file: ${getErrorMessage(error)}`));
    }
  }
}
