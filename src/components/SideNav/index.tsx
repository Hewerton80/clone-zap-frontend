import * as Styled from './styles';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdMessage } from 'react-icons/md';
import IconButton from '@material-ui/core/IconButton';
import { groupsData } from './data';
import { Avatar } from '@material-ui/core';

function SideNav() {
  return (
    <Styled.Aside>
      <header>
        <Avatar src={'/images/profile.jpg'} />
        <div className='actions'>
          <IconButton>
            <MdMessage />
          </IconButton>
          <IconButton>
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
            onChange={()=>{}}
          />
        </div>
      </div>

      <ul>
        {
          Array.from(Array(30).keys()).map((v, i)=>(
            <li key={i}>
              <div className='avatar-group'>
                <img src={groupsData[i % 2].umrImg} alt='gp-avatar' />
              </div>
              <div className='msgs-group'>
                <span className='title-group'>{groupsData[i % 2].title}</span>
                <span className='last-msg-group'>{groupsData[i % 2].lasMsg}</span>
              </div>
              <div className='time-msgs-group'>
                <span className='time-msgs'>{groupsData[i % 2].lastMsgtime}</span>
                <span className='count-msgs'>{groupsData[i % 2].count}</span>
              </div>
            </li>
          ))
        }
      </ul>
    </Styled.Aside>
  );
};

export default SideNav;
