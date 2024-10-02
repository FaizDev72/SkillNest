import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getEnrolledCourses } from '../../../services/operations/profileAPIs';
import ScaleLoader from "react-spinners/ScaleLoader";
import { useNavigate } from 'react-router-dom';
import ProgressBar from "@ramonak/react-progress-bar";
import isProduction from '../../../utils/logger';

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await getEnrolledCourses(token);
        // let publicCourses = response.filter((ele) => ele.status === 'published')
        setEnrolledCourses(response.data.data)
      } catch (error) {
        if (!isProduction()) {
        console.log("Failed to fetch Enrolled Courses")
      }
      }
    })()
  }, [])
  return (
    <div>
      <h1>Enrolled Courses</h1>
      {
        !enrolledCourses ? (
          <div className='flex items-center justify-center w-full'>
            <ScaleLoader color={'#ffffff'} />
          </div>) :
          !enrolledCourses.length ? (
            <p className='grid h-[10vh] w-full place-content-center text-richblack-5'>
              You have not enrolled in any course yet.
              {/* TODO: Modify this empty state */}
            </p>
          ) : (
            <div className='my-8 text-richblack-5'>
              {/* Headings */}
              <div className='flex rounded-t-lg bg-richblack-500'>
                <p className='w-[45%] px-5 py-3'>Course Name</p>
                <p className='w-1/4 px-2 py-3'>Duration</p>
                <p className='flex-1 px-2 py-3'>Progress</p>
              </div>
              {/* Course Name */}
              {
                enrolledCourses.map((course, i, arr) => (
                  <div
                    className={`flex items-center border border-richblack-700 
                ${i === arr.length - 1 ? 'rounded-b-lg' : 'rounded-none'}`}
                    key={i}
                  >
                    <div
                      className='flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3'
                      onClick={() => {
                        navigate(
                          `/view-course/${course?._id}/section/${course.course_content?.[0]?._id}/sub-section/${course.course_content?.[0]?.sub_section?.[0]?._id}`
                        )
                      }}
                    >
                      <img
                        src={course.thumbnail}
                        alt='course_img'
                        className='h-14 w-14 rounded-lg object-cover'
                      />
                      <div className='flex max-w-xs flex-col gap-2'>
                        <p className='font-semibold'>{course.course_name}</p>
                        <p className='text-xs text-richblack-300'>
                          {
                            course.description.length > 50
                              ? `${course.description.slice(0, 50)}...`
                              : course.description
                          }
                        </p>
                      </div>
                    </div>
                    <div className='w-1/4 px-2 py-3'>{course?.total_duration}</div>
                    <div>
                      <p>Progress: {course.progress_Percentage || 0}%</p>
                      <ProgressBar
                        completed={course.progress_Percentage || 0}
                        height='8px'
                        isLabelVisible={false}
                      />
                    </div>
                  </div>
                ))}
            </div>
          )
      }
    </div>
  )
}

export default EnrolledCourses
