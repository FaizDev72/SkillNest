import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getFullCourseDetails } from '../../../../services/operations/courseDetailAPIs';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse } from '../../../redux/slice/courseSlice';
import ScaleLoader from "react-spinners/ScaleLoader";
import RenderSteps from '../AddCourse/RenderSteps'

const EditCourse = () => {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)
    const dispatch = useDispatch();
    const { course_id } = useParams();
    const [loading, setLoading] = useState();

    useEffect(() => {
        (async () => {
            setLoading(true)
            let result = await getFullCourseDetails(course_id, token);

            if (result) {
                dispatch(setCourse(result?.courseDetails))
                dispatch(setEditCourse(true));
            }
            setLoading(false)
        })()
    }, [])

    if (loading) {
        return (
            <ScaleLoader color={'#ffffff'} />
        )
    }

    return (
        <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                Edit Course
            </h1>
            <div className="mx-auto max-w-[600px]">
                {course ? (
                    <RenderSteps />
                ) : (
                    <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                        Course not found
                    </p>
                )}
            </div>
        </div>
    )
}

export default EditCourse
