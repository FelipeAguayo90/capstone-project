import { Link, useParams } from 'react-router-dom';
import { ImSpinner6 } from 'react-icons/im';
import { useEffect } from 'react';
import { getCourses } from '../../features/courseCard/courseCardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BsChevronLeft } from 'react-icons/bs';

const SingleCourse = () => {
  const dispatch = useDispatch();
  const { courseItems, isLoading } = useSelector((store) => store.courses);
  const { courseId } = useParams();

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const course = courseItems.find((course) => course.course_id === courseId);

  const { course_title, course_description, img_address } = course;

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
      <p>{course_description}</p>
      <Link to="/courses">
        <BsChevronLeft /> back to courses
      </Link>
    </section>
  );
};
export default SingleCourse;
