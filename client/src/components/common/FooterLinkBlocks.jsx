import React from 'react'
import { Link } from 'react-router-dom'
const FooterLinkBlocks = ({ heading, Links }) => {
    return (
        <div className={`flex flex-col items-start gap-3 ${heading === 'Subjects' ? "border-l-2 ps-6 border-richblack-700" : ""}`}>
            <h4 className='text-richblack-50 font-semibold text-[16px]'>{heading}</h4>
            <ul className='flex flex-col gap-2 items-start '>
                {
                    Links.map((link) => (
                        <li className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                            <Link to={link.toLowerCase().replace(" ", "-")}>
                                {link}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div >
    )
}

export default FooterLinkBlocks
