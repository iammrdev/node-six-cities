import chalk from 'chalk';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  public execute(filename: string): void {
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (error) {
      if (error instanceof Error) {
        return console.log(chalk.red(`Не удалось импортировать данные из файла по причине: «${error.message}»`));
      }
      throw error;
    }
  }
}
