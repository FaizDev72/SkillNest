import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const location = useLocation();
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { totalItems } = useSelector((state) => state.cart)

    function matchRoute(route) {
        return matchPath({ path: route }, location.pathname)
    }

    return (
        <div className='border-b-2 border-richblack-700'>
            <div className='w-11/12 max-w-maxContent mx-auto flex items-center justify-between py-4'>
                <Link to="/"> <img src={logo} alt="studyNotion.logo" width={160} height={42} loading="lazy" /></Link>
                <ul className='text-richblack-300 flex items-center justify-center gap-6'>
                    {
                        NavbarLinks.map((ele, index) => (
                            ele.title === 'Catalog' ?
                                (<div></div>) :
                                (<li key={index}>
                                    <Link to={ele.path} className={`${matchRoute(ele?.path) ? "text-yellow-5" : "text-richblack-25"}`}>{ele.title}</Link>
                                </li>)
                        ))
                    }
                </ul>
                {/* Login/Signup/Dashboard */}
                <div className='text-white flex items-center justify-center gap-3'>
                    {
                        (token === null) && (
                            <div className=' flex items-center justify-center gap-6'>
                                <Link to={"/login"}>
                                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                        Login
                                    </button>
                                </Link>
                                <Link to={"/signup"}>
                                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        )
                    }{
                        (user && user != null) && (
                            <div>Profile</div>
                        )
                    }{
                        (user != null && user?.account_type != 'Instructor') && (
                            <div>{totalItems}</div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
