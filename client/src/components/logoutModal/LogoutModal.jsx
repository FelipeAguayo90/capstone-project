import { useSelector, useDispatch } from 'react-redux';
import {
  openModal,
  closeModal,
} from '../../features/logoutModal/logoutModalSlice';

const LogoutModal = ({ children }) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((store) => store.logoutModal);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h4>Are you sure you want to sign out?</h4>
        <div>
          <button className="close-button">confirm</button>
          <button
            className="open-button"
            onClick={() => {
              dispatch(closeModal());
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
