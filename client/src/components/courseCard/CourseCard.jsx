import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <article className="card">
      <div className="img-card">
        <img src={course.img_address} alt={course.course_title} />
      </div>
      <div className="course-name">
        <Link to={`/courses/${course.course_id}`}>{course.course_title}</Link>
      </div>
    </article>
  );
};
export default CourseCard;
