import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../../common/IconBtn'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate();

  return (
    <div className='text-richblack-5'>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Profile</h1>

      <ChangeProfilePicture />

      <EditProfile />

      <UpdatePassword />

      <DeleteAccount />

    </div>
  )
}

export default Settings
