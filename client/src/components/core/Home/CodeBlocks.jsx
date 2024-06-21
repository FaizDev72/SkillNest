import React from 'react'
import CTAButton from '../../common/CTAButton'
import {TypeAnimation} from 'react-type-animation'

const CodeBlocks = ({ title, description, btn1, btn2, code, styling, backgroundGradient, codeColor }) => {
    return (
        <div className={`${styling} flex text-white align-center text-left gap-10 justify-between`}>
            <div className='text-left flex flex-col gap-8 w-[47%]'>
                {title}
                <div className='text-base text-richblack-300 w-[95%]  font-semibold'>
                    {description}
                </div>
                <div className='flex gap-7 mt-8'>
                    <CTAButton active={btn1.active} linkto={btn1.linkto}>{btn1.btnText}</CTAButton>
                    <CTAButton active={btn2.active} linkto={btn2.linkto}>{btn2.btnText}</CTAButton>
                </div>

            </div>
            <div className='w-[470px] code-border h-fit flex relative leading-6 text-sm tracking-wide p-3'>
                <div className={`${backgroundGradient} absolute`}></div>
                <div className='text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold '>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                    <span>11</span>
                    <span>12</span>
                </div>
                <div className={`ms-3 ${codeColor} flex flex-col gap-2 font-bold font-mono cursor-text`}>
                    <TypeAnimation
                        sequence={[code, 2000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={
                            {
                                whiteSpace: "pre-line",
                                display: "block",
                            }
                        }
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default CodeBlocks
