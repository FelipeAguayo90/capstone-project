import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '../../features/logoutModal/logoutModalSlice';
import { logout } from '../../features/user/userSlice';

const LogoutModal = ({ children }) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((store) => store.logoutModal);
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h4>Are you sure you want to sign out?</h4>
        <div>
          <button
            className="button-3"
            onClick={() => {
              dispatch(closeModal());
              dispatch(logout());
              navigate('/login');
            }}
          >
            confirm
          </button>
          <button
            className="button-3"
            onClick={() => {
              return dispatch(closeModal());
            }}
          >
            cancel
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
export default LogoutModal;

//  <div className="modal-overlay">
//    <div className="modal">
//      <h4>Are you sure you want to sign out?</h4>
//      <button className="close-button" onClick={onClose}>
//        confirm
//      </button>
//      <button className="close-button" onClick={onClose}>
//        cancel
//      </button>
//      {children}
//    </div>
//  </div>;
