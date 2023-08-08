import img1 from '../../assets/images/intro-to-computer-science.png';
import img2 from '../../assets/images/advanced-algorithms.png';
import img3 from '../../assets/images/computer-architecture.png';
import img4 from '../../assets/images/data-structures.png';
import img5 from '../../assets/images/networking-and-security.png';
import { useSelector } from 'react-redux';

const CarouselItem = ({ course, courseIndex }) => {
  const { index, carouselItems } = useSelector((store) => store.carousel);

  let position = 'next-slide';

  if (courseIndex === index) {
    position = 'active-slide';
  }
  if (
    courseIndex === index - 1 ||
    (index === 0 && courseIndex === carouselItems.length - 1)
  ) {
    position = 'previous-slide';
  }

  return (
    <div className={`carousel-item ${position}`}>
      <div className="img-container">
        <img src={course.img_address} alt={course.course_title} />
      </div>
      <h5>{course.course_title}</h5>
    </div>
  );
};
export default CarouselItem;
// /Users/felipeaguayo/Desktop/Capstone/client/src/assets/images/networking-and-security.png
