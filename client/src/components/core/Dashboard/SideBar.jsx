import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import SideBarLinks from './SideBarLinks'
import { VscSignOut } from "react-icons/vsc";
import { logout } from '../../../services/operations/authAPIs';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationModal';

const SideBar = () => {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  return (
    <div className="flex h-[calc(100vh-3.9rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 text-white">
      <div className='flex flex-col'>
        {
          sidebarLinks.map((link) => {
            if (link?.type && user?.account_type !== link.type) return null;
            return <SideBarLinks linkPath={link?.path} key={link?.id} name={link?.name} icon={link?.icon} type={link?.type} />
          })
        }
      </div>
      <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700"></div>
      <SideBarLinks linkPath={'/dashboard/settings'} name="Settings" icon={"VscSettingsGear"} />
      <button className="px-8 py-2 text-sm font-medium text-richblack-300"
        onClick={() => {
          setConfirmationModal({
            text1: "Are you sure",
            text2: "You will be logged out for you account",
            btn1: "Logout",
            btn2: "Cancel",
            btnHandler1: () => { dispatch(logout(navigate)) },
            btnHandler2: () => { setConfirmationModal(null) },
          })
        }}>
        <div className="flex items-center gap-x-2">
          <VscSignOut className="text-lg" />
          <span>Logout</span>
        </div>
      </button>
      {confirmationModal && <ConfirmationModal modalContent={confirmationModal} />}
    </div>
  )
}

export default SideBar
