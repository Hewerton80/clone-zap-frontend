import { FormEvent, UIEvent, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as Styled from './styles';
import { Avatar } from '@material-ui/core';
import { GoSmiley } from 'react-icons/go';
import { FiPaperclip } from 'react-icons/fi';
import { IoMdSend } from 'react-icons/io';
import IconButton from '@material-ui/core/IconButton';
import { statusIcons } from './data';
import { GroupContext } from '../../contexts/groupContext';
import { isNumber } from '../../utils/isType';
import { IMessage } from '../../hooks/useMessage';
import { v4 } from 'uuid';
import { authContex } from '../../contexts/authContext';
import { MessageContext } from '../../contexts/messageContext';
import { SocketContext } from '../../contexts/socketContext';
import { getHumanizeDateAccess } from '../../utils/getHumanizeDate';
import moment from 'moment';
moment.locale('pt-br');

function MsgContainer() {

  const { user } = useContext(authContex);
  const { groups, groupIndexActived, zereCountMsgsUnreadGroup, updateInfoGroupByMessage } = useContext(GroupContext);
  const { messages, addMessage, updateStatusMenssagesByIds, handleSetMessages } = useContext(MessageContext);
  const { socket } = useContext(SocketContext);

  const [page, setPage] = useState(1);
  const [isLoadMessages, setIsLoadMessages] = useState(false);

  const divMsgsRef = useRef<HTMLDivElement>();
  const groupIdRef = useRef<string>('');

  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (isNumber(groupIndexActived)) {
      groupIdRef.current = groups[groupIndexActived].id;
    }
  }, [groups, groupIndexActived]);

  const handleSendMsg = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!msg) return;
    const message: IMessage = {
      id: v4(),
      user_id: user.id,
      group_id: groups[groupIndexActived].id,
      text: msg,
      created_at: new Date(),
      status: 'pendend'
    }
    // console.log(msg);
    setMsg('');
    addMessage(message);
    socket.emit('send_message', message, (messageResponse: IMessage) => {
      // console.log(messageResponse);
      updateStatusMenssagesByIds([messageResponse.id], messageResponse.status);
    });
  }, [msg, socket, user, groups, groupIndexActived, addMessage, updateStatusMenssagesByIds]);

  useEffect(() => {
    if (isNumber(groupIndexActived)) {
      divMsgsRef.current.scrollTo(0, divMsgsRef.current.scrollHeight);
      setIsLoadMessages(true);
      socket.emit('get_messages_by_group', 1, groupIdRef.current, (messagesResponse: IMessage[]) => {
        console.log(messagesResponse);
        handleSetMessages(messagesResponse);
      })
    }
  }, [groupIndexActived]);

  useEffect(() => {
    divMsgsRef.current.scrollTo(0, divMsgsRef.current.scrollHeight);
    zereCountMsgsUnreadGroup(groupIdRef.current);
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      updateInfoGroupByMessage(lastMessage, false);
      setIsLoadMessages(false);
    }
  }, [messages]);

  useEffect(() => {
    if (page > 1) {
      setIsLoadMessages(true);
      socket.emit('get_messages_by_group', page, groupIdRef.current, (messagesResponse: IMessage[]) => {
        console.log(messagesResponse);
      })
    }
  }, [page]);

  const handleScrollContainerMsg = useCallback((e: UIEvent<HTMLDivElement, globalThis.UIEvent>) => {
    if (e.currentTarget.scrollTop <= 20 && !isLoadMessages) {
      // setPage(currentPage => currentPage + 1);
    }
  }, [isLoadMessages]);

  const isMyMessage = useCallback((msgUserId: string) => {
    return msgUserId === user?.id;
  }, [user]);

  return (
    <Styled.Container>
      <header>
        {
          isNumber(groupIndexActived) && (
            <>
              <Avatar src={groups[groupIndexActived]?.imgUrl || 'images/profile.png'} />
              <div className='user-info'>
                <span className='user-name'>{groups[groupIndexActived].name}</span>
                <span className='user-status'>
                  {
                    groups[groupIndexActived].is_online ?
                      'online'
                      :
                      getHumanizeDateAccess(groups[groupIndexActived].last_access_at)
                  }
                </span>
              </div>
            </>
          )
        }
      </header>

      <main>
        <div className='bg'></div>
        <div className='msgs' ref={divMsgsRef} onScroll={handleScrollContainerMsg}>
          {
            isNumber(groupIndexActived) && (
              messages.map((msg, i) => (
                <div key={i} className={`msg-row ${i === 0 ? 'first-msg' : ''} ${isMyMessage(msg.user_id) ? 'my-msg-row' : ''}`}>
                  <div className={`msg-wrapper ${isMyMessage(msg.user_id) ? 'my-msg-wrapper' : ''}`}>
                    <span className='msg'>
                      {msg.text} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </span>
                    <span className='time-msg'>
                      {moment(msg.created_at).format('HH:mm')}
                      {isMyMessage(msg.user_id) && statusIcons[msg.status]}
                    </span>
                  </div>
                </div>
              ))
            )
          }
        </div>
        <footer>
          {
            isNumber(groupIndexActived) && (
              <form onSubmit={handleSendMsg}>
                <IconButton type='button'>
                  <GoSmiley />
                </IconButton>
                <IconButton type='button'>
                  <FiPaperclip />
                </IconButton>
                <div className='input-wrapper'>
                  <input
                    type='text'
                    placeholder='Digite uma mensagem'
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                  />
                </div>
                <IconButton type='submit'>
                  <IoMdSend style={{ marginLeft: '2px' }} size={28} />
                </IconButton>
              </form>
            )
          }
        </footer>
      </main>
    </Styled.Container >
  );
};

export default MsgContainer;
