import { useSelector, useDispatch } from 'react-redux';

import { useState, useRef } from 'react';
import { updateAccntInfo } from '../../features/formsData/formsDataSlice';
import { FileUpload } from '../../components/uploadfile';
import { updateUser } from '../../features/user/userSlice';

const Account = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [data, setData] = useState(user);

  const [isFocused, setIsFocused] = useState(false);
  const {
    isShort,
    hasUpperCs,
    hasLowerCs,
    hasSpclChar,
    invalUsername,
    invalEmail,
    hasNumber,
  } = useSelector((store) => store.register);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(updateUser(user.user_id));
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    dispatch(updateAccntInfo({ name, value }));
  };

  return (
    <section className="account-container">
      <form
        className="account-info"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h2>account info</h2>
        <hr></hr>

        <div className="form-group">
          <div className="form-control">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={data.username}
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
              id="first_name"
              name="first_name"
              value={data.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="last_name"
              value={data.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
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
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {isFocused && (
              <ul>
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
              value={data.telephone}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="street">street address or p.o. box:</label>
            <input
              type="text"
              id="street"
              name="street_address"
              value={data.street_address}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="city">city:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={data.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="zipCode">ZIP code:</label>
            <input
              type="number"
              id="zip_code"
              name="zip_code"
              value={data.zip_code}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="state">state:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={data.state}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="country">country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={data.country}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="btn-container">
          <button className="button-3" type="submit">
            update
          </button>
        </div>
      </form>
      <FileUpload />
    </section>
  );
};
export default Account;
