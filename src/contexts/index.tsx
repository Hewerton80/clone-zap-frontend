import { ReactNode } from 'react';
import { AuthContexrProvider } from './authContext';
import { GroupContextProvider } from './groupContext';
import { MessageContextProvider } from './messageContext';
import { SocketContextProvider } from './socketContext';
import { ThemeContextProvider } from './themeContext';

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <AuthContexrProvider>
      <ThemeContextProvider>
        <SocketContextProvider>
          <GroupContextProvider>
            <MessageContextProvider>
              {children}
            </MessageContextProvider>
          </GroupContextProvider>
        </SocketContextProvider>
      </ThemeContextProvider>
    </AuthContexrProvider>
  );
}

export default Providers;
