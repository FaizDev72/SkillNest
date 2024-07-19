import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import { FiUpload } from 'react-icons/fi'
import { updateDisplayPicture } from '../../../../services/operations/settingAPIs'

const ChangeProfilePicture = () => {
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [previewSource, setPreviewSource] = useState(null);
    const [imageFile, setImageFile] = useState(null)
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);

    function refTrigger(event) {
        fileInputRef.current.click();
    }

    function previewFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    function handleFileChange(event) {
        // console.log(event.target.files[0])
        const file = event.target.files[0];
        if (file) {
            console.log(file, "Printing File")
            setImageFile(file);
            previewFile(file);
        }

    }

    function uploadFileHandler() {
        // console.log(imageFile, " Printing Image File")
        // console.log(previewSource, " Printing previewFile")
        try {
            setLoading(true)
            console.log(user, "printing user before")
            const formData = new FormData();
            formData.append('displayPicture', imageFile);
            dispatch(updateDisplayPicture(formData, token)).then(() => setLoading(false))
            console.log(user, "printing user after")
        } catch (error) {

        }       
    }

    useEffect(() => {
        if (imageFile) {
            previewFile(imageFile)
        }
    }, [imageFile])

    return (
        <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
            <div className='flex items-center gap-4 w-full'>
                <img src={previewSource || user?.profile?.image} alt='ProfileImage' className='aspect-square w-[78px] rounded-full object-cover' />
                <div className='space-y-2'>
                    <span>Change Profile Picture</span>
                    <div className='flex gap-3'>
                        <input type='file' placeholder='select' className='hidden' ref={fileInputRef} accept='image/jpeg image/jpg image/png image/svg' onChange={handleFileChange} />
                        <div onClick={refTrigger} disabled={loading} className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'>select</div>
                        <IconBtn
                            text={loading ? "Uploading" : "Upload"}
                            onClick={uploadFileHandler}
                        >
                            {
                                !loading && (
                                    <FiUpload className='text-lg text-richblack-900' />
                                )
                            }
                        </IconBtn>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeProfilePicture
