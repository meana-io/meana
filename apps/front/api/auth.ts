import User from '@/types/user';
import { api } from '@/utility/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiRoutes } from 'routes';

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

export const useLogin = (onSuccess: onSuccessFn) => {
  const queryClient = useQueryClient();
  return useMutation(
    (credentials: Credentials) =>
      api.post<JWT_TOKEN>(`${apiRoutes.auth.login}`, credentials),
    {
      onError: () => {
        toast.error('Something went wrong please try again.');
      },
      onSettled: () => {
        queryClient.invalidateQueries([AUTH.ME]);
      },
      onSuccess: (data: JWT_TOKEN) => {
        onSuccess(data);
      },
    }
  );
};

export interface UserNotificationsSettings {
  email_notifications: boolean;
}

export const useUpdateUserNotificationsSettings = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ userId, data }: { userId: UserId; data: UserNotificationsSettings }) =>
      api.patch<User>(`${apiRoutes.users}/${userId}`, data),
    {
      onError: () => {
        toast.error('Something went wrong please try again.');
      },
      onSettled: () => {
        queryClient.invalidateQueries([AUTH.ME]);
      },
    }
  );
};
