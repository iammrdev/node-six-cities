import { City } from './city.enum.js';
import { User } from './user.type.js';

export enum OfferType {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel',
}
export type OfferFeature = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

export type Coordinates = [number, number];

export type Offer = {
  name: string;
  description: string;
  date: Date;
  city: City;
  preview: string;
  photos: string[];
  isPremium: boolean;
  rating: number;
  type: OfferType;
  rooms: number;
  guests: number;
  price: number;
  features: OfferFeature[];
  user: User;
  comments: number;
  coordinates: Coordinates;
};
