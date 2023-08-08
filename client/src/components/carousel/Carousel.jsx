import { useSelector, useDispatch } from 'react-redux';
import { ImSpinner6 } from 'react-icons/im';
import { useEffect } from 'react';
import { getCarouselItms } from '../../features/carousel/carouselSlice';
import { CarouselItem } from '../carouselItem';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import { nextSlide, prevSlide } from '../../features/carousel/carouselSlice';

const Carousel = () => {
  const dispatch = useDispatch();
  const { isLoading, carouselItems, index } = useSelector(
    (store) => store.carousel
  );
  useEffect(() => {
    dispatch(getCarouselItms());
  }, []);

  useEffect(() => {
    let carousel = setInterval(() => {
      dispatch(nextSlide());
    }, 5000);
    return () => clearInterval(carousel);
  }, [index]);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <ImSpinner6 className="spinner" />
      </div>
    );
  }
  return (
    <section className="carousel-container">
      {carouselItems.map((course, courseIndex) => {
        const { course_id } = course;
        return (
          <CarouselItem
            key={course_id}
            course={course}
            courseIndex={courseIndex}
          />
        );
      })}
      <section className="carousel-btn">
        <button
          className="prev"
          onClick={() => {
            dispatch(prevSlide());
          }}
        >
          <BsChevronLeft className="chevron" />
        </button>
        <button
          className="next"
          onClick={() => {
            dispatch(nextSlide());
          }}
        >
          <BsChevronRight className="chevron" />
        </button>
      </section>
      <div className="title">
        <h3>Affordable education. Hands-on training. Experienced graduates.</h3>
      </div>
    </section>
  );
};
export default Carousel;
