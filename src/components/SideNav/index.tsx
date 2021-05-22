import { useState } from 'react';
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

function SideNav() {

  const [showDialodFindContact, setShowDialodFindContact] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
          <Avatar src={'/images/profile.jpg'} />
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
            Array.from(Array(30).keys()).map((v, i) => (
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

      <FindContactDialog open={showDialodFindContact} handleClose={() => setShowDialodFindContact(false)}/>
    </>
  );
};

export default SideNav;
