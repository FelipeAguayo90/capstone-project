import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  HomeLayout,
  Home,
  Admin,
  Login,
  Courses,
  Register,
  Error,
  Dashboard,
  AdminLayout,
  ProtectedAdminRoute,
  ProtectedStntRoute,
  StudentLayout,
  Student,
  Account,
  SingleCourse,
  UpdateUser,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:courseId" element={<SingleCourse />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<Admin />} />
            <Route path="/admin/courses" element={<Courses />} />
            <Route path="/admin/course/:courseId" element={<SingleCourse />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/account" element={<Account />} />
            <Route path="/admin/update/:userId" element={<UpdateUser />} />
          </Route>
          <Route
            path="/student"
            element={
              <ProtectedStntRoute>
                <StudentLayout />
              </ProtectedStntRoute>
            }
          >
            <Route index element={<Student />} />
            <Route path="/student/courses" element={<Courses />} />
            <Route
              path="/student/course/:courseId"
              element={<SingleCourse />}
            />
            <Route path="/student/dashboard" element={<Dashboard />} />
            <Route path="/student/account" element={<Account />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
