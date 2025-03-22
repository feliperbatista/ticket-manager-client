export default function BlueButton({ text }: { text: string }) {
  return (
    <button className="bg-secondary hover:bg-primary font-bold text-sm font-montserrat uppercase text-text px-4 py-1 rounded-lg">
      {text}
    </button>
  );
}
