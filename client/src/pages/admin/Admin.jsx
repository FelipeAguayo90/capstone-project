import { useSelector } from 'react-redux';

const Admin = () => {
  const { user } = useSelector((store) => store.user);
  console.log(user);
  return (
    <section>
      <h1></h1>
    </section>
  );
};
export default Admin;
