import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;

  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  findByOffersName(offerName: string): Promise<DocumentType<OfferEntity> | null>;

  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;

  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  find(count?: number): Promise<DocumentType<OfferEntity>[]>;

  findNew(count?: number): Promise<DocumentType<OfferEntity>[]>;

  findDiscussed(count?: number): Promise<DocumentType<OfferEntity>[]>;

  incComments(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  exists(documentId: string): Promise<boolean>;
}
