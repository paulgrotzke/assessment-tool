import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import Login from './Login';

type Props = {
  children: React.ReactNode;
  role: string;
};

const AuthCheck = (props: Props) => {
  const [user] = useAuthState(auth);
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    await auth.signOut();
    await auth.signInWithEmailAndPassword(
      props.role + '@user.de',
      password,
    );
  };

  if (
    props.role === 'admin' &&
    user?.uid === 'wdvVEGjFqJODyhG8t94EBUK89yN2'
  ) {
    return <>{props.children}</>;
  }

  if (
    props.role === 'user' &&
    user?.uid === '1bqjrjvEsaZxlrPh4cs3cqaN6ad2'
  ) {
    return <>{props.children}</>;
  } else {
    return (
      <Login
        role={props.role}
        loginUser={loginUser}
        password={password}
        setPassword={setPassword}
      />
    );
  }
};

export default AuthCheck;
