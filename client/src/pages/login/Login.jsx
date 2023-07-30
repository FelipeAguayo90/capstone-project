import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  const handleLogin = async (e, formData) => {
    e.preventDefault();
    const { username, password } = formData;

    if (username && password) {
      try {
        const user = await fetch('api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        const data = await user.json();
        const { email, first_name, is_admin, last_login, user_id } = data;
        localStorage.setItem('Authorization', data.token);
        dispatch(loginSuccess(data));
        if (is_admin) {
          return navigate('/admin');
        }
        return navigate('/student');
      } catch {
        // console.log(error);
        alert('Invalid username or password');
      }
    }
  };

  return (
    <div className="login-container">
      <form
        className="login-form"
        // action="/api/v1/login"
        // method="POST"
        // name="login"
        onSubmit={(e) => handleLogin(e, formData)}
      >
        <h2>MTECH</h2>
        <div className="form-control">
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            name="username"
            // placeholder="username"
            value={formData.username}
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
            // placeholder="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <small className="form-alert"></small>
        <button
          className="button-3"
          type="submit"
          // onClick={}
        >
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
