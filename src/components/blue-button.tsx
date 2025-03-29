import { useNavigate } from 'react-router-dom';

export default function BlueButton({
  text,
  linkTo,
}: {
  text: string;
  linkTo: string;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-secondary hover:bg-primary font-bold text-sm font-montserrat uppercase text-text px-4 py-1 rounded-lg"
    >
      {text}
    </button>
  );
}
