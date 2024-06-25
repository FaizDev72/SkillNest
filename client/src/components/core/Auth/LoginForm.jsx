import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ScaleLoader from "react-spinners/ScaleLoader";
import { login } from '../../../services/operations/authAPLs';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    function onChangeHandler(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    function formSubmitHandler(e) {
        e.preventDefault();
        const { email, password } = formData;
        dispatch(login(email, password, navigate))
    }

    return (
        <div>
            {
                loading ?
                    (<ScaleLoader
                        color={'#ffffff'}
                    />) :
                    (
                        <form className='gap-6 flex flex-col mt-6' onSubmit={formSubmitHandler}>
                            <div className='flex flex-col'>
                                <label for='email' className='mb-1 text-md leading-[1.375rem] text-richblack-5'>Email Address<sup className="text-pink-200">*</sup></label>
                                <input id='email' placeholder='Enter Email Address' type='email'
                                    name='email'
                                    onChange={onChangeHandler}
                                    style={{
                                        boxShadow: "inset 0 -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className='rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label className='mb-1 text-md leading-[1.375rem] text-richblack-5'>Create Pasword<sup className="text-pink-200">*</sup></label>
                                <div className='flex text-richblack-5 relative w-full '>
                                    <input
                                        placeholder='Enter Pasword'
                                        style={{
                                            boxShadow: "inset 0 -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className='rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 w-full'
                                        required
                                        onChange={onChangeHandler}
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
                            <button className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 w-full'>Login</button>
                        </form>
                    )
            }
        </div>
    )
}

export default LoginForm
