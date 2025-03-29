import BlueButton from './blue-button';
import WhiteButton from './white-button';

export default function Header() {
  return (
    <header className="m-4 height-32 flex items-center justify-between">
      <a
        href="/"
        className="font-alconica text-text text-xl uppercase"
      >
        help center
      </a>
      <div className="flex space-x-4">
        <WhiteButton text="criar conta" linkTo="/signup" />
        <BlueButton text="fazer login" />
      </div>
    </header>
  );
}
