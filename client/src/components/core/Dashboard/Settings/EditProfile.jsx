import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../../common/IconBtn'
import { updateProfile } from '../../../../services/operations/settingAPIs'
const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "other"]

const EditProfile = () => {

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const dispatch = useDispatch();

  function submitProfileInfo(data) {
    console.log("FormData ->>>>>>>> ", data)
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log('ERROR MESSAGE - ', error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitProfileInfo)}>
      <div className='my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
        <h3 className='text-lg font-semibold text-richblack-5'>Profile Information</h3>
        {/* First Row */}
        <div className='flex flex-col gap-5 lg:flex-row'>
          {/* First Name */}
          <div className='flex flex-col gap-2 w-full'>
            <label className='w-full'>First Name</label>
            <input
              type='text'
              placeholder='First Name'
              defaultValue={user?.first_name}
              className='form-style w-full'
              id='first_name'
              {...register("first_name", { required: true })}
            />
            {
              errors.first_name && (
                <span className='-mt-1 text-[12px] text-yellow-100'>
                  Please Enter Your First Name
                </span>
              )}
          </div>

          {/* Last Name */}
          <div className='flex flex-col gap-2 w-full'>
            <label className='w-full'>Last Name</label>
            <input
              type='text'
              placeholder='Last Name'
              defaultValue={user?.last_name}
              className='form-style w-full'
              id='last_name'
              {...register("last_name", { required: true })}
            />
            {
              errors.last_name && (
                <span className='-mt-1 text-[12px] text-yellow-100'>
                  Please Enter Your First Name
                </span>
              )}
          </div>
        </div>
        {/* Second Row */}
        <div className='flex flex-col gap-5 lg:flex-row'>
          {/* DOB */}
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor='DOB' className='w-full'>Date of Birth</label>
            <input
              type='date'
              defaultValue={user?.profile?.DOB}
              className='form-style w-full'
              name='DOB'
              id='DOB'
              {...register("DOB", {
                required: {
                  value: true,
                  message: "Please Enter your Date Of Birth"
                },
                max: {
                  value: new Date().toISOString().split('T')[0],
                  message: "Date Of Birth cannot be in the future."
                }
              })}
            />
            {errors.DOB && (
              <span className='-mt-1 text-[12px] text-yellow-100'>
                {errors.DOB.message}
              </span>
            )}
          </div>

          {/* Gender */}
          <div className='flex flex-col gap-2 w-full'>
            <label className='w-full'>Gender</label>
            <select
              type='text'
              placeholder='gender'
              defaultValue={user?.profile?.gender}
              className='form-style w-full'
              id='gender'
              {...register("gender", { required: true })}
            >
              {
                genders.map((ele, i) => (
                  <option key={i} value={ele}>{ele}</option>
                ))
              }
            </select>
            {errors.gender && (
              <span className='-mt-1 text-[12px] text-yellow-100'>
                Please Select Your Gender
              </span>
            )}
          </div>
        </div>
        {/* Third Row */}
        <div className='flex flex-col gap-5 lg:flex-row'>
          {/* Contact No. */}
          <div className='flex flex-col gap-2 w-full'>
            <label className='w-full'>Contact Number</label>
            <input
              type='tel'
              placeholder='phone'
              defaultValue={user?.profile?.phone}
              className='form-style w-full'
              id='phone'
              {...register("phone", {
                required: {
                  value: true,
                  message: "Please Enter Your Contact Number"
                },
                maxLength: { value: 12, message: 'Invalid Contact Number' },
                minLength: { value: 10, message: 'Invalid Contact Number' }
              })}
            />
            {errors.phone && (
              <span className='-mt-1 text-[12px] text-yellow-100'>
                {errors.phone.message}
              </span>
            )}
          </div>
          {/* About */}
          <div className='flex flex-col gap-2 w-full'>
            <label className='w-full'>About</label>
            <input
              type='text'
              placeholder='about'
              defaultValue={user?.profile?.about}
              className='form-style w-full'
              id='about'
              {...register("about", { required: true })}
            />
            {
              errors.about && (
                <span className='-mt-1 text-[12px] text-yellow-100'>
                  Please Enter Your About
                </span>
              )}
          </div>
        </div>
      </div>

      <div className='flex justify-end gap-2'>
        <button
          onClick={() => {
            navigate('/dashboard/my-profile')
          }}
          className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
        >
          Cancel
        </button>
        <IconBtn type='submit' text='Save' />
      </div>
    </form>
  )
}

export default EditProfile
