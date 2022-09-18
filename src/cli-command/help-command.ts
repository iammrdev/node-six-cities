import chalk from 'chalk';

import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
        Программа для подготовки данных для REST API сервера.
        Пример:
        ${chalk.blue('ts-node src/cli --<command> [--arguments]')}
        ${chalk.blue('ts-node src/cli --import ./mocks/mock-offers.tsv')}
    Команды:
        ${chalk.green('--version')}:                   # выводит номер версии
        ${chalk.green('--help')}:                      # печатает этот текст
        ${chalk.green('--import <path>')}:             # импортирует данные из TSV
        ${chalk.green('--generate <n> <path> <url>')} # генерирует произвольное количество тестовых данных
    `);
  }
}
