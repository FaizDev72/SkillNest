import React from 'react'
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import *as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux'
import { resetCourseState } from '../../redux/slice/courseSlice'

const SideBarLinks = ({ icon, name, linkPath, type }) => {
    const Icon = Icons[icon]
    const location = useLocation();
    function matchRoute(route) {
        return matchPath({ path: route }, location.pathname)
    }
    const dispatch = useDispatch();
    return (
        <NavLink
            onClick={() => dispatch(resetCourseState())}
            to={linkPath}
            className={`relative px-8 py-2 text-sm font-medium ${matchRoute(linkPath) ? 'text-yellow-50 bg-yellow-800' : 'text-richblack-300 bg-opacity-0'} transition-all duration-200`}
        >
            <span className={`absolute left-0 top-0 h-full bg-yellow-50 w-[0.15rem]  ${matchRoute(linkPath) ? "visible" : "hidden"}`}></span>

            <div className='flex items-center gap-x-2'>
                <Icon className="text-lg" />
                <span className='text-[16px] tracking-wider'>{name}</span>
            </div>
        </NavLink>
    )
}

export default SideBarLinks
