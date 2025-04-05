import { useState } from 'react';
import Input from '../components/input';

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const apiURL = process.env.REACT_APP_API_URL;
  const [success, setSuccess] = useState('');
  const validateForm = (): boolean => {
    const newErrors: { [ket: string]: string } = {};
    if (!formData.email) newErrors.email = 'Informe seu email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const forgotPassword = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${apiURL}/users/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess('Recuperação de senha enviada por email!');
        setFormData({
          email: '',
        });
      } else {
        setErrors({ api: data.message || 'Ocorreu um erro' });
        setSuccess('');
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

    if (validateForm()) forgotPassword();
  };
  return (
    <main
      className="flex items-center justify-center"
      style={{ minHeight: 'calc(100vh - 7rem)' }}
    >
      <div className="w-full max-w-[690px] m-auto sm:mx-auto p-4 border rounded-xl border-primary">
        <h1 className="uppercase mt-8 font-bold text-center text-3xl font-montserrat text-primary">
          recuperar conta
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
      </div>
    </main>
  );
}
