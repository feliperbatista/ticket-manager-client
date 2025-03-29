import { useNavigate } from 'react-router-dom';

export default function WhiteButton({
  text,
  linkTo,
}: {
  text: string;
  linkTo: string;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(linkTo);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-transparent border-text border hover:bg-white/10 font-bold text-sm font-montserrat uppercase text-text px-4 py-1 rounded-lg"
    >
      {text}
    </button>
  );
}
