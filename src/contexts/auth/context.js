import { createContext } from 'react';

/**
 * Context untuk autentikasi.
 * Menyediakan fungsi register dan data users secara global.
 */
export const AuthContext = createContext({
  users: [],
  register: () => {},
});