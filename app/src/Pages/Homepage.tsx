import { Route, Link } from 'react-router-dom';

function Homepage() {
  return (
    <Route path="/">
      <div>Homepage</div>
      <Link to="/survey">go to Survey</Link>
      <Link to="/login">go to Login</Link>
    </Route>
  );
}

export default Homepage;
