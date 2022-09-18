export class Randomizer {
  public static generateRandomValue = (min: number, max: number, numAfterDigit = 0) =>
    Number(Number((Math.random() * (max - min)) + min).toFixed(numAfterDigit));

  public static getRandomItems = <T>(items: T[]): T[] => {
    const startPosition = this.generateRandomValue(0, items.length - 1);
    const endPosition = startPosition + this.generateRandomValue(startPosition, items.length);

    return items.slice(startPosition, endPosition);
  };

  public static getRandomItem = <T>(items: T[]): T =>
    items[this.generateRandomValue(0, items.length - 1)];
}
