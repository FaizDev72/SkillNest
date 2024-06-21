import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

const SignupForm = () => {
    const [accountType, setAccountType] = useState('student')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfPassword, setShowConfPassword] = useState(false)

    return (
        <div>
            <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
                <button className={`${accountType === 'student' ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`} onClick={() => setAccountType('student')}>Student</button>
                <button className={`${accountType === 'instructor' ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`} onClick={() => setAccountType('instructor')}>Instructor</button>
            </div>

            <form className='w-fit gap-6 flex flex-col'>
                <div className='flex item-center gap-6'>
                    <div className='flex flex-col max-w-[50%]'>
                        <label for='first-name' className='mb-1 text-md leading-[1.375rem] text-richblack-5'>First Name<sup className="text-pink-200">*</sup></label>
                        <input
                            id='first-name'
                            placeholder='Enter First Name'
                            style={{
                                boxShadow: "inset 0 -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className='rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                        />
                    </div>
                    <div className='flex flex-col max-w-[50%]'>
                        <label for='last-name' className='mb-1 text-md leading-[1.375rem] text-richblack-5'>Last Name<sup className="text-pink-200">*</sup></label>
                        <input
                            id='last-name'
                            placeholder='Enter Last Name'
                            style={{
                                boxShadow: "inset 0 -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className='rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                        />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label for='email' className='mb-1 text-md leading-[1.375rem] text-richblack-5'>Email Address<sup className="text-pink-200">*</sup></label>
                    <input id='email' placeholder='Enter Email Address' type='email'
                        style={{
                            boxShadow: "inset 0 -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className='rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                    />
                </div>
                <div className='flex item-center gap-6'>
                    <div className='flex flex-col'>
                        <label className='mb-1 text-md leading-[1.375rem] text-richblack-5'>Create Pasword<sup className="text-pink-200">*</sup></label>
                        <div className='flex text-richblack-5 relative'>
                            <input
                                placeholder='Enter Pasword'
                                style={{
                                    boxShadow: "inset 0 -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className='rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-[14px] z-[10] cursor-pointer text-white"
                            >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} />
                                ) : (
                                    <AiOutlineEye fontSize={24} />
                                )}
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col '>
                        <label className='mb-1 text-md leading-[1.375rem] text-richblack-5'>Confirm Password<sup className="text-pink-200">*</sup></label>
                        <div className='flex text-richblack-5 relative'>
                            <input
                                placeholder='Confirm Pasword'
                                style={{
                                    boxShadow: "inset 0 -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className='rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                                required
                                type={showConfPassword ? "text" : "password"}
                                name="confirm-password"
                            />
                            <span
                                onClick={() => setShowConfPassword((prev) => !prev)}
                                className="absolute right-3 top-[14px] z-[10] cursor-pointer text-white"
                            >
                                {showConfPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} />
                                ) : (
                                    <AiOutlineEye fontSize={24} />
                                )}
                            </span>
                        </div>
                    </div>
                </div>
                <button className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 font-semibold'>Create Account</button>
            </form>

        </div>
    )
}

export default SignupForm
