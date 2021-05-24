import { FormEvent, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as Styled from './styles';
import { Avatar } from '@material-ui/core';
import { GoSmiley } from 'react-icons/go';
import { FiPaperclip } from 'react-icons/fi';
import { IoMdSend } from 'react-icons/io';
import IconButton from '@material-ui/core/IconButton';
import { statusIcons } from './data';
import { GroupContext } from '../../conexts/groupContext';
import { isNumber } from '../../utils/isType';
import io from 'socket.io-client';
import { baseURL } from '../../services/api';
import useMessage, { IMessage } from '../../hooks/useMessage';
import { v4 } from 'uuid';
import { authContex } from '../../conexts/authContext';
import moment from 'moment';
import { MessageContext } from '../../conexts/messageContext';

function MsgContainer() {

  const { user } = useContext(authContex);
  const { groups, groupIndexActived } = useContext(GroupContext);
  const { messages, addMessage, updateStatusMenssageById, handleSetMessages } = useContext(MessageContext);

  const divMsgsRef = useRef<HTMLDivElement>();
  const idGroupRef = useRef<string>('');

  const [msg, setMsg] = useState('');

  const socket = useMemo(() => io(baseURL, {
    query: {
      token: sessionStorage.getItem('@token')
    }
  }), []);

  useEffect((): any => {
    socket.on("receive_message", (message: IMessage) => {
      if(message.group_id === idGroupRef.current ){
        console.log(message);
        addMessage(message);
      }
    });
    return () => socket && socket.disconnect()
  }, []);

  useEffect(() => {
    if (isNumber(groupIndexActived)) {
      idGroupRef.current = groups[groupIndexActived].id;
    }
  }, [groups, groupIndexActived]);

  const handleSendMsg = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message: IMessage = {
      id: v4(),
      user_id: user.id,
      group_id: groups[groupIndexActived].id,
      text: msg,
      created_at: new Date(),
      status: 'pendend'
    }
    console.log(msg);
    setMsg('');
    addMessage(message);
    socket.emit('send_message', message, (messageResponse: IMessage) => {
      console.log(messageResponse);
      updateStatusMenssageById(messageResponse.id, messageResponse.status);
    })
  }, [msg, socket, user, groups, groupIndexActived, addMessage, updateStatusMenssageById]);

  useEffect(() => {
    // console.log('scrollTop:', divMsgsRef.current.scrollTop);
    // console.log('scrollHeight:', divMsgsRef.current.scrollHeight);
    if (isNumber(groupIndexActived)) {
      
      divMsgsRef.current.scrollTo(0, divMsgsRef.current.scrollHeight);
      socket.emit('get_messages', idGroupRef.current, (messagesResponse: IMessage[]) => {
        console.log(messagesResponse);
        handleSetMessages(messagesResponse);
      })
    }
  }, [groupIndexActived]);

  useEffect(()=>{
    divMsgsRef.current.scrollTo(0, divMsgsRef.current.scrollHeight);
  },[messages]);

  return (
    <Styled.Container>
      <header>
        {
          isNumber(groupIndexActived) && (
            <>
              <Avatar src={groups[groupIndexActived]?.imgUrl || 'images/profile.png'} />
              <div className='user-info'>
                <span className='user-name'>{groups[groupIndexActived].name}</span>
                <span className='user-status'>visto por último hoje às 19:17</span>
              </div>
            </>
          )
        }
      </header>

      <main>
        <div className='msgs' ref={divMsgsRef}>
          {
            isNumber(groupIndexActived) && (
              messages.map((msg, i) => (
                <div key={i} className={`msg-row ${i === 0 ? 'first-msg' : ''} ${msg.user_id === user.id ? 'my-msg-row' : ''}`}>
                  <div className={`msg-wrapper ${msg.user_id === user.id ? 'my-msg-wrapper' : ''}`}>
                    <span className='msg'>
                      {msg.text} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </span>
                    <span className='time-msg'>
                      {moment(msg.created_at).format('HH:mm')}
                      {statusIcons[msg.status]}
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
