import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import img1 from '../../assets/images/advanced-algorithms.png';

const CourseCard = ({ course }) => {
  const { user } = useSelector((store) => store.user);
  // console.log(img1);
  return (
    <article className="card">
      <div className="img-card">
        <img src={img1} alt={course.course_title} />
      </div>
      <div className="course-name">
        <Link
          to={
            !user.user
              ? `/courses/${course.course_id}`
              : user.is_admin
              ? `/admin/course/${course.course_id}`
              : `/student/course/${course.course_id}`
          }
        >
          {course.course_title}
        </Link>
      </div>
    </article>
  );
};
export default CourseCard;
