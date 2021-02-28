type Props = {
  role: string;
  loginUser: () => void;
  password: string;
  setPassword: (password: string) => void;
};

const Login = (props: Props) => {
  if (props.role === 'admin') {
    return (
      <div>
        <div>
          <h2>Login to Admin Panel</h2>
          <input
            placeholder="Password"
            type="password"
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}></input>
          <button onClick={() => props.loginUser()}>Login</button>
        </div>
      </div>
    );
  } else
    return (
      <div>
        <div>
          <h2>Login to survey</h2>
          <h4>Hello and welcome to our assessment tool!</h4>
          <p>
            Let's see how digital your company really is. We will help you to be
            successfull in the digital transformation. Please enter the password to start
            the assessment guide.
          </p>
          <input
            placeholder="Password"
            type="password"
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}></input>
          <button onClick={() => props.loginUser()}>Login</button>
        </div>
      </div>
    );
};

export default Login;
