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

            const { is_admin } = data.payload;
            if (is_admin) {
              return navigate('/admin/');
            }
            return navigate('/student/');
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

// const handleLogin = async (e, formData) => {
//   e.preventDefault();
//   const { username, password } = formData;

//   if (username && password) {
//     try {
//       const users = await fetch('api/v1/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: username,
//           password: password,
//         }),
//       });
//       const data = await users.json();
//       const { email, first_name, is_admin, last_login, user_id, user } = data;
//       localStorage.setItem('Authorization', data.token);

//       console.log(data);
//       dispatch(loginSuccess(data));
//       console.log('error');
//       if (is_admin) {
//         return navigate('/admin/dashboard');
//       }
//       return navigate('/student/dashboard');
//     } catch {
//       console.log(error);
//       // alert('Invalid username or password');
//     }
//   }
// };

//  <div className="login-container">
//    <form
//      className="login-form"
//      // action="/api/v1/login"
//      // method="POST"
//      // name="login"
//      onSubmit={(e) => handleLogin(e, formData)}
//    >
//      <h2>MTECH</h2>
//      <div className="form-control">
//        <label htmlFor="username">username</label>
//        <input
//          type="text"
//          id="username"
//          name="username"
//          // placeholder="username"
//          value={formData.username}
//          onChange={handleChange}
//          required
//        />
//      </div>
//      <div className="form-control">
//        <label htmlFor="password">password</label>
//        <input
//          type="password"
//          name="password"
//          id="password"
//          // placeholder="password"
//          value={formData.password}
//          onChange={handleChange}
//          required
//        />
//      </div>
//      <small className="form-alert"></small>
//      <button
//        className="button-3"
//        type="submit"
//        // onClick={}
//      >
//        login
//      </button>
//    </form>
//  </div>;
