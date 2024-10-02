import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../components/common/Footer'

import { GrCircleInformation } from "react-icons/gr";
import { TbWorld } from "react-icons/tb";
import { fetchCourseDetails } from '../services/operations/courseDetailAPIs';
import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from '../services/formatDate';
import Error from './Error';
// import { GetAvgRating } from '../utils/avgRating';
import RatingStars from '../components/common/RatingStars';
import { getAverageRating } from '../services/operations/ratingAPIs';
import CourseFloatingCard from '../components/core/Course/CourseFloatingCard';
import ReactMarkdown from 'react-markdown'
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar';
import { buyCourse } from '../services/operations/paymentHandlerAPI';
import ConfirmationModal from "../components/common/ConfirmationModal"
import isProduction from '../utils/logger';

const CourseDetails = () => {
    const { course_id } = useParams();
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.profile)
    const [response, setResponse] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null)

    useEffect(() => {
        const fetchDataHandler = async () => {
            try {
                const courseDetail = await fetchCourseDetails(course_id)
                setResponse(courseDetail);
            } catch (error) {
                if (!isProduction()) {
                console.log("Could not fetch Course Details")
                }
            }
        }

        fetchDataHandler();
    }, [course_id])

    const [avgRatingCount, setAvgRatingCount] = useState(0);

    useEffect(() => {
        if (response) {
            let count = 3.2
            // const count = GetAvgRating(response.data.rating_review);
            // const count = getAverageRating(course_id)
            setAvgRatingCount(count);
        }
    }, [response])

    const [totalLectures, setTotalLectures] = useState(0);

    useEffect(() => {
        if (response) {
            let lectures = 0;
            response?.data?.course.course_content.forEach(section => {
                lectures += section.sub_section.length || 0;
            });

            setTotalLectures(lectures)
        }
    }, [response])

    const [isActive, setIsActive] = useState(Array(0));
    function handleActive(id) {
        setIsActive(
            !isActive.includes(id) ?
                isActive.concat([id]) :
                isActive.filter((e) => e !== id))
    }

    function paymentHandler() {
        if (token) {
            buyCourse([course_id], token, user, dispatch, navigate)
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to Purchase Course.",
            btn1: "Login",
            btn2: "Cancel",
            btnHandler1: () => navigate("/login"),
            btnHandler2: () => setConfirmationModal(null),
        })
    }

    if (loading || !response) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    if (!response.success) {
        return <Error />
    }

    const {
        _id,
        course_name,
        description,
        thumbnail,
        price,
        course_learning,
        course_content,
        rating_review,
        instructor,
        student_enrolled,
        createdAt,
    } = response?.data.course

    return (
        <>

            <div className=' text-white bg-richblack-800'>
                {/* Hero Section */}
                <div className='mx-auto box-content lg:w-[1260px] w-full py-16 relative'>
                    <div className='md:max-w-[65%] text-lg gap-4 flex items-start flex-col'>
                        <h1 className='text-4xl font-bold text-richblack-5 sm:text-[42px]'>{course_name}</h1>
                        <span className='text-richblack-200'>{description}</span>
                        <div className='flex items-center justify-center gap-1'>
                            {avgRatingCount}<RatingStars Review_Count={avgRatingCount} Star_Size={24} /> ({rating_review.length} reviews) {student_enrolled.length} students enrolled
                        </div>
                        <span>Created By {instructor.first_name + " " + instructor.last_name}</span>
                        <div className='flex items-center justify-center gap-3'><GrCircleInformation />Created at {formatDate(createdAt)} <span className='flex items-center justify-center gap-1'> <TbWorld />English</span></div>
                    </div>

                    {/* Floating Card */}
                    <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
                        <CourseFloatingCard response={response.data} setConfirmationModal={setConfirmationModal} paymentHandler={paymentHandler} />
                    </div>

                </div>
            </div>

            <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px] mt-14">
                <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
                    {/* What will you learn section */}
                    <div className="border border-richblack-600 p-8">
                        <p className="text-3xl font-semibold">What you"ll learn</p>
                        <div className="mt-5">
                            <ReactMarkdown>{course_learning}</ReactMarkdown>
                        </div>
                    </div>

                    {/* Course Content Section */}
                    <div className='flex items-start justify-start gap-2 flex-col mt-10'>
                        <h1 className='text-[28px] font-semibold'>Course Content</h1>
                        <div className='flex item-center justify-between w-full'>
                            <div>{course_content?.length} section(s) {totalLectures} lecture(s) {response.data.totalDuration} total length</div>
                            <div className='text-yellow-25 cursor-pointer' onClick={() => setIsActive([])}>Collapse all sections</div>
                        </div>
                    </div>

                    {/* Course Details Accordion */}
                    <div className='py-4'>
                        {
                            course_content.map((sec, index) => (
                                <CourseAccordionBar section={sec} key={index} isActive={isActive} handleActive={handleActive} />
                            ))
                        }
                    </div>

                    {/* Author Details */}
                    <div className="mb-12 py-4">
                        <p className="text-[28px] font-semibold">Author</p>
                        <div className="flex items-center gap-4 py-4">
                            <img
                                src={
                                    instructor.profile.image
                                        ? instructor.profile.image
                                        : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.first_name} ${instructor.last_name}`
                                }
                                alt="Author"
                                className="h-14 w-14 rounded-full object-cover"
                            />
                            <p className="text-lg">{`${instructor.first_name} ${instructor.last_name}`}</p>
                        </div>
                        <p className="text-richblack-50">
                            {instructor?.profile?.about}
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
            {confirmationModal && <ConfirmationModal modalContent={confirmationModal} />}
        </>
    )
}

export default CourseDetails

