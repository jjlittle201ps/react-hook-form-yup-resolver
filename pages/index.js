import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

// Yup.string/number/date/bool sets the returned type. so if you input 123 into a .string() field it will return "123"

// .required() will return the default error message but you can add "Whatever you need" in the () and it will use that as the error message.

// You can chain together different validations to really customise your validation needs.

// So .number() .required() .min(3) .max(5) .typeError() will REQUIRE a NUMBER between (3) and (5) and if the wrong TYPE ie. a string you will recive a error message.

// you can also use .matches() combined with RegEx to make strict custom validations such as .matches(/^.*(?=.{8,})(?=.*\d)((?=.*[.]){1})((?=.*[A-Z]){2}).*$/) 
// will need an input of 8 character with the first 5 needing to be a number then a . and then followed by 2 capital letters.

// fullname: Yup.string()
//     .required('Fullname is required'),

const validationSchema = Yup.object().shape({

  date: Yup.date()
    .required('Date Required')
    .nullable()
    .default(undefined)
    .typeError('Invalid Date'),

  endDate: Yup.date()
    .min(Yup.ref("date"), "Must be later than start date")
    .nullable()
    .required("End date must be selected")
    .typeError('Invalid Date'),

  select: Yup.string()
    .required('A selection is required'),

  radio: Yup.string()
    .nullable()
    .required('A selection is required'),

  mobPhone: Yup.number()
    .required("Phone number is required")
    .min(8, "Needs to be at least 8 digits")
    .max(12, "Max of 12 digits")
    .typeError('Phone number nust be a number'),

  invoice: Yup.string()
    .required("Invoice number is required")
    .min(5, "Needs to be at least 5 Characters"),

  strictInvoice: Yup.string()
    .required("invoice is required")
    .matches(/^.*(?=.{8,})(?=.*\d{5})((?=.*[.]){1})((?=.*[A-Z]){2}).*$/,
      "Must follow format of 12345.SD")
    .max(8, "Max length of 8"),

  fullname: Yup.string()
    .required('Fullname is required'),

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

  acceptTerms: Yup.bool()
    .oneOf([true], 'Confirm you have read and understood the terms and conditions'),

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

          {/* Full Name */}
          <label className=" mr-4" htmlFor="fullname">Full Name:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"{...register("fullname")} />
          <p className="text-red-500 text-opacity-75">{errors.fullname?.message}</p>

          {/* UserName */}
          <label className=" mr-4" htmlFor="username">User Name:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" {...register("username")} />
          <p className="text-red-500 text-opacity-75">{errors.username?.message}</p>

          {/* Email */}
          <label className=" mr-4" htmlFor="email">Email:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"{...register("email")} />
          <p className="text-red-500 text-opacity-75">{errors.email?.message}</p>

          {/* Password */}
          <label className=" mr-4" htmlFor="password">Password:</label>
          <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"{...register("password")} />
          <p className="text-red-500 text-opacity-75">{errors.password?.message}</p>

          {/* Confirm Password*/}
          <label className=" mr-4" htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"{...register("confirmPassword")} />
          <p className="text-red-500 text-opacity-75">{errors.confirmPassword?.message}</p>

          {/* Accept Terms*/}
          <label className=" mr-4" htmlFor="acceptTerms">Accept Terms:</label>
          <input type="checkbox" {...register("acceptTerms")} />
          <p className="text-red-500 text-opacity-75">{errors.acceptTerms?.message}</p>

          {/* Select */}
          <label className=" mr-4" htmlFor="select">Select:</label>
          <div class="relative inline-block w-full text-gray-700">
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"{...register("select")}>
              <option value="">Select...</option>
              <option value="Company One">Company One</option>
              <option value="Company Two">Company Two</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
            </div>
          </div>
          <p className="text-red-500 text-opacity-75">{errors.select?.message}</p>

          {/* Radio */}
          <label className=" mr-4" htmlFor="radio">Radio:</label>
          <label>
            <input type="radio" {...register("radio")} name="radio" value="yes" />{" "}
            Yes
          </label>
          <label>
            <input type="radio" {...register("radio")} name="radio" value="no" />{" "}
            No
          </label>
          <p className="text-red-500 text-opacity-75">{errors.radio?.message}</p>

          {/* Start Date */}
          <label className=" mr-4" htmlFor="date">Start Date:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date"
            name="date"
            defaultValue={undefined}
            {...register("date")}
          ></input>
          <p className="text-red-500 text-opacity-75">{errors.date?.message}</p>

          {/* End Date */}
          <label className=" mr-4" htmlFor="endDate">End Date:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date"
            name="endDate"
            defaultValue={undefined}
            {...register("endDate")}
          ></input>
          <p className="text-red-500 text-opacity-75">{errors.endDate?.message}</p>

          {/* Phone Number */}
          <label className=" mr-4" htmlFor="mobPhone">Phone Number:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="mobPhone"
            {...register("mobPhone")}
          ></input>
          <p className="text-red-500 text-opacity-75">{errors.mobPhone?.message}</p>

          {/* Invoice Number */}
          <label className=" mr-4" htmlFor="invoice">Invoice Number:</label>
          <label className="flex items-center ">
            INV-
            <input placeholder="Normal invoice" className="ml-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("invoice")} name="invoice" ></input>
          </label>
          <p className="text-red-500 text-opacity-75">{errors.invoice?.message}</p>
          <label className="flex items-center ">
            INV-
            <input placeholder="Strict invoice" className=" ml-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("strictInvoice")} name="strictInvoice" ></input>
          </label>
          <p className="text-red-500 text-opacity-75">{errors.strictInvoice?.message}</p>
          <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" />
        </div>
      </form>
    </div >
  );
};
