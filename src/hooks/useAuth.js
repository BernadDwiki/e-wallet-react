import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../contexts/auth/context.js';
import { login as loginAction, logout as logoutAction } from '../store/slice/authSlice.js';

/**
 * Custom hook untuk mengakses autentikasi.
 * Login/logout dikelola oleh Redux, sementara register dikelola oleh context.
 *
 * @returns {object} { currentUser, login, register, logout }
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const login = async (email, password) => {
    const user = context.users.find((userItem) => userItem.email === email && userItem.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const sessionUser = {
      id: user.id,
      email: user.email,
      name: user.name || user.email.split('@')[0]
    };

    dispatch(loginAction(sessionUser));
    return user;
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    ...context,
    currentUser,
    login,
    logout,
  };
};