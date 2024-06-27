import React, { useEffect, useState } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { useDispatch, useSelector } from 'react-redux';
import { BiArrowBack } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { getTokenForPasswordReset, sendOTP } from '../services/operations/authAPIs';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { loading, signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval;
    if (emailSent) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            return 0; // Stop the timer at 0
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [emailSent]);

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(getTokenForPasswordReset(email, setEmailSent));
  }

  function handleResendEmail(e) {
    e.preventDefault();
    setTimer(60);
    dispatch(getTokenForPasswordReset(email, setEmailSent));
  }

  return (
    <div className="text-white flex justify-center items-center min-h-[calc(100vh-6rem)] flex-col">
      {loading ? (
        <div className="flex items-center justify-center mx-auto">
          <ScaleLoader color={'#ffffff'} />
        </div>
      ) : (
        <div className="flex item-center justify-center">
          <div className="max-w-[500px] p-4 lg:p-8">
            <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem] mb-2">
              {!emailSent ? 'Reset Your Password' : 'Check Your Email'}
            </h1>
            <span className="text-xl leading-[1.625rem] my-4 text-richblack-100">
              {!emailSent
                ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery"
                : `We have sent the reset email to ${email}`}
            </span>
            <form onSubmit={handleOnSubmit} className="mt-6">
              {!emailSent && (
                <label className="w-full">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Email Address
                    <sup className="text-pink-200"> * </sup>
                  </p>
                  <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email Address"
                    className="form-style w-full"
                  />
                </label>
              )}
              {emailSent && (
                <span>
                  <span className="text-blue-200 font-bold">{timer}</span> seconds to resend email
                </span>
              )}
              {!emailSent ? (
                <button
                  type="submit"
                  className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleResendEmail}
                  className={`mt-6 w-full rounded-[8px] py-[12px] px-[12px] font-medium text-richblack-900 ${timer > 0 ? 'bg-richblack-400 cursor-not-allowed button-disabled' : 'bg-yellow-50'}`}
                  disabled={timer > 0}
                >
                  Resend Email
                </button>
              )}
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
              ></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
