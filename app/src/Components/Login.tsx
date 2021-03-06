import tw, { styled } from 'twin.macro';

type Props = {
  role: string;
  loginUser: () => void;
  password: string;
  setPassword: (password: string) => void;
};

const Login = (props: Props) => {
  if (props.role === 'admin') {
    return (
      <Wrapper>
        <h2>Digify Admin Panel</h2>
        <Input
          placeholder="Password"
          type="password"
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}></Input>
        <Button onClick={() => props.loginUser()}>Login</Button>
      </Wrapper>
    );
  } else
    return (
      <Wrapper>
        <h2>Digify Assessment-Tool</h2>
        <p>
          Let's see how digital your company really is. We will help you to be successfull
          in the digital transformation. Please enter the password to start the assessment
          guide.
        </p>
        <Input
          placeholder="Password"
          type="password"
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}></Input>
        <Button onClick={() => props.loginUser()}>Login</Button>
      </Wrapper>
    );
};

export default Login;

const Wrapper = styled.div`
  ${tw`
    space-y-4 bg-white p-8 rounded-md shadow-2xl
    w-11/12 sm:w-10/12 md:w-6/12 lg:w-4/12 xl:w-3/12 2xl:w-3/12
  `}

  > h2 {
    ${tw`
      mb-6
      font-light text-3xl uppercase
    `}
  }
`;

const Input = styled.input`
  ${tw`
    p-2 w-full
    rounded-md shadow-sm border border-gray-300
  `}
`;

const Button = styled.button`
  ${tw`
    bg-indigo-600 rounded-md py-2 w-full
    font-medium text-lg text-white uppercase
    focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-500
  `}
`;
