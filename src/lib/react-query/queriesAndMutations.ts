import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { createUserAccount, signinAccount } from '../appwrite/api';
import { INewUser } from '@/types';

export const useCreateUserAcccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSigninAcccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signinAccount(user),
  });
};
