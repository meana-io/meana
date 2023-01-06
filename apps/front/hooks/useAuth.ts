import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a DashboardProvider');
  }

  return context;
};

export default useAuth;
