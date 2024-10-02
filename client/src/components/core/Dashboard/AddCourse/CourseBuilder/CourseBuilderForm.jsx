import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { useSelector, useDispatch } from 'react-redux'
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { createSection, updateSection } from '../../../../../services/operations/courseDetailAPIs'
import { setCourse, setEditCourse, setStep } from '../../../../redux/slice/courseSlice'
import NestedSectionView from './NestedSectionView'
import toast from 'react-hot-toast'

const CourseBuilderForm = () => {

  const { register, getValues, setValue, handleSubmit, formState: { errors } } = useForm();
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [editSectionId, setEditSectionId] = useState(null);

  function cancelEditHandler() {
    setEditSectionId(null);
    setValue("section_name", "")
  }

  function editSectionNameHandler(section_id, section_name) {
    if (section_id === editSectionId) {
      cancelEditHandler();
      return;
    }

    setEditSectionId(section_id)
    setValue("section_name", section_name)
  }

  async function onSubmitHandler(data) {
    let result;
    setLoading(true)

    if (editSectionId) {
      result = await updateSection({
        section_name: data.section_name,
        section_id: editSectionId,
        course_id: course._id
      }, token);
    } else {
      result = await createSection({
        section_name: data.section_name,
        course_id: course._id
      }, token)
    }

    if (result) {
      dispatch(setCourse(result))
      setValue("section_name", "")
      setEditSectionId(null)
    }
    setLoading(false)
  }

  function goToNext() {
    if (course.course_content.length === 0) {
      toast.error("Please add atleast one section")
      return;
    }
    if (course.course_content.some((section) => section.sub_section.length === 0)) {
      toast.error("Please add atleast one lecture in each section")
      return;
    }
    dispatch(setStep(3))
  }

  function goBack() {
    dispatch(setStep(1))
    dispatch(setEditCourse(true));
  }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <h1 className="text-2xl font-semibold text-richblack-5">Course Builder</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)} className='space-y-4'>
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            placeholder='Add a section to your course'
            id='sectionName'
            name='section_name'
            {...register("section_name", { required: true })}
            className="form-style w-full"
          />
          {
            errors.section_name && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Section name is required
              </span>
            )
          }
        </div>
        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            customClasses='text-yellow-50'
            outline={true}
            text={editSectionId ? "Edit Section" : "Create Section"}
            disabled={loading}
          ><IoAddCircleOutline size={20} className="text-yellow-50" /></IconBtn>
          {
            editSectionId && (
              <button
                type="button"
                className="text-sm underline"
                style={{ color: "#cf142b" }}
                onClick={cancelEditHandler}
              >Cancel Edit</button>
            )
          }
        </div>
      </form>
      {course?.course_content?.length > 0 && (
        <NestedSectionView editSectionNameHandler={editSectionNameHandler} />
      )}
      {/* Back && Next Btn */}
      <div className="flex justify-end gap-x-3">
        <button
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          onClick={goBack}
        >Back</button>
        <IconBtn disabled={loading} text="Next" onClick={goToNext}><MdNavigateNext /></IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm
