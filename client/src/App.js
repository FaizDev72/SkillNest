import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import './App.css';
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Category from "./pages/Category";
import CourseDetails from "./pages/CourseDetails";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/contants";
import Error from "./pages/Error";
import MyProfile from './components/core/Dashboard/MyProfile'
import Settings from './components/core/Dashboard/Settings'
import Instructor from './components/core/Dashboard/Instructor'
import MyCourses from './components/core/Dashboard/MyCourses'
import AddCourse from './components/core/Dashboard/AddCourse'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import EditCourse from "./components/core/Dashboard/EditCourse";
import Cart from "./components/core/Dashboard/Cart";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";

function App() {
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter overflow-hidden">
      <Navbar />
      {/* <div className="w-11/12 mx-auto overflow-hidden"> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalog/:catalog_name' element={<Category />} />

        <Route path="/login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        } />
        <Route path="/signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        } />
        <Route path="/verify-email" element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        } />
        <Route path="/forgot-password" element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        } />
        <Route path="/update-password/:token" element={
          <PrivateRoute>
            <UpdatePassword />
          </PrivateRoute>
        } />

        <Route element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>

          {/* for all users */}
          <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>
          <Route path="dashboard/settings" element={<Settings />} />

          {/* ROUTE ONLY FOR INSTRUCTOR */}
          {user?.account_type === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route
                path="dashboard/edit-course/:course_id"
                element={<EditCourse />}
              />
            </>
          )}

          {/* ROUTE ONLY FOR  STUDENTS */}
          {
            user?.account_type === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                <Route path="dashboard/cart" element={<Cart />} />
              </>
            )
          }
        </Route>
        <Route path="/courses/:course_id" element={<CourseDetails />} />

        {/* For watching video lectures */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {
            user?.account_type === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="view-course/:course_id/section/:section_id/sub-section/:sub_section_id"
                  element={<VideoDetails />}
                />
              </>
            )
          }
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>

  );
}

export default App;
