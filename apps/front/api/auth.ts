import User from '@/types/user';
import { api } from '@/utility/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRoutes, pageRoutes } from 'routes';

// TODO: To be removed
type UserId = string;

export enum AUTH {
  ME = 'ME',
}

type onSuccessFn = (jwtToken: JWT_TOKEN) => void;

export interface Credentials {
  login: string;
  password: string;
}

export interface JWT_TOKEN {
  access_token: string;
}

// TODO: Change to POST request!
export const useLogin = (onSuccess: onSuccessFn) => {
  const queryClient = useQueryClient();
  return useMutation(
    (credentials: Credentials) =>
      api.post<JWT_TOKEN>(`${apiRoutes.auth.login}`, credentials),
    {
      onError: () => {
        alert('there was an error');
      },
      onSettled: () => {
        queryClient.invalidateQueries([AUTH.ME]);
      },
      onSuccess: (data: JWT_TOKEN) => {
        onSuccess(data);
        console.log('success');
      },
    }
  );
};

// TODO: Change to POST request!
export const useLogout = (onSuccess: onSuccessFn) => {
  const queryClient = useQueryClient();
  return useMutation(
    (userId: UserId) => api.get<User>(`${apiRoutes.users}/${userId}`),
    {
      onError: () => {
        alert('there was an error');
      },
      onSettled: () => {
        queryClient.invalidateQueries([AUTH.ME]);
      },
      onSuccess: () => {
        onSuccess(undefined);
      },
    }
  );
};

export interface UserNotificationsSettings {
  email_notifications: boolean;
  push_notifications: boolean;
}

export const useUpdateUserNotificationsSettings = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ userId, data }: { userId: UserId; data: UserNotificationsSettings }) =>
      api.patch<User>(`${apiRoutes.users}/${userId}`, data),
    {
      onError: () => {
        alert('there was an error');
      },
      onSettled: () => {
        queryClient.invalidateQueries([AUTH.ME]);
      },
    }
  );
};
