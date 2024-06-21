import React from 'react'
import HighlightText from './HighlightText'
import Image1 from '../../../assets/Images/Know_your_progress.svg'
import Image2 from '../../../assets/Images/Compare_with_others.svg'
import Image3 from '../../../assets/Images/Plan_your_lessons.svg'
import CTAButton from '../../common/CTAButton'

const LearningLanguage = () => {
    return (
        <div className='bg-pure-greys-5 w-full py-16'>
            <div className='w-11/12 max-w-maxContent mx-auto flex items-center justify-center flex-col'>
                <div className='flex flex-col items-center justify-center mb-6 max-w-[75%] text-center font-semibold'>
                    <h1 className='text-4xl font-semibold'>Your swiss knife for <HighlightText text={"learning any language"}></HighlightText></h1>
                    <span className='text-[18px] content-center'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</span>
                </div>
                <div className='flex justify-center'>
                    <img src={Image1} alt='Learning section' className='object-contain  lg:-mr-32' />
                    <img src={Image2} alt='Learning section' className='object-contain lg:-mb-10 lg:-mt-0 -mt-12' />
                    <img src={Image3} alt='Learning section' className='object-contain  lg:-ml-36 lg:-mt-5 -mt-16' />
                </div>
                <div className='mt-10'>
                    <CTAButton active={true} linkto={"/signup"} >Learn More</CTAButton>
                </div>
            </div>
        </div>
    )
}

export default LearningLanguage
