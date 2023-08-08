import { useDispatch } from 'react-redux';
import { getUser } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { setLoginDt } from '../../features/formsData/formsDataSlice';

const Login = () => {
  const dispatch = useDispatch();

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
            console.log(data);
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
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            required
          />
        </div>
        <small className="form-alert"></small>
        <div className="btn-container">
          <button className="button-3" type="submit">
            login
          </button>
        </div>
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
