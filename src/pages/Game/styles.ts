import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

type CardProps = {
  borderColor?: string;
  active: boolean;
};

export const useStyles = makeStyles(() => ({
  gameContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  settingsContainer: {
    width: '30%'
  },
  settings: {
    marginTop: 60,
    marginLeft: 32,
    display: 'flex',
    flexDirection: 'column',
  },
  dropdown: {
    color: 'white',
    marginBottom: 16,
  },
  playersContainer: {

  },
  handHolder: {
    display: 'flex',
    height: 180,
  },
  cardHolder: {
    height: 160,
    marginLeft: 16,
    '& img': {
      height: 160
    }
  }
}));

export const Card = styled.img<CardProps>`
  border: 4px solid;
  border-color: ${({ borderColor = 'transparent'}) => borderColor};
  border-radius: 8px;
  margin-top: ${({active}) => active ? '-24px' : '' };
`
