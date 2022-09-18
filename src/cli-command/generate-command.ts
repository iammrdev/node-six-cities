import got from 'got';
import chalk from 'chalk';


import { CliCommandInterface } from './cli-command.interface.js';
import { OfferGenerator } from '../packages/offer-generator/offer-generator.js';
import { OfferGeneratorData } from '../packages/offer-generator/offer-generator.interface.js';
import { TSVFileWriter } from '../packages/file-writer/file-writer.js';


export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: OfferGeneratorData;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const generateCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch (error) {
      return console.log(chalk.red(`Can't fetch data from ${url}.`));
    }

    const offerGeneratorString = new OfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < generateCount; i++) {
      await tsvFileWriter.write(offerGeneratorString.generate());
    }

    console.log(chalk.green(`File ${filepath} was created!`));
  }
}
