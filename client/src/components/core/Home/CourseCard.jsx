import React from 'react'
import {HiUsers} from 'react-icons/hi'
import {ImTree} from 'react-icons/im'

const CourseCard = ({ currentCard, setCurrentCard, cardData }) => {
    // console.log(cardData)
    return (
        <div className={`w-[30%] flex flex-col gap-4 justify-between item-center ${currentCard === cardData ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50" : "bg-richblack-800"} cursor-pointer`} onClick={()=>setCurrentCard(cardData)}>
            <div className='pb-14 px-6 pt-6 border-dashed border-b-2'>
                <h4 className={`mb-3 text-xl font-semibold ${currentCard === cardData ? "text-black" : "text-white"} `}>{cardData.heading}</h4>
                <p className='text-lg text-start text-richblack-400'>{cardData.description}</p>
            </div>
            <div className={`flex justify-between ${currentCard === cardData ? "text-blue-300" : "text-richblack-300"
                } px-6 pb-4 font-medium`}>
                <span className='flex gap-2 items-center justify-center'>
                <HiUsers />
                    {cardData.level}
                </span>
                <span className='flex gap-2 items-center justify-center'>
                <ImTree />  
                    {cardData.lessionNumber}
                    {" "}
                    Lessions
                </span>
            </div>
        </div>
    )
}

export default CourseCard
