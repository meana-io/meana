import { useLogin, useLogout } from '@/api/auth';
import User from '@/types/user';
import { createContext, useRef } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User;
  login: (userId: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const accessTokenRef = useRef<string>();

  const loginMutation = useLogin((user) => {
    accessTokenRef.current = user.uuid;
  });

  const logoutMutation = useLogout(() => {
    accessTokenRef.current = undefined;
  });

  const login = async (userId: string) => {
    await loginMutation.mutateAsync(userId);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync(accessTokenRef.current);
  };

  const value = {
    isAuthenticated: loginMutation.isSuccess && !!accessTokenRef.current,
    user: loginMutation.data,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
