import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRegisterDt } from '../../features/formsData/formsDataSlice';

const Register = () => {
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

  console.log(
    isShort,
    hasUpperCs,
    hasLowerCs,
    hasSpclChar,
    invalUsername,
    invalEmail
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setRegisterDt({ name, value }));
  };

  return (
    <section className="form-container">
      <form className="form" /*onSubmit={handleSubmit}*/>
        <h2>register</h2>
        <div className="form-control">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            onChange={handleChange}
          />
          {invalUsername && <small>Username already exists!</small>}
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
          {invalEmail && <small>Username already exists!</small>}
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={handleChange}
          />
          {isShort ? (
            <small>Password is not long enough!</small>
          ) : hasUpperCs ? (
            <small>Password must have one uppercase letter!</small>
          ) : hasLowerCs ? (
            <small>Password must have a lowercase letter!</small>
          ) : hasSpclChar ? (
            <small>Password must have one special character!</small>
          ) : hasNumber ? (
            <small>Password must have one number!</small>
          ) : null}
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
