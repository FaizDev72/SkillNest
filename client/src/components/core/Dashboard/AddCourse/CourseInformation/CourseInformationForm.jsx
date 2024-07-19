import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import InputTags from './InputTags'
import UploadFile from './UploadFile'
import RequirementField from './RequirementField'
import { useSelector, useDispatch } from 'react-redux'
import { setCourse, setStep } from '../../../../redux/slice/courseSlice'
import IconBtn from '../../../../common/IconBtn'
import { addCourseDetails, fetchCourseCategories, updateCourse } from '../../../../../services/operations/courseDetailAPIs'
import toast from 'react-hot-toast'
import { COURSE_STATUS } from '../../../../../utils/contants'

const CourseInformationForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const [categories, setCategories] = useState([]);
  const { course, editCourse } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCategories() {
      setLoading(true)
      const allCategories = await fetchCourseCategories();
      setCategories(allCategories.data.data)
      console.log(allCategories.data.data)
      setLoading(false)
    }

    getCategories()

    // if course is in edit mode than set all present values
    if (editCourse) {
      setValue("course_name", course.course_name)
      setValue("description", course.description)
      setValue("price", course.price)
      setValue("instructions", course.instructions)
      setValue("course_benefits", course.course_learning)
      setValue("course_image", course.thumbnail)
      setValue("status", course.status)
      setValue("category", course.category)
      setValue("tags", course.tag)
    }

  }, [])

  function isFormUpdated() {
    const currentValues = getValues();
    if (currentValues.course_name !== course.course_name ||
      currentValues.description !== course.description ||
      currentValues.price !== course.price ||
      currentValues.instructions.toString() !== course.instructions.toString() ||
      currentValues.course_benefits !== course.course_learning ||
      currentValues.course_image !== course.thumbnail ||
      currentValues.tags.toString() !== course.tag.toString() ||
      currentValues.category._id !== course.category._id
    ) {
      return true;
    }
    return false;
  }

  async function onSubmitHandler(data) {
    console.log(data)
    // first check for editCourse
    if (editCourse) {
      const currentValues = getValues();
      const formData = new FormData();
      if (isFormUpdated()) {
        formData.append("course_id", course._id)
        if (currentValues.course_name !== course.course_name) {
          formData.append("course_name", data.course_name);
        }
        if (currentValues.description !== course.description) {
          formData.append("description", data.description);
        }
        if (currentValues.price !== course.price) {
          formData.append("price", data.price);
        }
        if (currentValues.category._id !== course.category._id) {
          formData.append("category", data.category);
        }
        if (currentValues.instructions.toString() !== course.instructions.toString()) {
          formData.append("instructions", JSON.stringify(data.instructions));
        }
        if (currentValues.tags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.tags));
        }
        if (currentValues.course_benefits !== course.course_learning) {
          formData.append("course_learning", data.course_benefits);
        }
        if (currentValues.course_image !== course.thumbnail) {
          formData.append("thumbnail", data.course_image);
        }

        setLoading(true)
        const result = await updateCourse(formData, token);
        setLoading(false)
        if (result) {
          dispatch(setCourse(result));
          dispatch(setStep(2))
        }

      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    if (data) {
      const formData = new FormData();
      formData.append("course_name", data.course_name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("course_learning", data.course_benefits);
      formData.append("tag", JSON.stringify(data.tags));
      formData.append("instructions", JSON.stringify(data.instructions));
      formData.append("thumbnail", data.course_image);
      formData.append("status", COURSE_STATUS.DRAFT)

      setLoading(true)
      const response = await addCourseDetails(formData, token)
      if (response) {
        dispatch(setStep(2))
        dispatch(setCourse(response?.data?.data))
      }
      // console.log("Printing Response",response.data.data)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      {/* Course Name */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="course_title">Course Title <sup className="text-pink-200">*</sup></label>
        <input
          id='course_title'
          name='course_title'
          placeholder='Enter Course Title'
          className="form-style w-full"
          {...register("course_name", { required: true })}
        />
        {
          errors.course_name && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course title is required
            </span>
          )
        }
      </div>
      {/* Course Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="description">Course Short Description <sup className="text-pink-200">*</sup></label>
        <textarea
          id='description'
          name='description'
          placeholder='Enter Description'
          className="form-style resize-x-none min-h-[130px] w-full"
          {...register("description", { required: true })}
        />
        {
          errors.description && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Description is required
            </span>
          )
        }
      </div>
      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="course_title">Course Price <sup className="text-pink-200">*</sup></label>
        <div className="relative">
          <input
            type='number'
            id="price"
            placeholder="Enter Course Price"
            name='price'
            {...register("price", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>
      {/* Course Category DropDown */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="course_category">Choose Category <sup className="text-pink-200">*</sup></label>
        <select
          {...register("category", { required: true })}
          defaultValue=''
          className='form-style w-full'
          id='course_category'
        >
          <option value='' disabled>Choose a Category</option>
          {
            !loading &&
            categories?.map((item, index) => (
              <option key={index} value={item?._id}>{item?.category_name}</option>
            ))
          }
        </select>
        {
          errors.category && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Category is required
            </span>
          )
        }
      </div>

      {/* Tags */}
      <InputTags
        label="Tags"
        name="tags"
        placeholder="Enter Tags & Press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <UploadFile
        name="course_image"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          className="form-style resize-x-none min-h-[130px] w-full"
          {...register("course_benefits", { required: true })}
          name='course_benefits'
          placeholder='Enter Benefits of the Course'
          id='courseBenefits'
        />{
          errors.course_benefits && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Benefits of the course is required
            </span>
          )
        }
      </div>

      <RequirementField
        name='instructions'
        label='Requirements/Instructions'
        setValue={setValue}
        register={register}
        errors={errors}
        getValues={getValues}
      />

      {/* Buttons */}
      <div className="flex justify-end gap-x-2">
        {
          editCourse && (
            <button
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
              onClick={() => dispatch(setStep(2))}
            >
              Continue without Saving
            </button>
          )
        }
        <IconBtn disabled={loading} text={!editCourse ? "Next" : "Save Changes"}> <MdNavigateNext /> </IconBtn>
      </div>
    </form>
  )
}

export default CourseInformationForm