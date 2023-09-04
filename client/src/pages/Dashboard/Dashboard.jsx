import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ImSpinner6 } from 'react-icons/im';
import {
  findStd,
  displayItems,
  displayAccnt,
  getUserClasses,
  getStudents,
  updatePagination,
  getSelectedAccntPhoto,
  dropStudent,
} from '../../features/admin/adminSlice';
import {
  setUsrId,
  openDltModal,
} from '../../features/logoutModal/logoutModalSlice';
import { getStdClasses, dropClass } from '../../features/student/studentSlice';
import {
  FaUserEdit,
  FaUserMinus,
  FaUserCircle,
  FaSearch,
} from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';

const Dashboard = () => {
  const { user } = useSelector((store) => store.user);
  const { courseItems } = useSelector((store) => store.courses);
  const {
    stndsLoading,
    stdList,
    currentPage,
    totalPages,
    selectedAccnt,
    selectedStdClasses,
  } = useSelector((store) => store.admin);
  const { studentClasses } = useSelector((store) => store.student);

  const dispatch = useDispatch();
  const searchRef = useRef();

  if (!user.is_admin) {
    useEffect(() => {
      dispatch(getStdClasses(user.user_id));
    }, []);
  }

  if (user.is_admin) {
    useEffect(() => {
      dispatch(getStudents());
    }, [studentClasses]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchRef.current.value;
    if (!query) {
      dispatch(displayItems());
      return dispatch(getStudents());
    }
    dispatch(getStudents()).then(() => {
      dispatch(findStd(query));
    });
  };

  const paginationCntrls = [];
  let totalCredits = 0;
  let totalTuition = 0;

  for (let i = 0; i < totalPages; i++) {
    paginationCntrls.push(i + 1);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    };

    return date.toLocaleString('en-Us', options);
  };

  if (user.is_admin) {
    return (
      <section className="dash-page">
        {stndsLoading ? (
          <div className="spinner-container">
            <ImSpinner6 className="spinner" />
          </div>
        ) : (
          <div className="accounts">
            <section className="search">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="student"
                  ref={searchRef}
                  placeholder="Find User"
                />
              </form>
            </section>
            <hr />
            {stdList.length >= 1 ? (
              <table>
                <tbody>
                  <tr>
                    <th>first name</th>
                    <th>last name</th>
                    <th>username</th>
                    <th>actions</th>
                  </tr>
                  {stdList.map((student) => {
                    const { user_id, first_name, last_name, username } =
                      student;
                    return (
                      <tr
                        key={user_id}
                        onClick={() => {
                          dispatch(displayAccnt(student));
                          dispatch(getSelectedAccntPhoto());
                          dispatch(getUserClasses(user_id));
                        }}
                      >
                        <td>{first_name}</td>
                        <td>{last_name}</td>
                        <td>{username}</td>
                        <td>
                          <Link to={`/admin/update/${user_id}`}>
                            <FaUserEdit />
                          </Link>

                          <FaUserMinus
                            onClick={() => {
                              dispatch(setUsrId(user_id));
                              dispatch(openDltModal());
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="no-users">
                <FaSearch />
                <p>Look up user</p>
              </div>
            )}

            <div className="pagination">
              {stdList.length >= 1 &&
                paginationCntrls.map((item, index) => {
                  return (
                    <a
                      href="#"
                      key={index}
                      onClick={() => {
                        dispatch(updatePagination(item));
                        dispatch(displayItems());
                      }}
                      className={item === currentPage ? 'active-link' : ''}
                    >
                      {item}
                    </a>
                  );
                })}
            </div>
          </div>
        )}
        {selectedAccnt.user_id ? (
          <section className="account-details">
            <div className="personal-info">
              <div className="portrait">
                {selectedAccnt.profile_photo ? (
                  <img src={selectedAccnt.profile_photo} />
                ) : (
                  <FaUserCircle />
                )}

                <p>{`${selectedAccnt.first_name} ${selectedAccnt.last_name}`}</p>
              </div>
              <p>email:</p>
              <p>{selectedAccnt.email}</p>
              <hr />
              <p>phone:</p>
              <p>{selectedAccnt.telephone ? selectedAccnt.telephone : null}</p>
              <hr />
              <p>address:</p>
              <p>{selectedAccnt.street_address}</p>
              <p>
                {selectedAccnt.city &&
                selectedAccnt.state &&
                selectedAccnt.zip_code
                  ? `${selectedAccnt.city}, ${selectedAccnt.state} ${selectedAccnt.zip_code}`
                  : null}
              </p>
              <hr />
              <p>created on:</p>
              <p>{formatDate(selectedAccnt.created_on)}</p>
              <hr />
              <p>last login:</p>
              <p>{formatDate(selectedAccnt.last_login)}</p>
              <hr />
            </div>
            <hr />
            <div className="enrolled-courses">
              {selectedAccnt.is_admin ? (
                <>
                  {selectedStdClasses.length < 1 ? (
                    <p className="opaque">
                      Not leading any instructional sessions
                    </p>
                  ) : (
                    <p>Leading instructional sessions</p>
                  )}
                </>
              ) : (
                <>
                  {selectedStdClasses.length < 1 ? (
                    <p className="opaque">No courses enrolled</p>
                  ) : (
                    <p>Enrolled Courses</p>
                  )}
                </>
              )}
              {selectedStdClasses.length >= 1 && (
                <>
                  <table>
                    <tbody>
                      <tr>
                        <th>course id</th>
                        <th>course title</th>
                        <th>credits</th>
                        <th>classroom number</th>
                        <th>actions</th>
                      </tr>
                      {courseItems.map((course) => {
                        const {
                          course_id,
                          course_title,
                          credit_hours,
                          classroom_number,
                        } = course;
                        return selectedStdClasses.map((stdCourse) => {
                          const { user_id } = selectedAccnt;
                          if (course_id === stdCourse.course_id) {
                            totalCredits += Number(credit_hours);
                            return (
                              <tr key={course_id}>
                                <td>{course_id}</td>
                                <td>{course_title}</td>
                                <td>{credit_hours}</td>
                                <td>{classroom_number}</td>
                                <td>
                                  <FaDeleteLeft
                                    onClick={() => {
                                      dispatch(
                                        dropStudent({ user_id, course_id })
                                      );
                                    }}
                                  />
                                </td>
                              </tr>
                            );
                          }
                        });
                      })}
                    </tbody>
                  </table>
                  <p>total credits: {totalCredits}</p>
                </>
              )}
            </div>
          </section>
        ) : null}
      </section>
    );
  }

  return (
    <section className="student-account">
      <div className="enrolled-courses">
        <h1>enrolled courses</h1>
        {studentClasses.length >= 1 ? (
          <>
            <table>
              <tbody>
                <tr>
                  <th>course id</th>
                  <th>course title</th>
                  <th>credits</th>
                  <th>classroom number</th>
                  <th>tuition</th>
                  <th>actions</th>
                </tr>
                {courseItems.map((course) => {
                  const {
                    course_id,
                    course_title,
                    credit_hours,
                    classroom_number,
                    tuition_cost,
                  } = course;
                  const numericValue = parseInt(
                    tuition_cost.replace(/[$,]/g, ''),
                    10
                  );

                  return studentClasses.map((stdCourse) => {
                    const { user_id } = user;

                    if (course_id === stdCourse.course_id) {
                      totalTuition += numericValue;
                      return (
                        <tr key={course_id}>
                          <td>{course_id}</td>
                          <td>{course_title}</td>
                          <td>{credit_hours}</td>
                          <td>{classroom_number}</td>
                          <td>{tuition_cost}</td>
                          <td>
                            <FaDeleteLeft
                              onClick={() => {
                                dispatch(dropClass({ user_id, course_id }));
                              }}
                            />
                          </td>
                        </tr>
                      );
                    }
                  });
                })}
              </tbody>
            </table>
            <p>Tuition: {`$${totalTuition.toLocaleString()}`}</p>
          </>
        ) : (
          <p className="opaque">No courses enrolled</p>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
