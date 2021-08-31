import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required('Fullname is required'),
  username: Yup.string()
    .required('Username is required')
    .min(6, 'Username must be at least 6 characters')
    .max(20, 'Username must not exceed 20 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Password does not match'),
  acceptTerms: Yup.bool().oneOf([true], 'Confirm you have read and understood the terms and conditions')
});
const onSubmit = data => console.log(data);

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  return (
    <div className="p-20">
      <div className="text-6xl p-10 text-blue-500">Form Test</div>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="grid grid-cols-1 px-20 items-center justify-center gap-5">
          <label className=" mr-4" htmlFor="fullname">Full Name:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"{...register("fullname")} />
          <p className="text-red-500 text-opacity-75">{errors.fullname?.message}</p>
          <label className=" mr-4" htmlFor="username">User Name:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" {...register("username")} />
          <p className="text-red-500 text-opacity-75">{errors.username?.message}</p>
          <label className=" mr-4" htmlFor="email">Email:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"{...register("email")} />
          <p className="text-red-500 text-opacity-75">{errors.email?.message}</p>
          <label className=" mr-4" htmlFor="password">Password:</label>
          <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"{...register("password")} />
          <p className="text-red-500 text-opacity-75">{errors.password?.message}</p>
          <label className=" mr-4" htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"{...register("confirmPassword")} />
          <p className="text-red-500 text-opacity-75">{errors.confirmPassword?.message}</p>
          <label className=" mr-4" htmlFor="acceptTerms">Accept Terms:</label>
          <input type="checkbox" {...register("acceptTerms")} />
          <p className="text-red-500 text-opacity-75">{errors.acceptTerms?.message}</p>
          <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" />

        </div>

      </form>

    </div>
  );
};
