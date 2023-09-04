import { useSelector, useDispatch } from 'react-redux';
import { closeDltModal } from '../../features/logoutModal/logoutModalSlice';
import { dltStudent, getStudents } from '../../features/admin/adminSlice';

const DltStdModal = ({ children }) => {
  const dispatch = useDispatch();
  const { isDltOpen, userId } = useSelector((store) => store.logoutModal);

  if (!isDltOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h4>Are you sure you want to delete student?</h4>
        <div>
          <button
            className="button-3"
            onClick={() => {
              dispatch(dltStudent(userId))
                .then(() => {
                  dispatch(getStudents());
                })
                .catch((error) => {
                  console.log(error);
                });
              dispatch(closeDltModal());
            }}
          >
            confirm
          </button>
          <button
            className="button-3"
            onClick={() => {
              return dispatch(closeDltModal());
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
export default DltStdModal;
