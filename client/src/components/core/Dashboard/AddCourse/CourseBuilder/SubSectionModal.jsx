import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from 'react-redux'
import UploadFile from '../CourseInformation/UploadFile'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailAPIs'
import { setCourse } from '../../../../redux/slice/courseSlice'
import toast from 'react-hot-toast'

const SubSectionModal = ({ modalData, add = false, view = false, edit = false, setModalData }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)
    const { register, formState: { errors }, setValue, getValues, handleSubmit } = useForm();

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.sub_section_name)
            setValue("lectureDescription", modalData.sub_section_desc)
            setValue("lectureVideo", modalData.video)
        }
    }, [])

    function isFormUpdated() {
        let currentValues = getValues();

        if (currentValues.lectureTitle !== modalData.sub_section_name ||
            currentValues.lectureDescription !== modalData.sub_section_desc ||
            currentValues.lectureVideo !== modalData.video) {
            return true;
        }
        return false;
    }

    async function editSubSectionHandler() {
        const currentValues = getValues();

        const formData = new FormData();
        formData.append("section_id", modalData.section_id);
        formData.append("sub_section_id", modalData._id);
        if (currentValues.lectureTitle !== modalData.sub_section_name) {
            formData.append("sub_section_name", currentValues.lectureTitle);
        }
        if (currentValues.lectureDescription !== modalData.sub_section_desc) {
            formData.append("sub_section_desc", currentValues.lectureDescription);
        }
        if (currentValues.lectureVideo !== modalData.video) {
            formData.append("videoFile", currentValues.lectureVideo);
        }

        setLoading(true)
        const result = await updateSubSection(formData, token)
        if (result) {
            let updatedCourseContent = course.course_content.map((section) =>
                section._id === modalData.section_id ? result : section
            )

            const updatedCourseDetail = { ...course, course_content: updatedCourseContent };
            dispatch(setCourse(updatedCourseDetail))
        }
        setModalData(null)
        setLoading(false)
    }

    async function onSubmitHandler(data) {

        if (view) return

        // Edit logic
        if (edit) {
            if (!isFormUpdated()) {
                toast.error("No changes made to the form");
            } else {
                editSubSectionHandler()
            }
            return
        }

        const formData = new FormData()
        formData.append("section_id", modalData)
        formData.append("sub_section_name", data.lectureTitle)
        formData.append("sub_section_desc", data.lectureDescription)
        formData.append("videoFile", data.lectureVideo)

        setLoading(true)
        const result = await createSubSection(formData, token)
        if (result) {

            let updatedCourseContent = course.course_content.map((section) => (
                section._id === modalData ? result : section
            ))
            const updatedCourse = { ...course, course_content: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }

        setModalData(null)
        setLoading(false)
    }

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
                {/* Modal Head */}
                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">
                        {view && "Viewing"} {edit && "Edit"} {add && "Add"} Lecture
                    </p>
                    <button onClick={() => (!loading ? setModalData(null) : {})}>
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>
                </div>
                {/* Modal Body */}
                <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-8 px-8 py-10">
                    {/* Lecture */}
                    <UploadFile
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.video : null}
                        editData={edit ? modalData.video : null}
                    />

                    {/* Lecture Title */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
                            Lecture Title {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <input
                            id='lectureTitle'
                            disabled={view || loading}
                            name='lectureTitle'
                            placeholder='Enter Lecture Title'
                            {...register("lectureTitle", { required: true })}
                            className='form-style w-full'
                        />
                        {errors.lectureTitle && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture title is required
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
                            Lecture Description {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <textarea
                            id='lectureDescription'
                            disabled={view || loading}
                            name='lectureDescription'
                            placeholder='Enter Lecture Description'
                            {...register("lectureDescription", { required: true })}
                            className="form-style resize-x-none min-h-[130px] w-full"
                        />
                        {errors.lectureTlectureDescriptionitle && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture Description is required
                            </span>
                        )}
                    </div>
                    {
                        !view && (
                            <div className="flex justify-end">
                                <IconBtn
                                    disabled={loading}
                                    text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
                                />
                            </div>
                        )
                    }
                </form>
            </div>
        </div>
    )
}

export default SubSectionModal
