import { auth } from '../lib/firebase';

const Layout = ({children}) => {
  // const user = auth.currentUser;

  return (
    <div>
      {/* <p>{user}</p> */}
      <span>Logout</span>
    </div>
  );
};

export default Layout;
