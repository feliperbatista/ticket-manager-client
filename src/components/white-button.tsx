export default function WhiteButton({ text }: { text: string }) {
  return (
    <button className="bg-transparent border-text border hover:bg-white/10 font-bold text-sm font-montserrat uppercase text-text px-4 py-1 rounded-lg">
      {text}
    </button>
  );
}
