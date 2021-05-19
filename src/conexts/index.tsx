import { ReactNode } from 'react';
import { AuthContexrProvider } from './authContext';

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <AuthContexrProvider>
      {children}
    </AuthContexrProvider>
  );
}

export default Providers;
