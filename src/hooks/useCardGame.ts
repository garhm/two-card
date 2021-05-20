import { ICard } from '../models/interfaces/card.interface';
import { IPlayer } from '../models/interfaces/player.interface';
import { IGameConfig } from '../models/interfaces/gameConfig.interface';
import { PlayersNumber } from '../models/enums/playersNumber.enum';

export default function useCardGame(config: IGameConfig =
                                      { cardsPerPlayer: 7, numberOfPlayers: PlayersNumber.Two }) {
  const suits: string[] = ['spade', 'diamond', 'club', 'heart'];
  const values: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const deck: ICard[] = [];
  const defaultPlayerNames: string[] = ['One', 'Two', 'Three', 'Four'];
  let players: IPlayer[] = [];

  const creatAndShuffleNewDeck = () => {
    for (let value of values) {
      for (let suit of suits) {
        deck.push({ suit, value });
      }
    }

    for (let i = 0; i < 1000; i++) {
      const locationOne = Math.floor((Math.random() * deck.length));
      const locationTwo = Math.floor((Math.random() * deck.length));
      let tmp = deck[locationOne];

      deck[locationOne] = deck[locationTwo];
      deck[locationTwo] = tmp;
    }
  }

  const getPairs = (cards: ICard[]) => {
   return cards.reduce((acc: string[], card, index) => {
      if (cards.findIndex(innerCard => innerCard.value === card.value) !== index
        && acc.findIndex(value => value === card.value) === -1) {
        acc.push(card.value)
      }
      return acc
    }, []);
  }

  const dealCards = (players: IPlayer[]): IPlayer[] => {
    const { cardsPerPlayer } = config;
    const innerDeck = [...deck];

    players.forEach((player, index) => {
      const playerCards = Array.from(Array(cardsPerPlayer)).reduce(acc => {
        const randomCardIndex = Math.floor(Math.random() * innerDeck.length);
        const [card] = innerDeck.splice(randomCardIndex, 1);
        acc.push(card);
        return acc;
      }, []);

      players[index] = {
        name: player.name,
        cards: playerCards,
        pairs: getPairs(playerCards)
      }
    });

    return players;
  }

  const getPlayers = (): IPlayer[] => {
    return players
  }

  const setPlayers = (playersNames: string[] = defaultPlayerNames) => {
    players = [];
    for (let i = 0; i < config.numberOfPlayers; i ++) {
      players.push({name: playersNames[i], cards: [], pairs: []})
    }
  }

  const updateSettings = (numberOfPlayers: number) => {
    config.numberOfPlayers = numberOfPlayers;
    setPlayers()
  }

  const getResult = (players: IPlayer[]): string[] => {
    let winners: string[] = [];
    let maxNumberOfPairs: number = 0;
    players.forEach(player => {
      if (player.pairs.length > maxNumberOfPairs) {
        maxNumberOfPairs = player.pairs.length;
      }
    });
    players.forEach(player => {
      if (player.pairs.length === maxNumberOfPairs) {
        winners.push(player.name);
      }
    })
    return winners;
  }

  creatAndShuffleNewDeck()

  return {getPlayers, dealCards, setPlayers, updateSettings, getResult}
}
