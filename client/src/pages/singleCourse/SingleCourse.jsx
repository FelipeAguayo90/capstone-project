import { Link, useParams } from 'react-router-dom';
import { ImSpinner6 } from 'react-icons/im';
import { useEffect } from 'react';
import { getCourses } from '../../features/courseCard/courseCardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BsChevronLeft } from 'react-icons/bs';
import { classEnroll } from '../../features/user/userSlice';
import { useState } from 'react';
import { getStdClasses } from '../../features/student/studentSlice';

const SingleCourse = () => {
  const [hasClass, setHasClass] = useState(false);
  const { studentClasses } = useSelector((store) => store.student);
  const { user } = useSelector((store) => store.user);
  const { courseItems, isLoading } = useSelector((store) => store.courses);
  const { courseId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStdClasses(user.user_id));
    dispatch(getCourses());
  }, [hasClass]);

  useEffect(() => {
    isClassFull();
    alreadyEnrolled();
  }, [studentClasses]);

  const course = courseItems.find((course) => course.course_id === courseId);

  const {
    capacity,
    subscribers,
    course_id,
    course_title,
    course_description,
    img_address,
    classroom_number,
    tuition_cost,
    credit_hours,
  } = course;

  const alreadyEnrolled = () => {
    const matchedCourse = studentClasses.find(
      (course) => course.course_id === course_id
    );

    if (matchedCourse) {
      setHasClass(true);
    }
  };

  const studentEnroll = (course, student) => {
    dispatch(classEnroll({ course, student })).then(() => {
      dispatch(getStdClasses(user.user_id));
    });
  };

  const isClassFull = () => {
    if (parseInt(capacity) - subscribers === 0) {
      setHasClass(true);
    }
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <ImSpinner6 className="spinner" />
      </div>
    );
  }

  return (
    <section className="single-course">
      <h4>{course.course_title}</h4>
      <div className="img-container">
        <img src={img_address} alt={course_title} />
      </div>
      {user.user && (
        <div className="options">
          <p>classroom: {classroom_number}</p>
          <p>{parseInt(capacity) - subscribers} seats remaining</p>
        </div>
      )}

      <p className="description">{course_description}</p>
      {user.user && (
        <div className="options">
          <p>cost: {tuition_cost}</p>
          <p>credits: {credit_hours}</p>
        </div>
      )}

      <div className="options">
        <Link
          to={
            !user.user
              ? '/courses'
              : user.is_admin
              ? '/admin/courses'
              : '/student/courses'
          }
        >
          <BsChevronLeft /> back to courses
        </Link>
        {user.user ? (
          hasClass ? (
            <button
              disabled
              type="button"
              onClick={() => {
                studentEnroll(course_id, user.user_id);
              }}
              className="button-2"
            >
              enroll
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                studentEnroll(course_id, user.user_id);
              }}
              className="button-2"
            >
              enroll
            </button>
          )
        ) : null}
      </div>
    </section>
  );
};
export default SingleCourse;
