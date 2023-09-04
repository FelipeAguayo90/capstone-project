import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { setLoginDt } from '../../features/formsData/formsDataSlice';
import { Link } from 'react-router-dom';
import img1 from '../../assets/images/MTEC-1.png';

const Login = () => {
  const dispatch = useDispatch();
  const { invalCredentials } = useSelector((store) => store.user);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setLoginDt({ name, value }));
  };
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <form
        className="form"
        onSubmit={async (e) => {
          try {
            e.preventDefault();
            const data = await dispatch(getUser());

            const { is_admin } = data.payload.user;

            if (is_admin) {
              return navigate('/admin/dashboard');
            }
            return navigate('/student/dashboard');
          } catch (error) {
            console.log('Something went wrong');
          }
        }}
      >
        <h2>MTEC</h2>
        <div className="form-control">
          <label htmlFor="username">username:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            required
          />
        </div>
        {invalCredentials && (
          <ul>
            <li>The user name or password provided is incorrect.</li>
          </ul>
        )}
        <div className="btn-container">
          <button className="button-3" type="submit">
            login
          </button>
        </div>
        <Link to="/register">register today</Link>
      </form>
    </div>
  );
};

export default Login;
