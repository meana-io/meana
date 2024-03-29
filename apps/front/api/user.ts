import User from '@/types/user';
import { api } from '@/utility/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiRoutes } from 'routes';

type UserId = string;

export interface CreateUserData {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password: string;
}

export enum USER {
  GET_USER = 'GET_USER',
  GET_USERS_LIST = 'GET_USERS_LIST',
}

export const useGetUsersList = (options?) => {
  return useQuery(
    [USER.GET_USERS_LIST],
    () => api.get<User[]>(`${apiRoutes.users}`),
    options
  );
};

export const useGetUser = (userId: UserId, options?) => {
  return useQuery(
    [USER.GET_USER, userId],
    () => api.get<User>(`${apiRoutes.users}/${userId}`),
    options
  );
};

export const useUpdateUser = (userId: UserId) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: CreateUserData) =>
      api.patch<User>(`${apiRoutes.users}/${userId}`, data),
    {
      onSuccess: () => {
        toast.success('The user has been successfully updated.');
      },
      onError: () => {
        toast.error('Something went wrong please try again.');
      },
      onSettled: () => {
        queryClient.invalidateQueries([USER.GET_USERS_LIST]);
      },
    }
  );
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: CreateUserData) => api.post<User>(apiRoutes.users, data),
    {
      onSuccess: () => {
        toast.success('The user has been successfully created.');
      },
      onError: () => {
        toast.error('Something went wrong please try again.');
      },
      onSettled: () => {
        queryClient.invalidateQueries([USER.GET_USERS_LIST]);
      },
    }
  );
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (userId: UserId) => api.delete<User>(`${apiRoutes.users}/${userId}`),
    {
      onSuccess: () => {
        toast.success('The user has been successfully deleted.');
      },
      onError: () => {
        toast.error('Something went wrong please try again.');
      },
      onSettled: () => {
        queryClient.invalidateQueries([USER.GET_USERS_LIST]);
      },
    }
  );
};
