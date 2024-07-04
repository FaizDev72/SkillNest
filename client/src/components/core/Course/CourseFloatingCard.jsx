import React from 'react'
import { FaShareSquare } from "react-icons/fa";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link } from 'react-router-dom'

const CourseFloatingCard = ({ response, paymentHandler, token }) => {
    console.log("Printing COurse->>>>>>>> ", response)
    const { thumbnail, price } = response.course
    return (
        <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5'>
            <div>
                <img src={thumbnail} alt="course thumbnail" className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
                />
            </div>
            <div className='px-4'>
                <div className="space-x-3 pb-4 text-3xl font-semibold">
                    Rs. {price}
                </div>
                <div className='flex flex-col gap-4'>
                    {
                        response?.course.student_enrolled.includes(response._id) ? (
                            <Link to={'/course'} className="text-center w-full yellowButton">Go to Course</Link>
                        ) : (
                            <>
                                <button className="w-full yellowButton" onClick={paymentHandler}>Buy Now</button>
                                <button className="w-full blackButton">Add to Cart</button>
                            </>
                        )
                    }

                </div>
                <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
                    30-Day Money-Back Guarantee
                </p>

                <div className={``}>
                    <p className={`my-2 text-xl font-semibold `}>
                        This Course Includes :
                    </p>
                    <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                        {response?.course.instructions?.map((item, i) => {
                            return (
                                <p className={`flex gap-2`} key={i}>
                                    <IoIosArrowDroprightCircle />
                                    <span>{item}</span>
                                </p>
                            )
                        })}
                    </div>
                </div>
                <div className="text-center">
                    <button
                        className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
                    // onClick={handleShare}
                    >
                        <FaShareSquare size={15} /> Share
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CourseFloatingCard
