import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png'

const Logos = [
    {
        logo: Logo1,
        title: 'Leadership',
        description: 'Fully committed to the success company'
    },
    {
        logo: Logo2,
        title: 'Responsibility',
        description: 'Students will always be our top priority'
    },
    {
        logo: Logo3,
        title: 'Flexibility',
        description: 'The ability to switch is an important skills'
    },
    {
        logo: Logo4,
        title: 'Solve the problem',
        description: 'Code your way to a solution'
    }
]
const RoadmapSection = () => {
    return (
        <div className='bg-pure-greys-5 py-16 w-full'>
            <div className='w-11/12 mx-auto max-w-maxContent flex items-start justify-between gap-10'>
                <div className='w-[40%] flex flex-col'>
                    {
                        Logos.map((obj, index) => (
                            <React.Fragment key={index}>
                                <div className='flex item-center gap-6'>
                                    <div className='w-14 h-14 overflow-hidden border-white shadow-[#00000012] shadow-[0_0_62px_0] rounded-full bg-white flex items-center justify-center'>
                                        <img className=' p-3' src={obj.logo} alt='Roadmap' />
                                    </div>
                                    <div>
                                        <h6 className='text-[18px] font-semibold'>{obj.title}</h6>
                                        <span className='text-base'>{obj.description}</span>
                                    </div>
                                </div>
                                {
                                    index < 3 && (
                                        <div className='ms-7 border-l-2 border-dashed h-16 border-richblack-300'></div>
                                    )
                                }
                            </React.Fragment>
                        ))}
                </div>
                <div className='w-[50%]'>
                    <div>
                        <img src={timelineImage} alt='timelineImage' />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default RoadmapSection
