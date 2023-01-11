import { Credentials, JWT_TOKEN, useLogin, useLogout } from '@/api/auth';
import User from '@/types/user';
import { useRouter } from 'next/router';
import { createContext, useEffect, useRef } from 'react';
import { pageRoutes } from 'routes';

interface AuthContextProps {
  isAuthenticated: boolean;
  user: any;
  login: (credentials: Credentials) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const accessTokenRef = useRef<string>();

  const loginMutation = useLogin((jwtToken: JWT_TOKEN) => {
    accessTokenRef.current = jwtToken.access_token;
    localStorage.setItem('token', jwtToken.access_token);
    router.push(pageRoutes.dashboard);
  });

  const logoutMutation = useLogout(() => {
    accessTokenRef.current = undefined;
    localStorage.removeItem('token');
  });

  const login = async (credentials: Credentials) => {
    await loginMutation.mutateAsync(credentials);
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
