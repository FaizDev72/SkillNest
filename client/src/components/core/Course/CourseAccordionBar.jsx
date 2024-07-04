import { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import { HiOutlineVideoCamera } from "react-icons/hi"

const CourseAccordionBar = ({ section, handleActive, isActive }) => {
    const contentEle = useRef(null)
    const [active, setActive] = useState(false)
    useEffect(() => {
        setActive(isActive.includes(section._id));
    }, [isActive])

    const [sectionHeight, setSectionHeight] = useState(0);

    useEffect(() => {
        setSectionHeight(active ? contentEle.current.scrollHeight : 0)
    }, [active])
    return (
        <div className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
            <div>
                <div className="flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]" onClick={() => handleActive(section._id)}>
                    <div className='flex items-center justify-start  gap-2' onClick={handleActive}>
                        <i className={`${isActive.includes(section._id) ? "rotate-180" : "rotate-0"}`}><AiOutlineDown /></i>
                        <span>{section?.section_name}</span>
                    </div>
                    <div>{section?.sub_section.length}  (s)</div>

                </div>
            </div>
            <div className="relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]" ref={contentEle} style={{ height: sectionHeight, }}>
                <div className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">
                    {
                        section.sub_section.map((subSec, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <i><HiOutlineVideoCamera /></i>
                                <div>{subSec.sub_section_name}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CourseAccordionBar
