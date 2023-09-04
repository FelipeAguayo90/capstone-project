import { useSelector, useDispatch } from 'react-redux';
import { ImSpinner6 } from 'react-icons/im';
import { useEffect, useRef } from 'react';
import { getCourses, search } from '../../features/courseCard/courseCardSlice';
import { CourseCard } from '../../components/courseCard';

const Courses = () => {
  const dispatch = useDispatch();
  const { isLoading, courseItems } = useSelector((store) => store.courses);
  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const searchRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchRef.current.value;
    if (!query) {
      return dispatch(getCourses());
    }
    dispatch(getCourses()).then(() => {
      dispatch(search(query));
    });
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <ImSpinner6 className="spinner" />
      </div>
    );
  }

  return (
    <div className="courses-container">
      <h2>checkout our courses!</h2>
      <hr></hr>
      <div className="search-filter">
        <div className="search form-control">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              type="text"
              id="search"
              name="search"
              ref={searchRef}
              placeholder="Search"
            />
          </form>
        </div>
      </div>
      <div className="cards-container">
        {courseItems.map((course, index) => {
          const { course_id } = course;
          return <CourseCard key={course_id} course={course} />;
        })}
      </div>
    </div>
  );
};
export default Courses;
