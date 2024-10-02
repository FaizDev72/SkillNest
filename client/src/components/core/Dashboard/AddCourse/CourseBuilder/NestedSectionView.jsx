import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import SubSectionModal from './SubSectionModal'
import ConfirmationModal from '../../../../common/ConfirmationModal'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailAPIs'
import { useDispatch } from 'react-redux'
import { setCourse } from '../../../../redux/slice/courseSlice'

const NestedSectionView = ({ editSectionNameHandler }) => {
    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)
    const [addSubSection, setAddSubSection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)
    const [confirmationModal, setConfirmationModal] = useState(null);
    const dispatch = useDispatch();

    async function deleteSubSectionHandler(sub_section_id, section_id) {
        const result = await deleteSubSection({ sub_section_id, section_id }, token);
        if (result) {
            // update the structure of course
            const updatedCourseContent = course.course_content.map((section) =>
                section._id === section_id ? result : section
            )
            const updatedCourse = { ...course, course_content: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setConfirmationModal(null)
    }

    async function deleteSectionHandler(section_id) {
        let result = await deleteSection({ section_id, course_id: course._id }, token);

        if (result) {
            dispatch(setCourse(result));
        }
        setConfirmationModal(null)
    }

    return (
        <>
            <div className="rounded-lg bg-richblack-700 p-6 px-8" id="nestedViewContainer">
                {course.course_content.map((section) => (
                    // section Drowpdown 
                    <details key={section._id} open>
                        <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                            <div className="flex items-center gap-x-3">
                                <RxDropdownMenu className="text-2xl text-richblack-50" />
                                <p className="font-semibold text-richblack-50">
                                    {section.section_name}
                                </p>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <button
                                    onClick={() => editSectionNameHandler(section._id, section.section_name)}
                                ><MdEdit className="text-xl text-richblack-300" /></button>
                                <button
                                    onClick={() => {
                                        setConfirmationModal({
                                            text1: 'Delete this Section?',
                                            text2: 'All the lectures in this section will be deleted',
                                            btn1: 'Delete',
                                            btn2: 'Cancel',
                                            btnHandler1: () => { deleteSectionHandler(section._id) },
                                            btnHandler2: () => { setConfirmationModal(null) },
                                        })
                                    }}
                                > <RiDeleteBin6Line className="text-xl text-richblack-300" /></button>
                                <span className="font-medium text-richblack-300">|</span>
                                <AiFillCaretDown className={`text-xl text-richblack-300`} />
                            </div>
                        </summary>
                        <div className="px-6 pb-4">
                            {
                                section.sub_section.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                                        onClick={() => setViewSubSection(item)}>
                                        <div className="flex items-center gap-x-3 py-2 ">
                                            <RxDropdownMenu className="text-2xl text-richblack-50" />
                                            <p className="font-semibold text-richblack-50">
                                                {item.sub_section_name}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-x-3" onClick={(e) => e.stopPropagation()}>
                                            <button onClick={() => setEditSubSection({ ...item, section_id: section._id })}>
                                                <MdEdit className="text-xl text-richblack-300" />
                                            </button>
                                            <button
                                                onClick={() => [
                                                    setConfirmationModal({
                                                        text1: "Delete this Sub-Section?",
                                                        text2: "This lecture will be deleted",
                                                        btn1: "Delete",
                                                        btn2: "Cancel",
                                                        btnHandler1: () => { deleteSubSectionHandler(item._id, section._id) },
                                                        btnHandler2: () => setConfirmationModal(null),

                                                    })
                                                ]}
                                            > <RiDeleteBin6Line className="text-xl text-richblack-300" /></button>
                                        </div>

                                    </div>
                                ))}
                            {/* Adding New Lecture Button */}
                            <button
                                className="mt-3 flex items-center gap-x-1 text-yellow-50"
                                onClick={() => setAddSubSection(section._id)}
                            >
                                <FaPlus className="text-lg" />
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))}
            </div>

            {/* Modal Display */}
            {
                addSubSection ? (
                    <SubSectionModal
                        modalData={addSubSection}
                        setModalData={setAddSubSection}
                        add={true} />
                ) : viewSubSection ? (
                    <SubSectionModal
                        modalData={viewSubSection}
                        setModalData={setViewSubSection}
                        view={true} />
                ) : editSubSection ? (
                    <SubSectionModal
                        modalData={editSubSection}
                        setModalData={setEditSubSection}
                        edit={true} />
                ) : (<></>)
            }

            {confirmationModal && <ConfirmationModal modalContent={confirmationModal} />}
        </>
    )
}

export default NestedSectionView
