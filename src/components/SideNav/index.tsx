import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as Styled from './styles';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdMessage } from 'react-icons/md';
import { groupsData } from './data';
import FloatingMenuWrapper from '../FloatingMenuWrapper';
import Avatar from '../Avatar';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import FindContactDialog from '../Dialog/FindContactDialog';
import { IGroup } from '../../hooks/useGroups';
import { GroupContext } from '../../conexts/groupContext';
import { MessageContext } from '../../conexts/messageContext';
import { IMessage, StatusMsgType } from '../../hooks/useMessage';
import { isNumber } from '../../utils/isType';
import { authContex } from '../../conexts/authContext';
import moment from 'moment';
import { SocketContext } from '../../conexts/socketContext';

function SideNav() {

  const { clearMessages, updateStatusMenssageByIds, addMessage } = useContext(MessageContext);
  const { groups, isLoadGroup, groupIndexActived, handleSetGroups, handleSetGroupIndexAtived, addGroup, updateInfoGroupByMessage } = useContext(GroupContext);
  const { user } = useContext(authContex);
  const { socket } = useContext(SocketContext)

  const groupIdRef = useRef<string>('');

  const [showDialodFindContact, setShowDialodFindContact] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect((): any => {
    if (socket) {

      socket.emit('get_my_groups', 1, (groups: IGroup[]) => {
        console.log(groups);
        handleSetGroups(groups);
      });

      socket.on("receive_message", (message: IMessage) => {
        if (message.group_id === groupIdRef.current) {
          console.log(message);
          addMessage(message);
          socket.emit('update_status_message', message, 'readed', (status: StatusMsgType) => {
            console.log(status);
            updateStatusMenssageByIds([message.id], status);
          })
        }
        else {
          updateInfoGroupByMessage(message, true);
          socket.emit('update_status_message', message, 'received', (status: StatusMsgType) => {
            console.log(status);
            updateStatusMenssageByIds([message.id], status);
          })
        }
      });

      socket.on('update_status_messages', ({ ids, status }) => {
        console.log('update_status_messages: ', ids, status);
        updateStatusMenssageByIds(ids, status);
      });

      socket.on('add_to_private_group', (group: IGroup) => {
        console.log(group);
        addGroup(group);
      });

    }
  }, [socket]);

  useEffect(() => {
    if (isNumber(groupIndexActived)) {
      groupIdRef.current = groups[groupIndexActived].id;
    }
  }, [groups, groupIndexActived]);

  const handleClickGroup = useCallback((i: number) => {
    if (i !== groupIndexActived) {
      clearMessages();
      handleSetGroupIndexAtived(i);
    }
  }, [groupIndexActived, handleSetGroupIndexAtived, clearMessages]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Styled.Aside>
        <header>
          <Avatar src={user.imgUrl || '/images/profile.png'} />
          <div className='actions'>
            <IconButton>
              <MdMessage />
            </IconButton>
            <IconButton onClick={handleClick}>
              <BsThreeDotsVertical />
            </IconButton>
          </div>
        </header>

        <div className='search-bar'>
          <div className='input-wrapper'>
            <AiOutlineSearch />
            <input
              type='text'
              placeholder='Pesquisar ou começar uma nova converça'
              value={''}
              onChange={() => { }}
            />
          </div>
        </div>

        <ul>
          {
            groups.map((gp, i) => (
              <li
                key={gp.id + i}
                onClick={() => handleClickGroup(i)}
                className={groupIndexActived === i ? 'active' : ''}
              >
                <div className='avatar-group'>
                  <img src={gp.imgUrl || '/images/profile.png'} alt='gp-avatar' />
                </div>
                <div className='msgs-group'>
                  <span className='title-group'>{gp.name}</span>
                  <span className='last-msg-group'>{gp.lastMsg}</span>
                </div>
                <div className='time-msgs-group'>
                  <span className='time-msgs'>{moment(new Date(gp.lastMsgTime)).format('HH:mm')}</span>
                  {gp.countMsgsUnread > 0 ?
                    <span className='count-msgs'>{gp.countMsgsUnread}</span>
                    :
                    ''
                  }

                </div>
              </li>
            ))
          }
        </ul>

      </Styled.Aside>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >

        <FloatingMenuWrapper>
          <ul>
            <li onClick={() => setShowDialodFindContact(true)}>
              <span className='item'>Procurar contato</span>
            </li>
            <li>
              <span className='item'>Criar grupo</span>
            </li>
          </ul>
        </FloatingMenuWrapper>
      </Popover>

      <FindContactDialog open={showDialodFindContact} handleClose={() => setShowDialodFindContact(false)} />
    </>
  );
};

export default SideNav;
