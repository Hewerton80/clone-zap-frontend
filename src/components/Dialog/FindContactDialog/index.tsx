import { useCallback, useEffect, useMemo, useState } from 'react';

import * as Styled from './styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IMaskInput } from 'react-imask';
import { Regex } from '../../../utils/Regex';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import useUser from '../../../hooks/useUser';
import { colors } from '../../../styles/colors';
import Avatar from '../../Avatar';
import io from 'socket.io-client';
import { baseURL } from '../../../services/api';

interface FindContactDialogProps {
  open: boolean;
  handleClose: () => void;
}

export function FindContactDialog({ open, handleClose }: FindContactDialogProps) {

  const { userFound, isLoad, findUser, clearUser } = useUser();

  const [phone, setPhone] = useState('');
  const [isLoadFindContact, setIsLoadFindContact] = useState(false);

  const socket = useMemo(() => io(baseURL, {
    query: {
      token: sessionStorage.getItem('@token')
    }
  }), [])

  useEffect((): any => {
    return () => socket && socket.disconnect()
  }, []);

  const findContact = useCallback(() => {
    setIsLoadFindContact(true);
    socket.emit('create_privaty_group', userFound.id, (privateGroup: any) => {
      console.log('privateGroup: ', privateGroup)
      setIsLoadFindContact(false);
    });
  }, [socket, userFound]);

  const isValid = useMemo(() => !!phone.match(Regex.phone), [phone]);

  useEffect(() => {
    if (isValid) {
      findUser(phone);
    }
    else {
      clearUser();
    }
  }, [isValid, phone, findUser, clearUser]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-slide-title"> Contato</DialogTitle>
      <DialogContent>
        <Styled.Container>
          <div className='input-wrapper'>
            <IMaskInput
              mask='(00) 00000-0000'
              lazy={false}
              type='text'
              value={phone}
              placeholder='seu número'
              onAccept={(value: string) => setPhone(value)}
            />
          </div>
          <div className="user">
            {
              Object.keys(userFound).length > 0 && (
                <>
                  <Avatar src={'images/profile.jpg'} />
                  <span>{userFound.name}</span>
                </>
              )
            }
          </div>
        </Styled.Container>
      </DialogContent>
      <DialogActions>
        <Styled.ButtonDialog
          disabled={isLoadFindContact || !isValid || isLoad || !Object.keys(userFound).length }
          onClick={findContact}
        >
          {
            isLoad ?
              <Loader
                type="Circles"
                color={colors.primary}
                height={20}
                width={20}
              />
              :
              'Adicionar'
          }
        </Styled.ButtonDialog>
      </DialogActions>
    </Dialog>
  )
}

export default FindContactDialog;
