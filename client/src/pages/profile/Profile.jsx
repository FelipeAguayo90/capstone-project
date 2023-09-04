import { useRef } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user, profilePic } = useSelector((store) => store.user);

  const searchRef = useRef();

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="student"
          ref={searchRef}
          placeholder="Find Student"
        />
      </form>
    </section>
  );
};
export default Profile;
