import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { useSelector, useDispatch } from 'react-redux'
import { resetCourseState, setStep } from '../../../../redux/slice/courseSlice'
import { COURSE_STATUS } from "../../../../../utils/contants"
import { useNavigate } from 'react-router-dom'
import { updateCourse } from '../../../../../services/operations/courseDetailAPIs'

const PublishCourse = () => {

  const { register, formState: { errors }, getValues, setValue, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED)
      setValue("public", true)
  }, [])

  function goToCourses() {
    dispatch(resetCourseState());
    navigate('/dashboard/my-courses')
    return
  }

  async function onSubmitFormHandler() {
    // checking if course status if updated or not
    if ((course.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
      (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      goToCourses()
      return
    }

    const formData = new FormData();

    const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;

    formData.append("course_id", course._id)
    formData.append("status", courseStatus);

    setLoading(true)
    const result = await updateCourse(formData, token);

    if (result) {
      goToCourses()
    }

    setLoading(false)
  }

  function goBack() {
    dispatch(setStep(2))
  }

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <h3 className="text-2xl font-semibold text-richblack-5">Publish Settings</h3>
      <form onSubmit={handleSubmit(onSubmitFormHandler)}>
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type='checkbox'
              id='public'
              name='public'
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">Make this course as public</span>
          </label>
        </div>
        {/* Back && Next Btn */}
        <div className="flex justify-end gap-x-3">
          <button
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            onClick={goBack}
          >Back</button>
          <IconBtn disabled={loading} text="Save Changes" ></IconBtn>
        </div>
      </form>
    </div>
  )
}

export default PublishCourse
