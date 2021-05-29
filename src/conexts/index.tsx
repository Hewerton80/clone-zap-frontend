import { ReactNode } from 'react';
import { AuthContexrProvider } from './authContext';
import { GroupContextProvider } from './groupContext';
import { MessageContextProvider } from './messageContext';
import { SocketContextProvider } from './socketContext';

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <AuthContexrProvider>
      <SocketContextProvider>
        <GroupContextProvider>
          <MessageContextProvider>
            {children}
          </MessageContextProvider>
        </GroupContextProvider>
      </SocketContextProvider>
    </AuthContexrProvider>
  );
}

export default Providers;
