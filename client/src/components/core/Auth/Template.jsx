import React from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import { FcGoogle } from 'react-icons/fc'
import frameImg from "../../../assets/Images/frame.png"

const Template = ({ title, description1, description2, image, formType }) => {
    return (
        <div className='mt-14 flex items-center justify-center'>
            <div className='w-11/12 text-white flex items-start justify-between max-w-maxContent gap-10'>
                <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
                    <div className='mt-4 text-[1.125rem] leading-[1.625rem]'>
                        <h1 className='text-4xl'>{title}</h1>
                        <div className='text-richblack-100'>{description1}</div>
                        <div className='font-edu-sa font-bold italic text-blue-100'>{description2}</div>
                    </div>

                    {/* Toggle -> Instructor and Student */}
                    {
                        formType === 'login' ?
                            (
                                <LoginForm />
                            ) :
                            (
                                <SignupForm />
                            )
                    }
                    <div className='flex w-full items-center justify-center gap-2 mt-6 text-richblack-700'>
                        <span className='h-[1px] bg-richblack-700 w-full'></span>
                        <span>OR</span>
                        <span className='h-[1px] bg-richblack-700 w-full'></span>
                    </div>
                    <button className='w-full flex flex-row justify-center items-center rounded-[8px] font-medium text-richblack-100 border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6'><FcGoogle />Signup with Google</button>
                </div>
                <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
                    <img
                        src={frameImg}
                        alt="Pattern"
                        width={558}
                        height={504}
                        lodaing="lazy"
                    />
                    <img
                        src={image}
                        alt="Student"
                        width={558}
                        height={504}
                        loading="lazy"
                        className="absolute -top-4 right-4"
                    />
                </div>

            </div>
        </div>
    )
}

export default Template
