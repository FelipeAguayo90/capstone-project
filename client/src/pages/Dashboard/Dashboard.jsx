import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ImSpinner6 } from 'react-icons/im';
import { getStudents } from '../../features/admin/adminSlice';
import { findStd } from '../../features/admin/adminSlice';
import {
  setUsrId,
  openDltModal,
} from '../../features/logoutModal/logoutModalSlice';

const Dashboard = () => {
  const { user } = useSelector((store) => store.user);
  const { courseItems } = useSelector((store) => store.courses);
  const { stndsLoading, students } = useSelector((store) => store.admin);
  const { studentClasses } = useSelector((store) => store.student);
  console.log(user);

  const dispatch = useDispatch();
  const searchRef = useRef();
  console.log(studentClasses);

  if (user.is_admin) {
    useEffect(() => {
      dispatch(getStudents());
    }, []);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchRef.current.value;
    if (!query) {
      return dispatch(getStudents());
    }
    dispatch(getStudents()).then(() => {
      dispatch(findStd(query));
    });
  };

  return (
    <div className="dash-container">
      {user.is_admin ? (
        <>
          <section className="students-course-sec">
            <div className="student-course-bar">
              <h3>students</h3>
              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="student"
                    ref={searchRef}
                    placeholder="Find Student"
                  />
                  <button type="submit" className="button-2">
                    search
                  </button>
                </form>
              </div>
            </div>
          </section>
          <section className="student-sec">
            {stndsLoading ? (
              <div className="spinner-container">
                <ImSpinner6 className="spinner" />
              </div>
            ) : (
              <table>
                <tbody>
                  <tr>
                    <th>username</th>
                    <th>first name</th>
                    <th>last name</th>
                    <th>email</th>
                    <th>telephone</th>
                    <th colSpan={2}>actions</th>
                  </tr>
                  {students.map((student) => {
                    const {
                      user_id,
                      username,
                      first_name,
                      email,
                      telephone,
                      last_name,
                    } = student;
                    return (
                      <tr key={user_id}>
                        <td>{username}</td>
                        <td>{first_name}</td>
                        <td>{last_name}</td>
                        <td>{email}</td>
                        <td>{telephone}</td>
                        <td>
                          <button className="button-2">edit</button>
                        </td>
                        <td>
                          <button
                            className="button-2"
                            onClick={() => {
                              dispatch(setUsrId(user_id));
                              dispatch(openDltModal());
                            }}
                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </section>
        </>
      ) : (
        <>
          <section className="students-course-sec">
            <div className="student-course-bar">
              <h3>schedule</h3>
              <div>
                <form onSubmit={handleSubmit}>
                  {/* <input
                  type="text"
                  name="student"
                  ref={searchRef}
                  placeholder="Find Student"
                />
                <button type="submit" className="button-2">
                  search
                </button> */}
                </form>
              </div>
            </div>
          </section>
          <section className="courses-sec">
            {studentClasses.length < 1 ? (
              <div className="empty">
                <h2>no classes enrolled</h2>
              </div>
            ) : null}
          </section>
        </>
      )}

      <section className="students-course-sec">
        <div className="student-course-bar">
          <h3>courses</h3>
          <div>
            <input type="text" name="student" placeholder="course" />
            <button className="button-2">search</button>
          </div>
        </div>
      </section>
      <section className="courses-sec">
        <table>
          <tbody>
            <tr>
              <th>course</th>
              <th>classroom number</th>
              <th>capacity</th>
              <th>credit hours</th>
              <th>tuition</th>
              <th colSpan={2}>actions</th>
            </tr>
            {courseItems.map((course) => {
              const {
                course_id,
                course_title,
                classroom_number,
                capacity,
                credit_hours,
                tuition_cost,
              } = course;
              return (
                <tr key={course_id}>
                  <td>{course_title}</td>
                  <td>{classroom_number}</td>
                  <td>{capacity}</td>
                  <td>{credit_hours}</td>
                  <td>{tuition_cost}</td>
                  <td>
                    <button className="button-2">add</button>
                  </td>
                  <td>
                    <button className="button-2">drop</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};
export default Dashboard;
