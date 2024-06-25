import React, { useEffect, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
// import "../../.."
// Import required modules
import { FreeMode, Pagination } from "swiper/modules"
import CourseCard from "./CourseCard"

const CourseSlider = ({ courses }) => {
    return (
        <>
            {
                courses?.length ? (
                    <Swiper
                        slidePerView={1}
                        spaceBetween={25}
                        loop={true}
                        modules={[FreeMode, Pagination]}
                        breakpoints={{
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="max-h-[30rem]"
                    >
                        {
                            courses.map((course, index) => (
                                <SwiperSlide key={index}>
                                    <CourseCard course={course} height={"h-[250px]"}></CourseCard>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                )
                    : (<p className="text-xl text-richblack-5">No Course Found</p>)
            }
        </>
    )
}

export default CourseSlider
