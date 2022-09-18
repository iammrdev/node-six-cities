import chalk from 'chalk';
import { TSVFileReader } from '../packages/file-reader/tsv-file-reader.js';
import { OfferGenerator } from '../packages/offer-generator/offer-generator.js';
import { getErrorMessage } from '../utils/errors.js';
import { CliCommandInterface } from './cli-command.interface.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  private onLine(line: string) {
    const offer = OfferGenerator.createOffer(line);
    console.log(offer);
  }

  private onEnd(count: number) {
    console.log(chalk.green(`${count} rows imported.`));
  }

  public async execute(filename: string): Promise<void> {
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
