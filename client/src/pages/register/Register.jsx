import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRegisterDt } from '../../features/formsData/formsDataSlice';
import {
  registerUser,
  dsplLowerCsMsg,
  dsplHasNum,
  dsplSpclCharMsg,
  dsplUpperCsMsg,
  dsplShortMsg,
} from '../../features/register/registerSlice';
import { setUser } from '../../features/user/userSlice';
import { useState } from 'react';

const Register = () => {
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isShort,
    hasUpperCs,
    hasLowerCs,
    hasSpclChar,
    invalUsername,
    invalEmail,
    hasNumber,
  } = useSelector((store) => store.register);
  const { password } = useSelector((store) => store.formsData.registerForm);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const phoneFormat = (e) => {
    console.log(e.current.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lowerCs = /(?=.*[a-z])/;
    const upperCs = /^(?=.*[A-Z]).+$/;
    const spclChar = /(?=.*[!@#$%^&*()\-_=+{};:,<.>/?[\]\\|])/;
    const num = /(?=.*\d)/;
    if (password.length < 8) {
      return dispatch(dsplShortMsg());
    }
    if (!lowerCs.test(password)) {
      return dispatch(dsplLowerCsMsg());
    }
    if (!upperCs.test(password)) {
      return dispatch(dsplUpperCsMsg());
    }
    if (!spclChar.test(password)) {
      return dispatch(dsplSpclCharMsg());
    }
    if (!num.test(password)) {
      return dispatch(dsplHasNum());
    }

    try {
      const data = await dispatch(registerUser());
      const { is_admin } = data.payload.user;

      dispatch(setUser(data.payload));
      if (data.payload.msg.name !== 'error') {
        if (is_admin) {
          return navigate('/admin/dashboard');
        }
        return navigate('/student/dashboard');
      }
    } catch (error) {
      console.log('something went wrong');
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    dispatch(setRegisterDt({ name, value }));
  };

  return (
    <section className="form-container">
      <form
        className="form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h2>register</h2>
        <div className="form-group">
          <div className="form-control">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              onChange={handleChange}
            />
            {invalUsername && (
              <ul className="warning">
                <li>Username already exists!</li>
              </ul>
            )}
          </div>
          <div className="form-control">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={handleChange}
            />
            {invalEmail && (
              <ul className="warning">
                <li>Email already exists!</li>
              </ul>
            )}
          </div>
          <div className="form-control">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {isFocused && (
              <ul className="guidelines">
                <li>Password must be at least 8 characters long.</li>
                <li>Password must have one uppercase letter.</li>
                <li>Password must have one special character.</li>
                <li>Password must have a lowercase letter.</li>
                <li>Password must have one number.</li>
              </ul>
            )}
            {isShort ? (
              <ul className="warning">
                <li>Password must be at least 8 characters long.</li>
              </ul>
            ) : hasUpperCs ? (
              <ul className="warning">
                <li>Password must have one uppercase letter.</li>
              </ul>
            ) : hasLowerCs ? (
              <ul className="warning">
                <li>Password must have a lowercase letter.</li>
              </ul>
            ) : hasSpclChar ? (
              <ul className="warning">
                <li>Password must have one special character.</li>
              </ul>
            ) : hasNumber ? (
              <ul className="warning">
                <li>Password must have one number.</li>
              </ul>
            ) : null}
          </div>
          <div className="form-control">
            <label htmlFor="telephone">Telephone:</label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              required
              onChange={(phoneFormat, handleChange)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="street">street address or p.o. box:</label>
            <input
              type="text"
              id="street"
              name="street"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="city">city:</label>
            <input
              type="text"
              id="city"
              name="city"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="zipCode">ZIP code:</label>
            <input
              type="number"
              id="zipCode"
              name="zipCode"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="state">state:</label>
            <input
              type="text"
              id="state"
              name="state"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="country">country:</label>
            <input
              type="text"
              id="country"
              name="country"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="btn-container">
          <button className="button-3" type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};
export default Register;
