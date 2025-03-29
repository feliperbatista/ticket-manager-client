import { useState } from 'react';
import Input from '../components/input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Cookies from 'js-cookie';

export default function SignIn() {
  const apiURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { setUser } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: { [ket: string]: string } = {};
    if (!formData.email) newErrors.email = 'Informe seu email';
    if (!formData.password) newErrors.password = 'Informe sua senha';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${apiURL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Login com sucesso!');
        setFormData({
          email: '',
          password: '',
        });
        Cookies.set('token', data.token);
        setUser({ token: data.token });
        navigate('/');
      } else {
        setErrors({ api: data.message || 'Ocorreu um erro' });
      }
    } catch (error) {
      setErrors({
        api: 'Ocorreu um erro. Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) login();
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
        <Link to="/help">
          <p className="font-montserrat text-text text-xs text-center">
            Já possui uma conta?
          </p>
        </Link>
        <Link to="/signup">
          <p className="font-montserrat text-text text-xs mt-2 text-center">
            Criar conta
          </p>
        </Link>
      </div>
    </main>
  );
}
