import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from '../../common/CTAButton'
import InstructorImage from '../../../assets/Images/Instructor.png'

const InstructorSection = () => {
    return (
        <div className='w-11/12 max-w-maxContent flex items-center p-12 text-white justify-between mx-auto gap-12'>
            <div>
                <img src={InstructorImage} alt='Instructor' />
            </div>
            <div className='flex flex-col items-start justify-center gap-7 lg:w-[50%]'>
                <h1 className='text-4xl font-semibold'>Become a <HighlightText text={"Instructor"} /></h1>
                <span className='text-richblack-300 text-[16px] font-semibold'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</span>
                <CTAButton active={true} linkto={"/signup"}>Start Teaching Today</CTAButton>
            </div>
        </div>
    )
}

export default InstructorSection
