import BlueButton from './blue-button';
import WhiteButton from './white-button';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="m-4 height-32 flex items-center justify-between">
      <Link
        to="/"
        className="font-alconica text-text text-xl uppercase"
      >
        help center
      </Link>
      <nav className="flex space-x-4">
        {user ? (
          <>
            <WhiteButton text="meus tickets" linkTo="/my-tickets" />
            <BlueButton text="novo ticket" linkTo="/novo-ticket" />
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
