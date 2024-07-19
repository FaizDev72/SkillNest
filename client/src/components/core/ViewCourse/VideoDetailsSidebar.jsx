import React, { useEffect, useState } from 'react'
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { useSelector } from 'react-redux'

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("")
  const [activeSubSection, setActiveSubSection] = useState("")
  const { currentCourseData, courseSectionData, completedLectures, totalNoOfLectures } = useSelector((state) => state.viewCourse)
  const { course_id, section_id, sub_section_id } = useParams();
  const location = useLocation();

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return
      const currentSectionIndex = courseSectionData.findIndex((section) => section._id === section_id)
      const currentSubSectionIndex = courseSectionData[currentSectionIndex].sub_section.findIndex((subSec) => subSec._id === sub_section_id);

      setActiveSection(courseSectionData[currentSectionIndex]._id)
      setActiveSubSection(courseSectionData[currentSectionIndex]?.sub_section[currentSubSectionIndex]?._id)
    })();
  }, [courseSectionData, currentCourseData, location.pathname])

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
      {/* 1st section */}
      <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
        {/* 1st Sub-section */}
        <div className="flex w-full items-center justify-between ">
          <div
            onClick={() => navigate('/dashboard/enrolled-courses')}
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
            title="back"
          >
            <IoIosArrowBack size={30} />
          </div>
          <IconBtn text='Add Review' onClick={() => setReviewModal(true)} customClasses="ml-auto" />
        </div>

        {/* 2nd sub - section */}
        <div className="flex flex-col">
          <span>{currentCourseData?.course_name}</span>
          <span className="text-sm font-semibold text-richblack-500">{completedLectures?.length}/{totalNoOfLectures}</span>
        </div>
      </div>

      {/* 2nd section */}
      <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
        {
          courseSectionData?.map((section) => (
            <div key={section?._id} onClick={() => setActiveSection(section?._id)} className="mt-2 cursor-pointer text-sm text-richblack-5">
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {section?.section_name}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`${activeSection === section?._id ?
                      "rotate-0"
                      : "rotate-100"} transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* sub-section */}
              <div>
                {
                  activeSection === section?._id && (
                    <div className="transition-[height] duration-500 ease-in-out">
                      {
                        section?.sub_section.map((subSection) => (
                          <div key={subSection._id}
                            className={`flex gap-3  px-5 py-2 ${activeSubSection === subSection._id
                              ? "bg-yellow-200 font-semibold text-richblack-800"
                              : "hover:bg-richblack-900"
                              } `}
                            onClick={() => {
                              navigate(`/view-course/${currentCourseData?._id}/section/${section?._id}/sub-section/${subSection?._id}`)
                              setActiveSubSection(subSection?._id)
                            }}
                          >
                            <input type='checkbox' checked={completedLectures.includes(subSection?._id)} onChange={() => { }} />
                            <span>{subSection?.sub_section_name}</span>
                          </div>
                        ))
                      }
                    </div>
                  )}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default VideoDetailsSidebar
