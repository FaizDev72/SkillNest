import React, { useState } from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { resetPassword } from '../services/operations/authAPIs';

const UpdatePassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfPassword, setShowConfPassword] = useState(false)
    const { loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        password: '',
        confirm_password: ''
    });

    const { password, confirm_password } = formData;

    function handleFormOnChange(event) {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    function handleOnSubmit(e) {
        e.preventDefault();

        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(token, password, confirm_password, navigate));

    }

    return (
        <div className='text-white flex items-center justify-center min-h-[calc(100vh-6rem)]'>
            {
                loading ?
                    (
                        <div className='flex items-center justify-center mx-auto'>
                            <ScaleLoader
                                color={'#ffffff'}
                            />
                        </div>
                    ) :
                    (
                        <div className='flex item-center justify-center'>
                            <div className='max-w-[500px] p-4 lg:p-8 '>
                                <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem] mb-3'>Choose new password</h1>
                                <span className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">Almost done. Enter your new password and youre all set.</span>
                                <form onSubmit={handleOnSubmit} className='mt-3'>
                                    <div className='flex item-center gap-6 flex-col'>
                                        <div className='flex flex-col'>
                                            <label className='mb-1 text-md leading-[1.375rem] text-richblack-5'>New Password<sup className="text-pink-200">*</sup></label>
                                            <div className='flex text-richblack-5 relative'>
                                                <input
                                                    placeholder='Enter Pasword'
                                                    style={{
                                                        boxShadow: "inset 0 -1px 0px rgba(255, 255, 255, 0.18)",
                                                    }}
                                                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                                                    required
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    value={password}
                                                    onChange={handleFormOnChange}
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
                                        <div className='flex flex-col w-full'>
                                            <label className='mb-1 text-md leading-[1.375rem] text-richblack-5'>Confirm New Password<sup className="text-pink-200">*</sup></label>
                                            <div className='flex text-richblack-5 relative'>
                                                <input
                                                    placeholder='Confirm Pasword'
                                                    style={{
                                                        boxShadow: "inset 0 -1px 0px rgba(255, 255, 255, 0.18)",
                                                    }}
                                                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                                                    required
                                                    type={showConfPassword ? "text" : "password"}
                                                    name="confirm_password"
                                                    value={confirm_password}
                                                    onChange={handleFormOnChange}
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
                                    <button className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-semibold text-richblack-900">Reset Password</button>
                                </form>
                                <div className="mt-6 flex items-center justify-between">
                                    <Link to="/signup">
                                        <p className="flex items-center gap-x-2 text-richblack-5">
                                            <BiArrowBack />
                                            Back To Signup
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default UpdatePassword
