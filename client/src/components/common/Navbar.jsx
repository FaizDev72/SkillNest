import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { IoIosArrowDown } from "react-icons/io";
import { apiConnector } from '../../services/apiConnector'
import { categoriesApi } from '../../services/apis'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
    const location = useLocation();
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { totalItems } = useSelector((state) => state.cart)
    const [subLinks, setSubLinks] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await apiConnector("GET", categoriesApi.GETALLCATEGORIES_API);
            setSubLinks(response.data.data)
            // console.log(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    function matchRoute(route) {
        return matchPath({ path: route }, location.pathname)
    }

    return (
        <div className='border-b-2 border-richblack-700'>
            <div className='w-11/12 max-w-maxContent mx-auto flex items-center justify-between py-3'>
                <Link to="/"> <img src={logo} alt="studyNotion.logo" width={160} height={42} loading="lazy" /></Link>
                <ul className='text-richblack-300 flex items-center justify-center gap-6 h-full'>
                    {
                        NavbarLinks.map((ele, index) => (
                            ele.title === 'Catalog' ?
                                (<li key={index} className='group relative'>
                                    <div className='flex items-center justify-center gap-1 text-richblack-25 cursor-pointer'>
                                        <p className={`${matchRoute(ele?.path) ? "text-yellow-5" : "text-richblack-25"}`}>{ele.title}</p>
                                        <IoIosArrowDown />
                                    </div>
                                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                        {
                                            subLinks.map((catg, index) => (
                                                <Link to={`catalog/${catg.category_name.split(" ").join("-").toLowerCase()}`} key={index} className='transition-all duration-200 border-b-[1px] border-richblack-50 w-full text-center py-4 leading-1 hover:bg-richblack-50 rounded-lg hover:text-blue-200'>{catg.category_name}</Link>
                                            ))
                                        }
                                    </div>
                                </li>) :
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
                            <ProfileDropDown />
                        )
                    }{
                        (user != null && user?.account_type !== 'Instructor') && (
                            <Link to={"/dashboard/cart"} className="relative">
                                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                                {totalItems > 0 && <span>{totalItems}</span>}
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
