import { useContext, useEffect } from 'react';
import BlueButton from './blue-button';
import WhiteButton from './white-button';
import { useAuth } from '../context/AuthContext'; // Using the custom hook
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout, loading } = useAuth(); // Accessing user, logout, and loading from the context
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dash'); // Redirect to /dash if the user is logged in
    }
  }, [user, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="m-4 height-32 flex items-center justify-between">
      <a
        href="/"
        className="font-alconica text-text text-xl uppercase"
      >
        help center
      </a>
      <nav className="flex space-x-4">
        {user ? (
          <>
            <WhiteButton text="meus tickets" linkTo="/meus-tickets" />
            <BlueButton text="novo ticket" linkTo="/novo-ticket" />
            {/* Add Logout Button */}
            <button onClick={logout} className="text-red-500">
              Logout
            </button>
          </>
        ) : (
          <>
            <WhiteButton text="criar conta" linkTo="/signup" />
            <BlueButton text="fazer login" linkTo="/login" />
          </>
        )}
      </nav>
    </header>
  );
}
