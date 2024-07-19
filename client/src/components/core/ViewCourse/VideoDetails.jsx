import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BigPlayButton, Player } from "video-react"
import IconBtn from '../../common/IconBtn';
import { makeLectureAsCompleted } from '../../../services/operations/courseDetailAPIs';
import { updatedCompletedLectures } from '../../redux/slice/viewCourse';

const VideoDetails = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { currentCourseData, courseSectionData, completedLectures, totalNoOfLectures } = useSelector((state) => state.viewCourse)
    const { token } = useSelector((state) => state.auth)
    const { course_id, section_id, sub_section_id } = useParams();
    const [lectureData, setLectureData] = useState([]);
    const [previewSource, setPreviewSource] = useState("")
    const [videoEnded, setVideoEnded] = useState(false)
    const [loading, setLoading] = useState(false)
    const playerRef = useRef();

    useEffect(() => {
        (async () => {
            if (!courseSectionData.length) return
            if (!course_id && !section_id && !sub_section_id) {
                navigate('/dashboard/enrolled-courses')
            } else {
                const filteredSection = courseSectionData.filter((section) => section?._id === section_id)
                const filteredSubSection = filteredSection?.[0]?.sub_section.filter((subSec) => subSec?._id === sub_section_id)
                // console.log("filteredSubSection->> ", filteredSubSection[0])
                // console.log(filteredSection)
                setLectureData(filteredSubSection[0])
                setPreviewSource(currentCourseData?.thumbnail);
                setVideoEnded(false)
            }
        })()
    }, [courseSectionData, currentCourseData, location.pathname])

    function isFirstVideo() {
        const currentSectionIndex = courseSectionData.findIndex((section) => section._id === section_id)
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].sub_section.findIndex((subSec) => subSec._id === sub_section_id);

        if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            return true;
        }
        return false;
    }

    function isLastVideo() {
        const currentSectionIndex = courseSectionData.findIndex((section) => section._id === section_id)
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.sub_section.findIndex((subSec) => subSec._id === sub_section_id);
        const noOfSubSection = courseSectionData[currentSectionIndex]?.sub_section.length;

        if (currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSection - 1) {
            return true;
        }
        return false;
    }

    function goToNextVideo() {
        const currentSectionIndex = courseSectionData.findIndex((section) => section._id === section_id)
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.sub_section.findIndex((subSec) => subSec._id === sub_section_id)
        const noOfSubSection = courseSectionData[currentSectionIndex]?.sub_section.length;
        console.log(currentSectionIndex, currentSubSectionIndex, noOfSubSection)
        if (currentSubSectionIndex !== noOfSubSection - 1) {
            const nextSubSectinId = courseSectionData[currentSectionIndex]?.sub_section[currentSubSectionIndex + 1]._id;
            navigate(`/view-course/${course_id}/section/${section_id}/sub-section/${nextSubSectinId}`);
            return
        } else {
            const nextSectionId = courseSectionData[currentSectionIndex + 1]?._id;
            const nextSubSectinId = courseSectionData[currentSectionIndex + 1]?.sub_section[0]?._id
            navigate(`/view-course/${course_id}/section/${nextSectionId}/sub-section/${nextSubSectinId}`);
            return
        }
    }

    function goToPrevVideo() {
        const currentSectionIndex = courseSectionData.findIndex((section) => section._id === section_id)
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.sub_section.findIndex((subSec) => subSec._id === sub_section_id)

        if (currentSubSectionIndex !== 0) {
            const prevSubSectionId = courseSectionData[currentSectionIndex]?.sub_section[currentSubSectionIndex - 1]?._id
            navigate(`/view-course/${course_id}/section/${section_id}/sub-section/${prevSubSectionId}`)
        } else {
            const prevSectionId = courseSectionData[currentSectionIndex - 1]?._id
            const prevSubSectionLength = courseSectionData[currentSectionIndex - 1]?.sub_section?.length;
            const prevSubSectionId = courseSectionData[currentSectionIndex - 1]?.sub_section[prevSubSectionLength - 1]?._id
            navigate(`/view-course/${course_id}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
        }
    }

    async function lectureCompletionHandler() {
        setLoading(true)
        const res = await makeLectureAsCompleted({ course_id, sub_section_id }, token);

        if(res){
            dispatch(updatedCompletedLectures(sub_section_id))
        }
        setLoading(false)
    }

    return (
        <div className="flex flex-col gap-5 text-white">
            {
                !lectureData ? (
                    <img
                        src={previewSource}
                        alt="Preview"
                        className="h-full w-full rounded-md object-cover"
                    />
                ) : (
                    <Player
                        ref={playerRef}
                        aspectRatio="16:9"
                        playsInline
                        onEnded={() => setVideoEnded(true)}
                        src={lectureData?.video}
                    >
                        <BigPlayButton position='center' />
                        {/* Render When Video Ends */}
                        {
                            videoEnded && (
                                <div
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                                    }}
                                    className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                                >
                                    {
                                        !completedLectures.includes(section_id) && (
                                            <IconBtn
                                                disabled={loading}
                                                text={loading ? 'Loading... ' : 'Mark as Read'}
                                                onClick={() => lectureCompletionHandler()}
                                                customClasses="text-xl max-w-max px-4 mx-auto"
                                            />
                                        )
                                    }
                                    <IconBtn
                                        disabled={loading}
                                        text='Rewatch'
                                        onClick={() => {
                                            if (playerRef.current) {
                                                playerRef?.current?.seek(0)
                                                setVideoEnded(false)
                                            }
                                        }}
                                        customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                                    />
                                    <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                                        {
                                            !isFirstVideo() && (
                                                <button
                                                    onClick={goToPrevVideo}
                                                    className="blackButton"
                                                    disabled={loading}
                                                >Prev</button>
                                            )
                                        }
                                        {
                                            !isLastVideo() && (
                                                <button
                                                    onClick={goToNextVideo}
                                                    className="blackButton"
                                                    disabled={loading}
                                                >Next</button>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </Player>
                )}
            <h1 className="mt-4 text-3xl font-semibold">{lectureData?.sub_section_name}</h1>
            <p className="pt-2 pb-6">{lectureData?.sub_section_desc}</p>
        </div>
    )
}

export default VideoDetails
