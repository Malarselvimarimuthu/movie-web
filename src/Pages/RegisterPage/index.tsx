import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/blurry-developing-photos-darkroom.jpg';

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

const initialValues: RegisterValues = {
  name: '',
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const RegisterForm: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<RegisterValues[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (values: RegisterValues) => {
    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        mode: 'cors',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registered User:', data);
        setSubmittedData([...submittedData, values]);
        formik.resetForm();
        setError(null);
        alert('Registration successful');
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.error('Registration error:', errorData.message);
        setError(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An unexpected error occurred');
    }
  };

  const formik = useFormik<RegisterValues>({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4 text-center">Register</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div>
          <label className="block mb-2 text-sm font-bold" htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="border border-gray-300 p-2 w-full rounded mb-4"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-600">{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label className="block mb-2 text-sm font-bold" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="border border-gray-300 p-2 w-full rounded mb-4"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600">{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label className="block mb-2 text-sm font-bold" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="border border-gray-300 p-2 w-full rounded mb-4"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-600">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-gray-800">Register</button>
        <div className="mt-4 text-center">
          <span className="text-sm"><a href="/login" className="text-blue-600 hover:underline">Already have an account? Login</a></span>
        </div>
      </form>
    </div>
    </div>
  );
};

export default RegisterForm;
