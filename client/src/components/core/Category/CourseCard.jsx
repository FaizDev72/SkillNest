import React from 'react'
import { Link } from 'react-router-dom'

const CourseCard = ({ course, height }) => {
    return (
        <Link to={`/courses/${course._id}`}>
        <div>
            <img src={course.thumbnail} className={`${height} w-full rounded-xl object-cover`} alt='Course Details' />
            <span className="text-xl text-richblack-5">{course.course_name}</span>
            <p className="text-sm text-richblack-50">
              {course?.instructor?.first_name} {course?.instructor?.last_name}
            </p>
            <div className='text-yellow-5'>
                <span>react-stars</span>
                <span>0 Rating</span>
            </div>
            <div className="text-xl text-richblack-5">Rs. {course.price}</div>
        </div>
        </Link>
    )
}

export default CourseCard
