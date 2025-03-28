import Input from '../components/input';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUp() {
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [ket: string]: string } = {};

    if (!formData.name) newErrors.name = 'Informe seu nome';
    if (!formData.email) newErrors.email = 'Informe seu email';
    if (!formData.password) newErrors.password = 'Informe uma senha';
    if (formData.password !== formData.passwordConfirm)
      newErrors.passwordConfirm = 'Senhas não são iguais';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const signUp = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${REACT_APP_API_URL}/users/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            passwordConfirm: formData.passwordConfirm,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess('Conta criada com sucesso!');
        setFormData({
          name: '',
          email: '',
          password: '',
          passwordConfirm: '',
        });
        navigate('/login');
      } else {
        setErrors({ api: data.message || 'Ocorreu um erro' });
      }
    } catch (error) {
      setErrors({
        api: 'Ocorreu um erro. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) signUp();
  };

  return (
    <main
      className="flex items-center justify-center"
      style={{ minHeight: 'calc(100vh - 7rem)' }}
    >
      <div className="w-full max-w-[690px] m-auto sm:mx-auto p-4 border rounded-xl border-primary">
        <h1 className="uppercase mt-8 font-bold text-center text-3xl font-montserrat text-primary">
          criar conta
        </h1>
        <form
          onSubmit={handleSubmit}
          className="my-12 mx-auto flex items-center justify-center flex-col space-y-10"
        >
          <div className="flex flex-col space-y-4">
            <Input
              name="name"
              id="name"
              type="text"
              placeholder="Nome"
              handleInputChange={handleInputChange}
              value={formData.name}
              error={errors.name}
            />
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              handleInputChange={handleInputChange}
              value={formData.email}
              error={errors.email}
            />
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="Senha"
              handleInputChange={handleInputChange}
              value={formData.password}
              error={errors.password}
            />
            <Input
              name="passwordConfirm"
              id="passwordConfirm"
              type="password"
              placeholder="Confirmação de senha"
              handleInputChange={handleInputChange}
              value={formData.passwordConfirm}
              error={errors.passwordConfirm}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-20 h-20 flex items-center justify-center border text-primary border-primary rounded-3xl group hover:bg-primary hover:text-white"
          >
            <i className="fa bg-transparent fa-long-arrow-right group-hover:bg-primary text-2xl " />
          </button>
          {success && (
            <p className="text-green-500 mt-4">{success}</p>
          )}
          {errors.api && (
            <p className="text-red-500 mt-4">{errors.api}</p>
          )}
        </form>
        <Link to="/login">
          <p className="font-montserrat text-text text-xs text-center">
            Já possui uma conta?
          </p>
        </Link>
      </div>
    </main>
  );
}
