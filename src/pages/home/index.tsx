import MsgContainer from '../../components/MsgContainer';
import SideNav from '../../components/SideNav';
import * as Styled from './styled';

function Home() {
  return (
    <Styled.Container>
      <SideNav />
      <MsgContainer />
    </Styled.Container>
  )
}

export default Home;