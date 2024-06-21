import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({ children, active, linkto }) => {
    return (
        <button>
            <Link to={linkto}>
                <div className={`${active ? "bg-yellow-50 text-black" : "bg-richblack-800 text-white"} font-semibold tracking-wider rounded-md text-center px-6 py-3  hover:scale-95 transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none`}>
                    {children}
                </div>
            </Link>
        </button>
    )
}

export default CTAButton
