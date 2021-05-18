import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import * as Styled from './styles';
import { Avatar } from '@material-ui/core';
import { GoSmiley } from 'react-icons/go';
import { FiPaperclip, FiClock } from 'react-icons/fi';
import { BiCheckDouble, BiCheck } from 'react-icons/bi';
import { IoMdSend } from 'react-icons/io';
import IconButton from '@material-ui/core/IconButton';
import { msgsData } from './data';
import { colors } from '../../styles/colors';

function MsgContainer() {

  const divMsgsRef = useRef<HTMLDivElement>();

  const [msg, setMsg] = useState('');

  const handleSendMsg = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(msg);
    setMsg('')
  }, [msg]);

  useEffect(() => {
    console.log('scrollTop:', divMsgsRef.current.scrollTop);
    console.log('scrollHeight:', divMsgsRef.current.scrollHeight);
    divMsgsRef.current.scrollTo(0, divMsgsRef.current.scrollHeight);


  }, []);

  return (
    <Styled.Container>
      <header>
        <Avatar src={'/images/profile.jpg'} />
        <div className='user-info'>
          <span className='user-name'>Fulano da sulva</span>
          <span className='user-status'>visto por último hoje às 19:17</span>
        </div>
      </header>

      <main>
        <div className='msgs' ref={divMsgsRef}>
          {
            Array.from(Array(80).keys()).map((v, i) => (
              <div key={i} className={`msg-row ${i === 0 ? 'first-msg' : ''} ${i % 2 === 0 ? 'my-msg-row' : ''}`}>
                <div className={`msg-wrapper ${i % 2 === 0 ? 'my-msg-wrapper' : ''}`}>
                  <span className='msg'>
                    {msgsData[i % 2].msg} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </span>
                  <span className='time-msg'>
                    {msgsData[i % 2].timeMsg}
                    {i % 2 === 1 ? (
                      i % 3 === 0 ?
                        <FiClock size={11} />
                        :
                        <BiCheck size={11} />
                    )
                      :
                      <BiCheckDouble color={i % 4 === 0 ? colors.blue : colors.gray2}
                      />
                    }
                  </span>
                </div>
              </div>
            ))
          }
        </div>
        <footer>
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
        </footer>
      </main>
    </Styled.Container >
  );
};

export default MsgContainer;
