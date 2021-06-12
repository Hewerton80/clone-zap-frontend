import { useContext } from 'react';

import * as Styled from './styles';
import { PersolinalizedDialog } from '../styled';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import { ThemeContext } from '../../../contexts/themeContext';


interface ThemeDialogProps {
  open: boolean;
  handleClose: () => void;
}

export function ThemeDialog({ open, handleClose }: ThemeDialogProps) {

  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <PersolinalizedDialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-slide-title'> Tema</DialogTitle>
      <DialogContent>
        <Styled.Container>

          <span>
            <Radio
              checked={theme === 'light'}
              onChange={() => changeTheme('light')}
              value='light'
              inputProps={{ 'aria-label': 'A' }}
              color='primary'
            />
            🌞
          </span>

          <span>
            <Radio
              checked={theme === 'dark'}
              onChange={() => changeTheme('dark')}
              value='dark'
              inputProps={{ 'aria-label': 'B' }}
            />
            🌛 
          </span>

        </Styled.Container>
      </DialogContent>
    </PersolinalizedDialog>
  )
}

export default ThemeDialog;
