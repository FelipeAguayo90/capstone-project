import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <section>
      <h3>404</h3>
      <p>page not found!</p>
      <Link to="/">return to home page</Link>
    </section>
  );
};
export default Error;
