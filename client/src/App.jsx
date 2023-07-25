import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  HomeLayout,
  Home,
  Admin,
  Login,
  Courses,
  Register,
  Error,
  UserDashboard,
  AdminLayout,
  ProtectedAdminRoute,
  ProtectedStntRoute,
  StudentLayout,
  Student,
} from './pages';
import { useState } from 'react';

function App() {
  const [user, setuser] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="admin"
            element={
              <ProtectedAdminRoute user={user}>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<Admin />} />
          </Route>
          <Route
            path="/student"
            element={
              <ProtectedStntRoute user={user}>
                <StudentLayout />
              </ProtectedStntRoute>
            }
          >
            <Route index element={<Student />} />
            <Route path="/student/dashboard" element={<UserDashboard />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

// // client/src/App.jsx

// import { useState, useEffect } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';

// function App() {
//   const [count, setCount] = useState(0);
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch('/api')
//       .then((res) => res.json())
//       .then((data) => setData(data.message));
//   }, []);

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//           <h1>{!data ? 'Loading...' : data}</h1>
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   );
// }

// export default App;
