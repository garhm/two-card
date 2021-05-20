import React, { useEffect, useState } from 'react';
import { IPlayer } from '../../../models/interfaces/player.interface';
import { Card, useStyles } from '../styles';
import { cardImageUrl } from '../../../utils/constants/cardImageUrl';
import { getRandomColor } from '../../../utils/getRandomColor';
import { IPairColor } from '../../../models/interfaces/pairColor.interface';

const Player = ({cards, pairs, name}: IPlayer) => {
  const { handHolder, cardHolder } = useStyles();
  const [pairColors, setPairColors] = useState<IPairColor[]>([]);

  const getPairsColors = () => {
    const innerPairColors: IPairColor[] = [];
    if (!pairs) {
      return
    }
    pairs.forEach(value => {
      innerPairColors.push({value: value, color: getRandomColor()})
    });
    setPairColors(innerPairColors)
  }

  useEffect(() => {
    getPairsColors()
  }, [pairs])

  return (
    <div>
      <h2>Player {name}</h2>
      <div className={handHolder}>
        {cards && cards.map(card => {
          let pairColor;
          pairColor = pairColors.find(pair => pair.value === card.value);
          return (
            <div className={cardHolder}>
              <Card borderColor={pairColor && pairColor.color}
                    active={!!pairColor}
                    src={`${cardImageUrl}${card.suit}_${card.value}.svg`}/>
            </div>
          )
        })
        }
      </div>
    </div>
  )
}

export default Player;
