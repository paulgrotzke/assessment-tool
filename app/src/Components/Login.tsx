import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  role: string;
  loginUser: () => void;
  password: string;
  setPassword: (password: string) => void;
};

const Login = (props: Props) => {
  if (props.role === 'admin') {
    return (
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="m-5 mt-6 text-3xl font-extrabold text-center text-gray-900">
            Login to Admin Panel
          </h2>
          <input
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Password"
            type="password"
            value={props.password}
            onChange={(e) =>
              props.setPassword(e.target.value)
            }></input>
          <button
            className="relative block mt-5 justify-center w-full px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md mt-50 group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => props.loginUser()}>
            Login
          </button>
        </div>
      </div>
    );
  } else
    return (
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold  text-gray-900">
            Login to survey
          </h2>
          <h4 className="mt-6 text-xl font-semibold text-gray-900">
            Hello and welcome to our assessment tool!
          </h4>
          <p className="my-6 text-xl text-gray-900">
            Let's see how digital your company really is. We will help
            you to be successfull in the digital transformation.
            Please enter the password to start the assessment guide.
          </p>
          <input
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Password"
            type="password"
            value={props.password}
            onChange={(e) =>
              props.setPassword(e.target.value)
            }></input>
          <button
            className="relative block mt-5 justify-center w-full px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md mt-50 group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => props.loginUser()}>
            Login
          </button>
        </div>
      </div>
    );
};

export default Login;
