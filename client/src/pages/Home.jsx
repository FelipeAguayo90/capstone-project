import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';

function Home() {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
}
export default Home;
