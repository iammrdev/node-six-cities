import { readFileSync } from 'fs';
import { City } from '../../types/city.enum.js';
import {
  Offer,
  OfferType,
  OfferFeature,
  Coordinates,
} from '../../types/offer.type.js';

import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split(/\s{2}|\t/))
      .map(([
        name,
        description,
        date,
        city,
        preview,
        photos,
        isPremium,
        rating,
        type,
        rooms,
        guests,
        price,
        features,
        author,
        comments,
        coordinates,
      ]): Offer => ({
        name,
        description,
        date: new Date(date),
        city: city as City,
        preview,
        photos: photos.split(';'),
        isPremium: Boolean(isPremium),
        rating: Number(rating),
        type: type as OfferType,
        rooms: Number(rooms),
        guests: Number(guests),
        price: Number(price),
        features: features.split(';') as OfferFeature[],
        author,
        comments: Number(comments),
        coordinates: coordinates.split(';').map(Number) as Coordinates,
      }));
  }
}
