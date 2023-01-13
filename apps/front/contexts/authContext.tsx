import { Credentials, JWT_TOKEN, useLogin } from '@/api/auth';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { createContext, useEffect, useRef } from 'react';
import { pageRoutes } from 'routes';

interface LoggedUser {
  login: string;
  sub: string;
  iat: number;
  exp: number;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: LoggedUser | undefined;
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
  const loggedUser = useRef<LoggedUser>(undefined);

  useEffect(() => {
    loggedUser.current = jwtDecode(localStorage.getItem('token'));
  }, []);

  const loginMutation = useLogin((jwtToken: JWT_TOKEN) => {
    loggedUser.current = jwtDecode(jwtToken.access_token);
    localStorage.setItem('token', jwtToken.access_token);
    router.push(pageRoutes.dashboard);
  });

  const login = async (credentials: Credentials) => {
    await loginMutation.mutateAsync(credentials);
  };

  const logout = async () => {
    loggedUser.current = undefined;
    localStorage.removeItem('token');
    router.push(pageRoutes.login);
  };

  const value = {
    isAuthenticated: loginMutation.isSuccess && !!loggedUser.current,
    user: loggedUser.current,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
