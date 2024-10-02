import React, { useState } from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { RxCountdownTimer } from "react-icons/rx";
import "../App.css";
import { sendOTP, signUp } from '../services/operations/authAPIs';

const VerifyEmail = () => {
    const { loading, signupData } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');

    function handleOnSubmit(e) {
        e.preventDefault();

        const { first_name, last_name, email, password, account_type, confirm_password } = signupData;
        dispatch(signUp(first_name, last_name, email, password, confirm_password, account_type, navigate, otp));
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
                                <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>Verify Email</h1>
                                <span className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100 mt-1">A verification code has been sent to you. Enter the code below</span>
                                <form onSubmit={handleOnSubmit} className='mt-3'>
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        renderInput={(props) => (
                                            <input
                                                required
                                                name='otp'
                                                {...props}
                                                placeholder="-"
                                                style={{
                                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                                                }}
                                                className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                            />
                                        )}
                                        containerStyle={{
                                            justifyContent: "space-between",
                                            gap: "0 6px",
                                        }}
                                    />
                                    <button className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-semibold text-richblack-900">Verify Email</button>
                                </form>
                                <div className="mt-6 flex items-center justify-between">
                                    <Link to="/signup">
                                        <p className="flex items-center gap-x-2 text-richblack-5">
                                            <BiArrowBack />
                                            Back To Signup
                                        </p>
                                    </Link>

                                    <button
                                        className="flex items-center text-blue-100 gap-x-2"
                                        onClick={() => dispatch(sendOTP(signupData.email, navigate))}
                                    >
                                        <RxCountdownTimer /> Resend it
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default VerifyEmail
