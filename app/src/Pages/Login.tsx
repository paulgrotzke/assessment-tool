import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <h1>Hello and welcome to our assessment tool!</h1>
      <p>Let's see how digital your company really is.</p>
      <p>
        We will help you to be successfull in the digital
        transformation.
      </p>
      <p> Please enter the password to start the assessment guide.</p>
      <input placeholder="Password"></input>
      <Link to="/survey">go to</Link>
    </div>
  );
};

export default Login;
