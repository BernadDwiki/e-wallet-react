import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../contexts/auth/context.js';
import { login as loginAction, logout as logoutAction, setCurrentUser } from '../store/slice/authSlice.js';

/**
 * Custom hook untuk mengakses autentikasi.
 * Login/logout dikelola oleh Redux, sementara register dikelola oleh context.
 *
 * @returns {object} { currentUser, login, register, logout, updateUser, changePassword, changePin }
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
      name: user.name || user.email.split('@')[0],
      phone: user.phone || '',
      income: user.income || 0,
      expense: user.expense || 0,
    };

    dispatch(loginAction(sessionUser));
    return user;
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  const syncCurrentUser = (user) => {
    if (!user) return;
    dispatch(setCurrentUser({
      id: user.id,
      email: user.email,
      name: user.name || user.email.split('@')[0],
      phone: user.phone || '',
      income: user.income || 0,
      expense: user.expense || 0,
    }));
  };

  const updateUser = (updates) => {
    if (!currentUser) {
      throw new Error('No current user');
    }
    const user = context.users.find((userItem) => userItem.id === currentUser.id);
    if (!user) {
      throw new Error('User not found');
    }

    if (updates.email && updates.email !== user.email) {
      const existingEmail = context.users.find((userItem) => userItem.email === updates.email);
      if (existingEmail) {
        throw new Error('Email already in use');
      }
    }

    const updatedUser = { ...user, ...updates };
    context.updateUser(updatedUser);
    syncCurrentUser(updatedUser);
    return updatedUser;
  };

  const changePassword = (currentPassword, newPassword) => {
    if (!currentUser) {
      throw new Error('No current user');
    }
    const user = context.users.find((userItem) => userItem.id === currentUser.id);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }
    const updatedUser = { ...user, password: newPassword };
    context.updateUser(updatedUser);
    return updatedUser;
  };

  const changePin = (newPin) => {
    if (!currentUser) {
      throw new Error('No current user');
    }
    if (!/^[0-9]{6}$/.test(newPin)) {
      throw new Error('PIN must be 6 digits');
    }
    const user = context.users.find((userItem) => userItem.id === currentUser.id);
    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = { ...user, pin: newPin };
    context.updateUser(updatedUser);
    return updatedUser;
  };

  return {
    ...context,
    currentUser,
    login,
    logout,
    updateUser,
    changePassword,
    changePin,
  };
};