import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import CourseCard from './CourseCard'
import HighlightText from './HighlightText'

const TabNavigationAndCards = () => {
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0])
    const [currentCourses, setCurrentCourses] = useState(HomePageExplore[0].courses);
    const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag);

    function setCard(value) {
        setCurrentTab(value);
        let result = HomePageExplore.filter((ele) => ele.tag === value);
        console.log(result)
        setCurrentCard(result[0].courses[0])
        setCurrentCourses(result[0].courses)
    }

    // console.log("currentCard", currentCard, "\ncurrentCourse", currentCourse, "\ncurrentTab", currentTab)
    return (
        <div className='mx-auto relative flex flex-col gap-3 items-center justify-center my-8 '>
            <div>
                <h1 className='text-white'>Unlock the<HighlightText text={"Power of Code"} /></h1>
                <span className='text-richblack-800'>Learn to Build Anything You Can Imagine</span>
            </div>
            <div className='flex flex-col gap-10'>
                <div className='text-richblack-300 bg-richblack-800 flex gap-8 w-fit p-2 rounded-full mx-auto my-8 mb-[220px]'>
                    {
                        HomePageExplore.map((element, index) => (
                            <div onClick={() => setCard(element.tag)} key={index} className={`${element.tag === currentTab ? "bg-black text-white" : "bg-richblack-800"} font-semibold tracking-wide cursor-pointer p-3 rounded-full min-w-[80px] text-center
                        `}>{element.tag}</div>
                        ))
                    }
                </div>
                <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-[80%] lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3'>
                    {
                        currentCourses.map((course, index) => (
                            <CourseCard
                                cardData={course}
                                setCurrentCard={setCurrentCard}
                                key={index}
                                currentCard={currentCard}
                            />
                        ))
                    }

                </div>
            </div>

        </div>
    )
}

export default TabNavigationAndCards
