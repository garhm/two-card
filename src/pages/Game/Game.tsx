import React, { useEffect, useState } from 'react';
import { useStyles } from './styles';
import Player from './components/Player';
import useCardGame from '../../hooks/useCardGame';
import { Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Settings from './components/Settings';
import { PlayersNumber } from '../../models/enums/playersNumber.enum';

const Game = () => {
  const { dealCards, getPlayers, updateSettings, getResult } = useCardGame()
  const [innerPlayers, setInnerPlayers] = useState(getPlayers());
  const [resultOpen, setResultOpen] = useState<boolean>();
  const [result, setResult] = useState<string>();

  const { gameContainer, settingsContainer, playersContainer } = useStyles();

  const handleDealCards = () => {
    setResultOpen(false);
    setInnerPlayers([...dealCards(innerPlayers)]);
    const winnerPlayers = getResult(innerPlayers);
    if (winnerPlayers.length === 0 || winnerPlayers.length === innerPlayers.length) {
      setResult('DRAW!');
    } else if (winnerPlayers.length > 1) {
      setResult(`Winners are ${winnerPlayers.join(', ')}`);
    } else if (winnerPlayers.length === 1) {
      setResult(`Winner is ${winnerPlayers[0]}`);
    }
    setTimeout((() => setResultOpen(true)), 2000)
  }

  const handleChangeSettings = (numberOfPlayers: number) => {
    updateSettings(numberOfPlayers);
    setInnerPlayers([...getPlayers()]);
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setResultOpen(false);
  };

  useEffect(() => {
    updateSettings(PlayersNumber.Two);
    setInnerPlayers([...getPlayers()]);
  }, []);

  return (
    <div className={gameContainer}>
      <div className={playersContainer}>
        {innerPlayers && innerPlayers.map((player, index) => (
          <Player key={index} cards={player.cards} name={player.name} pairs={player.pairs}/>
        ))}
        <div>
          <Button variant="contained" color="primary" onClick={handleDealCards}>
            Deal Cards
          </Button>
        </div>
      </div>
      <div className={settingsContainer}>
        <Settings handleChangeSettings={handleChangeSettings}/>
      </div>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={resultOpen}
                autoHideDuration={10000}
                onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
          {result}
        </MuiAlert>
      </Snackbar>
    </div>
  )
}

export default Game;
