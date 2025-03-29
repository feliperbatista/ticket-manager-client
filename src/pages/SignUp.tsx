import Input from '../components/input';
import { useState } from 'react';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState, // Spread the previous state
      [name]: value, // Update the specific field based on the name
    }));

    console.log(formData); // This will log the updated state
  };

  const signUp = async () => {};

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <main
      className="flex items-center justify-center"
      style={{ minHeight: 'calc(100vh - 7rem)' }}
    >
      <div className="w-full max-w-[690px] m-auto sm:mx-auto p-4 border rounded-xl border-primary">
        <h1 className="uppercase mt-8 font-bold text-center text-3xl font-montserrat text-primary">
          fazer login
        </h1>
        <form
          onSubmit={handleSubmit}
          className="my-12 mx-auto flex items-center justify-center flex-col space-y-10"
        >
          <div className="flex flex-col space-y-4">
            <Input
              name="text"
              id="name"
              type="name"
              placeholder="Nome"
              handleInputChange={handleInputChange}
              value={formData.name}
            />
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              handleInputChange={handleInputChange}
              value={formData.email}
            />
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="Senha"
              handleInputChange={handleInputChange}
              value={formData.password}
            />
            <Input
              name="passwordConfirm"
              id="passwordConfirm"
              type="password"
              placeholder="Confirmação de senha"
              handleInputChange={handleInputChange}
              value={formData.passwordConfirm}
            />
          </div>
          <button
            type="submit"
            className="w-20 h-20 flex items-center justify-center border text-primary border-primary rounded-3xl group hover:bg-primary hover:text-white"
          >
            <i className="fa bg-transparent fa-long-arrow-right group-hover:bg-primary text-2xl "></i>
          </button>
        </form>
        <a href="/">
          <p className="font-montserrat text-text text-xs text-center">
            Já possui uma conta?
          </p>
        </a>
      </div>
    </main>
  );
}
