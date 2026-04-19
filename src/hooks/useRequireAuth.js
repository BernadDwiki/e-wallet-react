import { useAuth } from './useAuth.js';

export const useRequireAuth = () => {
  const { currentUser } = useAuth();
  return currentUser;
};

