import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/Home/HighlightText'
import CTAButton from '../components/common/CTAButton'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/Home/CodeBlocks'
import TabNavigationAndCards from '../components/core/Home/TabNavigationAndCards'
import LearningLanguage from '../components/core/Home/LearningLanguage'
import RoadmapSection from '../components/core/Home/RoadmapSection'
import InstructorSection from '../components/core/Home/InstructorSection'
import Footer from '../components/common/Footer'

const Home = () => {
    return (
        <div className=''>
            {/* Section */}
            <div className='flex items-center flex-col justify-center text-white mt-16 m-auto gap-8'>
                {/* CTA Big Button */}
                <Link to="/signup">
                    <div className='bg-richblack-800 px-10 py-3 rounded-full flex items-center justify-center gap-2 font-bold tracking-wide drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:shadow-none hover:scale-95 transition-all duration-200 hover:bg-black hover:text-white'>
                        <span>Become an Instructor</span>
                        <FaArrowRight />
                    </div>
                </Link>

                {/* Heading */}
                <div className='mt-6 text-4xl font-semibold text-center'>
                    Empower Your Future With
                    <HighlightText text="Coding Skills" />
                </div>

                {/* Paragraph */}
                <p className='mt-4 w-[80%] text-center text-richblack-300 text-xl font-semibold'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>

                {/* CTA Button */}
                <div className='flex gap-7 mt-8'>
                    <CTAButton active={true} linkto="/signup">
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto="/login">
                        Book a Demo
                    </CTAButton>
                </div>

                {/* Video */}
                <div className='mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200  w-[80%]'>
                    <video muted autoPlay loop className='shadow-[20px_20px_rgba(255,255,255)]'>
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>

            </div>

            {/* Section 2 */}
            {/* Code Block 1 */}
            <div className='flex w-[80%] flex-col mx-auto mt-28'>
                <CodeBlocks
                    styling={""}
                    title={
                        <div className='text-4xl font-semibold'>
                            Unlock Your
                            <HighlightText text=" coding potential " />
                            with our online courses
                        </div>
                    }
                    description={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    btn1={
                        {
                            btnText: "Try it Yourself",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    btn2={
                        {
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }
                    }
                    code={
                        `<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a>This is myPage</h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a>\n<a href="/three">Three</a>\n</nav>\n</body>`
                    }
                    backgroundGradient={"codeblock1"}
                    codeColor={"text-yellow-25"}
                />
            </div>

            {/* Section 2 */}
            {/* Code Block 2 */}
            <div className='flex w-[80%] flex-col mx-auto mt-28'>
                <CodeBlocks
                    styling={"flex-row-reverse"}
                    title={
                        <div className='text-4xl font-semibold'>
                            Start
                            <HighlightText text=" coding in seconds " />
                        </div>
                    }
                    description={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    btn1={
                        {
                            btnText: "Continue Lessons",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    btn2={
                        {
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }
                    }
                    code={
                        `<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a>This is myPage</h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a>\n<a href="/three">Three</a>\n</nav>\n</body>`
                    }
                    codeColor={"text-white"}
                    backgroundGradient={"codeblock2"}
                />
            </div>

            {/* Building Tabs and Cards */}
            <TabNavigationAndCards />

            {/* Section 3 - Explore White Bg Pattern Section */}
            <div className='bg-white w-full'>
                <div className='homepage_bg w-full h-[300px] pt-[160px] flex items-center justify-center gap-6'>
                    <CTAButton active={true} linkto={"/signup"}>Explore Full Catalog</CTAButton>
                    <CTAButton active={false} linkto={"/login"}>Learn More</CTAButton>
                </div>
            </div>

            {/* Roadmap  section */}
            <div className='bg-pure-greys-5 py-16 w-full'>
                {/* Skill sub-section */}
                <div className='flex justify-between items-center max-w-maxContent w-11/12 mx-auto gap-10'>
                    <div className='w-[40%] text-4xl font-semibold'>
                        <h1>
                            Get the skills you need for a <HighlightText text={"job that is in demand."} />
                        </h1>
                    </div>
                    <div className='w-[40%] flex items-start flex-col gap-6'>
                        <p className='text-lg'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                        <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                    </div>
                </div>
                <div></div>
            </div>

            {/* Commitment roadmap seciton */}
            <RoadmapSection />

            {/* Three Image Section - Learning Language */}
            <LearningLanguage />

            {/* Instruction Section */}
            <InstructorSection />
            
            

        </div>
    )
}

export default Home
