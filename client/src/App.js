import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import './App.css';
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/common/Footer";
import Category from "./pages/Category";
import CourseDetails from "./pages/CourseDetails";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      {/* <div className="w-11/12 mx-auto overflow-hidden"> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalog/:catalog_name' element={<Category />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/courses/:course_id" element={<CourseDetails />} />
      </Routes>

      {/* </div> */}
      <Footer />
    </div>

  );
}

export default App;
