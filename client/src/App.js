import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import './App.css';
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      {/* <div className="w-11/12 mx-auto overflow-hidden"> */}
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/catalog' element={<Home/>}/>
      <Route path='/about' element={<Home/>}/>
      <Route path='/contact' element={<Home/>}/> */}

      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      </Routes>

      {/* </div> */}
    </div>

  );
}

export default App;
