import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../common/IconBtn';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import toast from 'react-hot-toast';
import { changePassword } from '../../../../services/operations/settingAPIs';
import isProduction from '../../../../utils/logger';

const UpdatePassword = () => {

  const [showCurrPassword, setCurrPassword] = useState(false);
  const [showNewPassword, setNewPassword] = useState(false);
  const [showConfNewPassword, setConfNewPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function submitChangePasswordHandler(data) {
    if (data.new_password !== data.confirm_password) {
      toast.error("Confirm Password Doesn't Match")
      return
    }
    if (data.new_password === data.current_password) {
      toast.error("Enter Different Password")
      return
    }
    try {
      changePassword(data, token)
    } catch (error) {
      if (!isProduction()) {
      console.log('ERROR MESSAGE - ', error.message)
      }
    }

  }
  return (
    <form onSubmit={handleSubmit(submitChangePasswordHandler)}>
      <div className='my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
        <h3 className='text-lg font-semibold text-richblack-5'>Update Password</h3>
        {/* First Row */}
        <div className='flex flex-col gap-5 lg:flex-row'>
          {/* Current Password */}
          <div className='flex flex-col gap-2 w-full'>
            <label className='w-full'>Current Password</label>
            <div className='flex text-richblack-5 relative w-full flex-col gap-2'>
              <input
                id='current_password'
                placeholder='Enter Current Pasword'
                style={{
                  boxShadow: "inset 0 -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className='form-style w-full'
                type={showCurrPassword ? "text" : "password"}
                name="current_password"
                {...register('current_password', { required: true })}
              />
              <span
                onClick={() => setCurrPassword((prev) => !prev)}
                className="absolute right-3 top-[14px] z-[10] cursor-pointer text-white"
              >
                {showCurrPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} />
                ) : (
                  <AiOutlineEye fontSize={24} />
                )}
              </span>
              {
                errors.current_password && (
                  <span className='-mt-1 text-[12px] text-yellow-100'>
                    Please Enter Your Current Password
                  </span>
                )
              }
            </div>
          </div>

          {/* New Password */}
          <div className='flex flex-col gap-2 w-full'>
            <label className='w-full'>New Password</label>
            <div className='flex text-richblack-5 relative w-full  flex-col gap-2'>
              <input
                placeholder='Enter New Pasword'
                style={{
                  boxShadow: "inset 0 -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className='form-style w-full'
                type={showNewPassword ? "text" : "password"}
                name="new_password"
                {...register('new_password', { required: true })}
              />
              <span
                onClick={() => setNewPassword((prev) => !prev)}
                className="absolute right-3 top-[14px] z-[10] cursor-pointer text-white"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} />
                ) : (
                  <AiOutlineEye fontSize={24} />
                )}
              </span>
              {
                errors.new_password && (
                  <span className='-mt-1 text-[12px] text-yellow-100'>
                    Please Enter Your New Password
                  </span>
                )
              }
            </div>
          </div>
        </div>
        {/* Second Row */}
        <div className='flex flex-col gap-5 lg:flex-row'>
          {/* confirm New Password */}
          <div className='flex flex-col gap-2 w-full'>
            <label className='w-full'>Confirm New Password</label>
            <div className='flex text-richblack-5 relative w-full  flex-col gap-2'>
              <input
                placeholder='Enter Confirmed Pasword'
                style={{
                  boxShadow: "inset 0 -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className='form-style w-full'
                type={showConfNewPassword ? "text" : "password"}
                name="confirm_password"
                {...register('confirm_password', { required: true })}
              />
              <span
                onClick={() => setConfNewPassword((prev) => !prev)}
                className="absolute right-3 top-[14px] z-[10] cursor-pointer text-white"
              >
                {showConfNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} />
                ) : (
                  <AiOutlineEye fontSize={24} />
                )}
              </span>
              {
                errors.confirm_password && (
                  <span className='-mt-1 text-[12px] text-yellow-100'>
                    Please Enter Confirm Password
                  </span>
                )
              }
            </div>
          </div>
          {/* Cancel/Save Button */}
          <div className='flex gap-4 w-full items-end'>
            <button
              onClick={() => {
                navigate('/dashboard/my-profile')
              }}
              className='cursor-pointer w-full rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 h-[50px]'
            >
              Cancel
            </button>
            <button className='flex items-center justify-center border border-yellow-50 bg-transparent g-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 text-center bg-yellow-50 h-[50px] w-full' type='submit'>Save</button>

          </div>
        </div>
      </div>
    </form>
  )
}

export default UpdatePassword
