import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import Cookies from 'js-cookie';

interface AuthConextProps {
  user: { token: string } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{ token: string } | null>
  >;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthConextProps | undefined>(
  undefined,
);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<{ token: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) setUser({ token });
    setLoading(false);
  }, []);

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
