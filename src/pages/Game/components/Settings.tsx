import React, { useState } from 'react';
import { Button, MenuItem, Select } from '@material-ui/core';
import { PlayersNumber } from '../../../models/enums/playersNumber.enum';
import mapEnum from '../../../utils/mapEnum';
import { useStyles } from '../styles';

const Settings = ({handleChangeSettings}: {handleChangeSettings: any}) => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(PlayersNumber.Two);
  const handleNumberOfPlayersChange = (event: any) => {
    setNumberOfPlayers(event.target.value);
  }
  const { settings, dropdown } = useStyles();

  const handleApplySettings = () => {
    handleChangeSettings(numberOfPlayers);
  }

  return (
    <div className={settings}>
      <h4>Number of Players</h4>
      <Select
        className={dropdown}
        value={numberOfPlayers}
        onChange={handleNumberOfPlayersChange}
      >
        {mapEnum(PlayersNumber, (number: any) => (
          <MenuItem key={number} value={number}>{number}</MenuItem>
        ))}
      </Select>
      <Button variant="contained" color="primary" onClick={handleApplySettings}>
        Apply Settings
      </Button>
    </div>
  )
}

export default Settings;
