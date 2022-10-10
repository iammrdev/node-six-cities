import dayjs from 'dayjs';
import { City } from '../../types/city.enum.js';
import { Coordinates, Offer, OfferFeature, OfferType } from '../../types/offer.type.js';

import { Randomizer } from '../../utils/randomizer.js';
import { OfferGeneratorData, OfferGeneratorInterface } from './offer-generator.interface.js';

export class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: OfferGeneratorData) { }

  public generate(): string {
    const name = Randomizer.getRandomItem(this.mockData.names);
    const description = Randomizer.getRandomItem(this.mockData.descriptions);
    const date = dayjs().subtract(Randomizer.generateRandomValue(1, 7), 'day').toISOString();
    const city = Randomizer.getRandomItem(this.mockData.cities);
    const preview = Randomizer.getRandomItem(this.mockData.previews);
    const photos = Randomizer.getRandomItem(this.mockData.photos);
    const isPremium = Boolean(Randomizer.generateRandomValue(0, 1));
    const rating = Randomizer.generateRandomValue(1, 5);
    const type = Randomizer.getRandomItem(this.mockData.types);
    const rooms = Randomizer.generateRandomValue(1, 8);
    const guests = Randomizer.generateRandomValue(1, 10);
    const price = Randomizer.generateRandomValue(100, 100000);
    const features = Randomizer.getRandomItems(this.mockData.features);
    const comments = Randomizer.generateRandomValue(0, 100);
    const coordinates = Randomizer.getRandomItem(this.mockData.coordinates);
    const user = Randomizer.getRandomItem(this.mockData.users);
    const email = Randomizer.getRandomItem(this.mockData.emails);
    const avatar = Randomizer.getRandomItem(this.mockData.avatars);


    return [
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
      user,
      comments,
      coordinates,
      email,
      avatar
    ].join('\t');
  }

  public static createOffer = (row: string): Offer => {
    const tokens = row.replace('\n', '').split('\t');

    const [
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
      user,
      comments,
      coordinates,
      email,
      avatar
    ] = tokens;

    return {
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
      user: {
        email,
        avatar,
        name: user,
        type: Randomizer.getRandomItem(['base', 'pro'])
      },
      comments: Number(comments),
      coordinates: coordinates.split(';').map(Number) as Coordinates,
    };
  };
}
