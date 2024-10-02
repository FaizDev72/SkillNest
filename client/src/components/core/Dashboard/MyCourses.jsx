import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailAPIs';
import IconBtn from '../../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { VscAdd } from "react-icons/vsc"
import CoursesTable from "./InstructorCourses/CourseTable"
import isProduction from '../../../utils/logger';

const MyCourses = () => {

  const { token } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchInstructorCourses(token);
        setCourses(response)
      } catch (error) {
        if (!isProduction()) {
        console.log("Error occured while fetching Instructor Courses")
        }
      }
    })()
  }, [])

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconBtn
          text="Add Course"
          onClick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}

export default MyCourses
