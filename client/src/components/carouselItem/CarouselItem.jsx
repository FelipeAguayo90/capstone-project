import img1 from '../../assets/images/intro-to-computer-science.png';
import img2 from '../../assets/images/advanced-algorithms.png';
import img3 from '../../assets/images/computer-architecture.png';
import img4 from '../../assets/images/data-structures.png';
import img5 from '../../assets/images/networking-and-security.png';

const CarouselItem = ({ course }) => {
  console.log(img5);
  console.log(course.img_address);
  return (
    <div className="carousel-item">
      <div className="img-container">
        <img src={course.img_address} alt="" />
      </div>
      <h5>{course.course_title}</h5>
    </div>
  );
};
export default CarouselItem;
// /Users/felipeaguayo/Desktop/Capstone/client/src/assets/images/networking-and-security.png
