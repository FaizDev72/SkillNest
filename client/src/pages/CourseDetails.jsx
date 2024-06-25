import React from 'react'
import { useParams } from 'react-router-dom'
import { FaShareSquare } from "react-icons/fa";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { GrCircleInformation } from "react-icons/gr";
import { TbWorld } from "react-icons/tb";




const CourseDetails = () => {
    const { course_id } = useParams();
    return (
        <div className=' text-white bg-richblack-800'>
            {/* Hero Section */}
            <div className='mx-auto box-content lg:w-[1260px] 2xl:relative w-full py-16 relative'>
                <div className='md:max-w-[65%] text-lg gap-4 flex items-start flex-col'>
                    <h1 className='text-4xl font-bold text-richblack-5 sm:text-[42px]'>React Js</h1>
                    <span className='text-richblack-200'>ReactJS is an open-source JavaScript library for building highly interactive web applications developed and maintained by Meta.</span>
                    <div>
                        4.3 * * * * * (7 reviews) 8 students enrolled
                    </div>
                    <span>Created By Rahul Kumar</span>
                    <div className='flex items-center justify-center gap-3'><GrCircleInformation />Created at August 12, 2023 | 5:44 PM <span className='flex items-center justify-center gap-1'> <TbWorld />English</span></div>
                </div>

                {/* Floating Card */}
                <div className='bg-richblack-600 w-fit p-6 absolute right-0 top-[20%] flex items-center justify-start text-left'>
                    <div>
                        <img src='' alt='' className="aspect-auto w-full" />
                    </div>
                    <div className='flex items-center justify-center flex-col gap-4'>
                        <h2 className='w-full  text-left text-4xl font-bold text-richblack-5 sm:text-[42px] '>Rs 2324</h2>
                        <button className="w-full yellowButton">Buy Now</button>
                        <button className="w-full blackButton">Add to Cart</button>
                        <div>30-Day Money-Back Guarantee</div>

                        <div className='text-left w-full flex flex-col items-start justify-start gap-2'>
                            <span>This Course Includes :</span>
                            <span className='text-caribbeangreen-200 flex gap-2 items-center justify-center'><IoIosArrowDroprightCircle /> HTML</span>
                            <span className='text-caribbeangreen-200 flex gap-2 items-center justify-center'><IoIosArrowDroprightCircle /> CSS</span>
                            <span className='text-caribbeangreen-200 flex gap-2 items-center justify-center'><IoIosArrowDroprightCircle /> JS</span>
                        </div>

                        <div className='flex items-center justify-center gap-1 cursor-pointer'><FaShareSquare />Share</div>
                    </div>
                </div>

            </div>

            {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you"ll learn</p>
            <div className="mt-5">
              {/* <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown> */}
            </div>
          </div>
        </div>
    )
}

export default CourseDetails
