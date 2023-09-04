import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import img1 from '../../assets/images/advanced-algorithms.png';
import img2 from '../../assets/images/Artificial-Intelligence.png';
import img3 from '../../assets/images/Compiler-Design.png';
import img4 from '../../assets/images/computer-architecture.png';
import img5 from '../../assets/images/Computer-Graphics.png';
import img6 from '../../assets/images/Computer-Networking.png';
import img7 from '../../assets/images/computer-vision.png';
import img8 from '../../assets/images/data-structures.png';
import img9 from '../../assets/images/Database-Design-&-Management.png';
import img10 from '../../assets/images/Database-Design-and-Management.png';
import img11 from '../../assets/images/intro-to-computer-science.png';
import img12 from '../../assets/images/Introduction-to-Information-Systems.png';
import img13 from '../../assets/images/Machine-Learning.png';
import img14 from '../../assets/images/networking-and-security.png';
import img15 from '../../assets/images/Object-Oriented-Programming.png';
import img16 from '../../assets/images/Operating-Systems.png';
import img17 from '../../assets/images/Parallel-Computing.png';
import img18 from '../../assets/images/Software-Engineering.png';
import img19 from '../../assets/images/Software-Testing-&-Verification.png';
import img20 from '../../assets/images/Systems-Analysis-and-Design.png';
import img21 from '../../assets/images/Systems-Programming.png';
import img22 from '../../assets/images/Web-Design-and-Development.png';

const CourseCard = ({ course }) => {
  const { user } = useSelector((store) => store.user);

  return (
    <article className="card">
      <div className="img-card">
        <img src={course.img_address} alt={course.course_title} />
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
