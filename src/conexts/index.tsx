import { ReactNode } from 'react';
import { AuthContexrProvider } from './authContext';
import { GroupContextProvider } from './groupContext';
import { MessageContextProvider } from './messageContext';

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <AuthContexrProvider>
      <GroupContextProvider>
        <MessageContextProvider>
          {children}
        </MessageContextProvider>
      </GroupContextProvider>
    </AuthContexrProvider>
  );
}

export default Providers;
