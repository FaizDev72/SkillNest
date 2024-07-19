import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"

import { removeItemFromCart } from '../../../redux/slice/cartSlice'

const RenderCartItems = () => {
    const { cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    return (
        <div className="flex flex-1 flex-col">
            {
                cart.map((course, index) => (
                    <div
                        key={course._id}
                        className={`flex w-full flex-wrap items-start justify-between gap-6 ${index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
                            } ${index !== 0 && "mt-6"} `}
                    >
                        <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                            <img src={course?.thumbnail} alt="Thumbnail" className="h-[148px] w-[220px] rounded-lg object-cover" />
                            <div className="flex flex-col space-y-1">
                                <span className="text-lg font-medium text-richblack-5">{course?.course_name}</span>
                                <span className="text-sm text-richblack-300">{course?.category?.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-5">4.5</span>
                                    <ReactStars
                                        count={5}
                                        value={course?.ratingAndReviews?.length}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                        emptyIcon={<FaStar />}
                                        fullIcon={<FaStar />}
                                    />
                                </div>
                                <span className="text-richblack-400">
                                    {course?.ratingAndReviews?.length} Ratings
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                            <button
                                onClick={() => dispatch(removeItemFromCart(course._id))}
                                className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                            >
                                <RiDeleteBin6Line />
                                <span>Remove</span>
                            </button>
                            <p className="mb-6 text-3xl font-medium text-yellow-100">
                                ₹ {course?.price}
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default RenderCartItems
