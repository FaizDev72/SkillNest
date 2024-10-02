import React from 'react'
import { FaShareSquare } from "react-icons/fa";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { ACCOUNT_TYPE } from '../../../utils/contants'
import toast from 'react-hot-toast';
import { addToCart } from '../../redux/slice/cartSlice';
import copy from 'copy-to-clipboard';


const CourseFloatingCard = ({ response, paymentHandler, setConfirmationModal }) => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleShare() {
        copy(window.location.href)
        toast.success("Link copied to clipboard")
    }

    function handleAddToCart() {
        if (user && user?.account_type === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor. You can't buy a course.")
            return
        }

        if (token) {
            dispatch(addToCart(response.course))
        } else {
            setConfirmationModal({
                text1: "You are not logged in!",
                text2: "Please login to add To Cart",
                btn1: "Login",
                btn2: "Cancel",
                btnHandler1: () => navigate("/login"),
                btnHandler2: () => setConfirmationModal(null),
            })
        }
    }

    const { thumbnail, price } = response.course

    return (
        <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5'>
            <div>
                <img src={thumbnail} alt="course thumbnail" className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full" />
            </div>
            <div className='px-4'>
                <div className="space-x-3 pb-4 text-3xl font-semibold">
                    Rs. {price}
                </div>
                <div className='flex flex-col gap-4'>
                    {
                        response?.course.student_enrolled.includes(response._id) ? (
                            <Link to={'/course'} className="text-center w-full yellowButton">Go to Course</Link>
                        ) : (
                            <>
                                {user?.account_type !== ACCOUNT_TYPE.INSTRUCTOR && (
                                    <>
                                        <button
                                            className="w-full yellowButton" onClick={user && response?.course?.student_enrolled.includes(user?._id) ? () => navigate("/dashboard/enrolled-courses") : { paymentHandler }}
                                        >
                                            {
                                                user && response?.course?.student_enrolled.includes(user?._id) ? "Go to Course" : "Bduy Now"
                                            }</button>
                                        {(!user && !response?.course?.student_enrolled.includes(user?._id)) && (
                                            <button className="w-full blackButton" onClick={handleAddToCart}>Add to Cart</button>)}
                                    </>
                                )}
                            </>
                        )
                    }
                </div>
                <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
                    30-Day Money-Back Guarantee
                </p>
                <div className={``}>
                    <p className={`my-2 text-xl font-semibold `}>
                        This Course Includes :
                    </p>
                    <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                        {response?.course.instructions?.map((item, i) => {
                            return (
                                <p className={`flex gap-2`} key={i}>
                                    <IoIosArrowDroprightCircle />
                                    <span>{item}</span>
                                </p>
                            )
                        })}
                    </div>
                </div>
                <div className="text-center">
                    <button className="mx-auto flex items-center gap-2 py-6 text-yellow-100" onClick={handleShare}>
                        <FaShareSquare size={15} /> Share
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CourseFloatingCard
