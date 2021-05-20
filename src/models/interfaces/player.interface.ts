import { ICard } from './card.interface';

export interface IPlayer {
  cards: ICard[];
  pairs: string[];
  name: string;
}
