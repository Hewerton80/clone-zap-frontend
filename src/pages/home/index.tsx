import { useContext } from 'react';
import MsgContainer from '../../components/MsgContainer';
import SideNav from '../../components/SideNav';
import { ThemeContext } from '../../contexts/themeContext';
import { themes } from '../../styles/colors';
import { withAuth } from '../../utils/withAuth';
import * as Styled from './styled';
import { ThemeProvider } from 'styled-components';

function Home() {
  const { theme } = useContext(ThemeContext);
  console.log(themes[theme]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <Styled.Container>
        <SideNav />
        <MsgContainer />
      </Styled.Container>
    </ThemeProvider>
  )
}

export default withAuth(Home);