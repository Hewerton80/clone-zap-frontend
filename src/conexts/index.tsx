import { ReactNode } from 'react';
import { AuthContexrProvider } from './authContext';
import { GroupContextProvider } from './groupContext';

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <AuthContexrProvider>
      <GroupContextProvider>
        {children}
      </GroupContextProvider>
    </AuthContexrProvider>
  );
}

export default Providers;
