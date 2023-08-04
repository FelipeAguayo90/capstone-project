import { useSelector, useDispatch } from 'react-redux';
import { ImSpinner6 } from 'react-icons/im';
import { useEffect } from 'react';
import { getCarouselItms } from '../../features/carousel/carouselSlice';
import { CarouselItem } from '../carouselItem';

const Carousel = () => {
  const dispatch = useDispatch();
  const { isLoading, carouselItems } = useSelector((store) => store.carousel);
  useEffect(() => {
    dispatch(getCarouselItms());
  }, []);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <ImSpinner6 className="spinner" />
      </div>
    );
  }
  return (
    <section className="carousel-container">
      {carouselItems.map((course) => {
        const { course_id } = course;
        return <CarouselItem key={course_id} course={course} />;
      })}
      <div className="title">
        <h3>Affordable education. Hands-on training. Experienced graduates.</h3>
      </div>
    </section>
  );
};
export default Carousel;
