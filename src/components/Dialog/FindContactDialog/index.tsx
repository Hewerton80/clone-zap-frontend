import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import * as Styled from './styles';
import { PersolinalizedDialog } from '../styled';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IMaskInput } from 'react-imask';
import { Regex } from '../../../utils/Regex';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import useUser from '../../../hooks/useUser';
import { themes } from '../../../styles/colors';
import Avatar from '../../Avatar';
import { GroupContext } from '../../../contexts/groupContext';
import { IGroup } from '../../../hooks/useGroups';
import { SocketContext } from '../../../contexts/socketContext';
import { ThemeContext } from 'styled-components';

interface FindContactDialogProps {
  open: boolean;
  handleClose: () => void;
}

export function FindContactDialog({ open, handleClose }: FindContactDialogProps) {

  const { addGroup } = useContext(GroupContext);
  const { socket } = useContext(SocketContext);
  const theme = useContext(ThemeContext);

  const { userFound, isLoad, findUser, clearUser } = useUser();

  const [phone, setPhone] = useState('');
  const [isLoadFindContact, setIsLoadFindContact] = useState(false);

  const findContact = useCallback(() => {
    handleClose()
    setIsLoadFindContact(true);
    socket.emit('create_private_group', userFound.id, (privateGroup: IGroup) => {
      addGroup(privateGroup);
      console.log('privateGroup: ', privateGroup)
      setIsLoadFindContact(false);
    });
  }, [socket, userFound, addGroup, handleClose]);

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
    <PersolinalizedDialog
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
                  <Avatar src={userFound.imgUrl ||  'images/profile.png'} />
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
                color={themes.light.primary}
                height={20}
                width={20}
              />
              :
              'Adicionar'
          }
        </Styled.ButtonDialog>
      </DialogActions>
    </PersolinalizedDialog>
  )
}

export default FindContactDialog;
