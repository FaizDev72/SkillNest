import React, { useEffect, useState } from 'react'
import VideoSliderbar from '../components/core/ViewCourse/VideoDetailsSidebar';
import { Outlet, useParams } from 'react-router-dom'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import { getFullCourseDetails } from '../services/operations/courseDetailAPIs';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseSectionData, setCompletedLectures, setCurrentCourseData, setTotalNoOfLectures } from '../components/redux/slice/viewCourse'

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false);
    const { token } = useSelector((state) => state.auth)
    const { course_id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const courseData = await getFullCourseDetails(course_id, token);
            console.log("courseData->> ", courseData)
            dispatch(setCourseSectionData(courseData?.courseDetails.course_content));
            dispatch(setCurrentCourseData(courseData?.courseDetails))
            dispatch(setCompletedLectures(courseData?.completedVideos))
            let lectures = 0;
            courseData?.courseDetails?.course_content?.forEach(section => {
                lectures += section.sub_section?.length;
            });
            dispatch(setTotalNoOfLectures(lectures))
        })();
    }, [])

    return (
        <>
            <div className="relative flex min-h-[calc(100vh-3.5rem)]">
                <VideoSliderbar setReviewModal={setReviewModal} />
                <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                    <div className="mx-6">
                        <Outlet />
                    </div>
                </div>
            </div>
            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
        </>
    )
}

export default ViewCourse
