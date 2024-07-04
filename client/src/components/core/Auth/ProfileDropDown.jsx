import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { AiOutlineCaretDown } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'
import { useOnclickOutside } from '../../../hooks/useOnClickOutside'
import { logout } from '../../../services/operations/authAPIs'


const ProfileDropDown = () => {
    const { user } = useSelector((state) => state.profile)
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useOnclickOutside(ref, () => { setOpen(false) });

    if (!user) return null;

    return (
        <div className='relative' onClick={() => setOpen(true)}>
            <div className='flex items-center justify-center gap-1 cursor-pointer'>
                <img src={user?.profile?.image} alt='' className='rounded-full' width={35} />
                <AiOutlineCaretDown />
            </div>
            {
                open && (
                    <div className='absolute  p-4 top-[42px] right-[0px] z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 flex flex-col gap-3 items-start justify-start' ref={ref} onClick={(e) => e.stopPropagation()}>
                        <Link to={'/dashboard/my-profile'} onClick={() => setOpen(true)}>
                            <div className='flex gap-1 items-center justify-center'>
                                <VscDashboard />
                                <div>Dashboard</div>
                            </div>
                        </Link>
                        <div className='flex gap-1 items-center justify-center cursor-pointer' onClick={() => {
                            setOpen(true)
                            dispatch(logout(navigate))
                        }}>
                            <VscSignOut />
                            <div>Logout</div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ProfileDropDown
