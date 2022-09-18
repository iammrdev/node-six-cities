export interface TSVFileReaderInterface {
  readonly filename: string;
  read(): void;
}
