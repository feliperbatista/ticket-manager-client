import { useState } from 'react';
import Input from '../components/input';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiURL = process.env.REACT_APP_API_URL;
  const validateForm = (): boolean => {
    const newErrors: { [ket: string]: string } = {};
    if (!formData.password) newErrors.password = 'Informe uma senha';
    if (formData.password !== formData.passwordConfirm)
      newErrors.passwordConfirm = 'Senhas não são iguais';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { token } = useParams<{ token: string }>();

  const resetPassword = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${apiURL}/users/reset-password/${token}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: formData.password,
            passwordConfirm: formData.passwordConfirm,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setFormData({
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

    if (validateForm()) resetPassword();
  };
  return (
    <main
      className="flex items-center justify-center"
      style={{ minHeight: 'calc(100vh - 7rem)' }}
    >
      <div className="w-full max-w-[690px] m-auto sm:mx-auto p-4 border rounded-xl border-primary">
        <h1 className="uppercase mt-8 font-bold text-center text-3xl font-montserrat text-primary">
          redefinir senha
        </h1>
        <form
          onSubmit={handleSubmit}
          className="my-12 mx-auto flex items-center justify-center flex-col space-y-10"
        >
          <div className="flex flex-col space-y-4">
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
          <div className="flex flex-col space-y-4">
            <Input
              name="passwordConfirm"
              id="passwordConfirm"
              type="password"
              placeholder="Confirme a senha"
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
          {errors.api && (
            <p className="text-red-500 mt-4">{errors.api}</p>
          )}
        </form>
      </div>
    </main>
  );
}
