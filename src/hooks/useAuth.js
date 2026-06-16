import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../contexts/auth/context.js';
import { login as loginThunk, logout as logoutThunk, setCurrentUser } from '../store/slice/authSlice.js';
import { changePin as changePinService } from '../services/authService.js';
import { changePassword as changePasswordService } from '../services/authService.js';

/**
 * Custom hook untuk mengakses autentikasi.
 * Login/logout dikelola oleh Redux dengan async thunk, sementara register dikelola oleh context.
 *
 * @returns {object} { currentUser, login, register, logout, updateUser, changePassword, changePin }
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const storedUser = typeof window !== 'undefined'
    ? localStorage.getItem('currentUser')
    : null;
  const persistedUser = storedUser ? JSON.parse(storedUser) : null;

  const reduxUser = useSelector((state) => state.auth.currentUser);
  const authLoading = useSelector((state) => state.auth.loading);
  const authError = useSelector((state) => state.auth.error);
  const currentUser = reduxUser || persistedUser;
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
      pin: user.pin || '',
      balance: user.balance || 0,
      income: user.income || 0,
      expense: user.expense || 0
    };

    dispatch(setCurrentUser(sessionUser));
    return user;
  };

  const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('has_pin');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('persist:root');
    
    try {
      await dispatch(logoutThunk()).unwrap();
    } catch (error) {
      console.error('Logout error:', error);
      dispatch(setCurrentUser(null));
    }
  };

  const syncCurrentUser = (user) => {
    if (!user) return;
    dispatch(setCurrentUser({
      id: user.id,
      email: user.email,
      name: user.name || user.email.split('@')[0],
      phone: user.phone || '',
      pin: user.pin || '',
      balance: user.balance || 0,
      income: user.income || 0,
      expense: user.expense || 0
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

  const changePassword = async (currentPassword, newPassword) => {
    const result = await changePasswordService({ currentPassword, newPassword });
    if (!result.success) {
      throw new Error(result.message || 'Failed to change password');
    }
    return result.data;
  };

  const changePin = async (currentPin, newPin) => {
    if (!currentUser) {
      throw new Error('No current user');
    }
    if (!/^[0-9]{6}$/.test(currentPin) || !/^[0-9]{6}$/.test(newPin)) {
      throw new Error('PIN must be 6 digits');
    }

    const result = await changePinService({ currentPin, newPin });
    if (!result.success) {
      throw new Error(result.message || 'Failed to change PIN');
    }

    const updatedUser = {
      ...currentUser,
      pin: newPin,
    };
    dispatch(setCurrentUser(updatedUser));
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }

    return updatedUser;
  };

  const topup = (amount) => {
    if (!currentUser) {
      throw new Error('No current user');
    }
    if (amount <= 0) {
      throw new Error('Topup amount must be positive');
    }
    const user = context.users.find((userItem) => userItem.id === currentUser.id);
    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = {
      ...user,
      balance: (user.balance || 0) + amount,
      income: (user.income || 0) + amount
    };
    context.updateUser(updatedUser);
    syncCurrentUser(updatedUser);
    return updatedUser;
  };

  const transfer = (amount) => {
    if (!currentUser) {
      throw new Error('No current user');
    }
    if (amount <= 0) {
      throw new Error('Transfer amount must be positive');
    }
    const user = context.users.find((userItem) => userItem.id === currentUser.id);
    if (!user) {
      throw new Error('User not found');
    }
    const currentBalance = user.balance || 0;
    if (currentBalance < amount) {
      throw new Error('Insufficient balance');
    }
    const updatedUser = {
      ...user,
      balance: currentBalance - amount,
      expense: (user.expense || 0) + amount
    };
    context.updateUser(updatedUser);
    syncCurrentUser(updatedUser);
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
    topup,
    transfer,
    authLoading,
    authError,
  };
};
    }
    if (amount <= 0) {
      throw new Error('Transfer amount must be positive');
    }
    const user = context.users.find((userItem) => userItem.id === currentUser.id);
    if (!user) {
      throw new Error('User not found');
    }
    const currentBalance = user.balance || 0;
    if (currentBalance < amount) {
      throw new Error('Insufficient balance');
    }
    const updatedUser = {
      ...user,
      balance: currentBalance - amount,
      expense: (user.expense || 0) + amount
    };
    context.updateUser(updatedUser);
    syncCurrentUser(updatedUser);
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
    topup,
    transfer,
  };
};