export interface OfferGeneratorInterface {
  generate(): string;
}

export type OfferGeneratorData = {
  names: string[],
  descriptions: string[],
  cities: string[],
  previews: string[],
  photos: string[],
  types: string[],
  features: string[],
  coordinates: string[],
  emails: string[];
  users: string[];
  avatars: string[]
};
