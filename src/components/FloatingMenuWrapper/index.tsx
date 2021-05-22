import { ReactNode } from 'react';

import * as Styled from './styles';

// interface MunuItem {
//   label: string;
//   link: string;
// }
interface FloatingMenuWrapperProps {
  children: ReactNode;
}

function FloatingMenuWrapper({ children }: FloatingMenuWrapperProps) {
  return (
    <Styled.Nav>
      { children }
    </Styled.Nav>
  );
};

export default FloatingMenuWrapper;
