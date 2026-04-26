import useLocalStorage from '../../hooks/useLocalStorage.js';
import { AuthContext } from './context.js';

/**
 * Provider untuk AuthContext.
 * Mengelola register user dan persistent users di localStorage.
 * Login/logout dikelola oleh Redux, sedangkan pendaftaran tetap di context.
 *
 * @param {object} props - Props komponen.
 * @param {React.ReactNode} props.children - Komponen anak.
 * @returns {JSX.Element} AuthProvider wrapper.
 */
export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useLocalStorage('users', []);

  const register = (userData) => {
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      balance: 0,
      income: 0,
      expense: 0,
      createdAt: new Date().toISOString()
    };
    setUsers([...users, newUser]);
    return newUser;
  };

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  return (
    <AuthContext.Provider value={{ users, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};