import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { categoriesApi } from '../services/apis';
import CourseSlider from '../components/core/Category/CourseSlider';
import CourseCard from '../components/core/Category/CourseCard';
import Footer from '../components/common/Footer'
import isProduction from '../utils/logger';

const Category = () => {

    const { catalog_name } = useParams();
    const [categoryId, setCategoryId] = useState("");
    const [categoryData, setCategoryData] = useState(null);
    const [activeTab, setActiveTab] = useState(1);

    // Fetching all Categories
    useEffect(() => {
        const getCategories = async () => {
            try {
                let response = await apiConnector("GET", categoriesApi.GETALLCATEGORIES_API)

                const id = response?.data?.data?.filter((ele) => catalog_name === ele.category_name.split(" ").join("-").toLowerCase())[0]._id;
                setCategoryId(id)
            } catch (error) {
                if (!isProduction()) {
                console.log("Error fetching data", error);
                }
            }
        }
        getCategories();
    }, [catalog_name])

    const getCategoryById = async () => {
        try {
            const response = await apiConnector("POST", categoriesApi.GETCATEGORYBYID, { categoryId: categoryId, })
            setCategoryData(response?.data)
        } catch (error) {
            if (!isProduction()) {
            console.log("Error fetching data ", error);
            }
        }
    }
    useEffect(() => {
        if (categoryId) {
            getCategoryById();
        }
    }, [categoryId])

    return (
        <div className=''>
            {/* Hero Section */}
            <div className='w-full box-content bg-richblack-800 px-4'>
                <div className='mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent '>
                    {/* Breadcrumb */}
                    <ul className='text-richblack-300 flex item-start gap-1'>
                        <li>Home /</li>
                        <li>Category /</li>
                        <li className='text-yellow-50 capitalize'>{catalog_name.replace("-", " ")}</li>
                    </ul>
                    <h1 className='text-3xl text-richblack-5 capitalize'>{catalog_name.replace("-", " ")}</h1>
                    <p className='max-w-[870px] text-richblack-200'>{categoryData?.data?.selectedCategory?.category_desc}</p>
                </div>
            </div>

            {/* section - 1  */}
            <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
                <div>
                    <h1 className='section_heading'>Courses to get you started</h1>
                    <div className='my-4 flex border-b border-b-richblack-600 text-sm'>
                        <span className={`px-4 py-2 cursor-pointer ${activeTab === 1 ? " border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"}`} onClick={() => setActiveTab(1)}>Most Populer</span>
                        <span className={`px-4 py-2 cursor-pointer ${activeTab === 2 ? " border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"}`} onClick={() => setActiveTab(2)}>New</span>
                    </div>
                </div>
                <div>
                    <CourseSlider courses={categoryData?.data?.selectedCategory?.courses}></CourseSlider>
                </div>
            </div>

            {/* Section-2 */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading">
                    Top Courses In {categoryData?.data?.diffCategories[0].category_name}
                </div>
                <div className="py-8">
                    <CourseSlider
                        courses={categoryData?.data?.diffCategories[0].courses}
                    />
                </div>
            </div>

            {/* Section-3 */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading">Frequently Bought</div>
                <div className="py-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {categoryData?.data?.mostPurchasedCourses?.slice(0, 4)
                            .map((course, i) => (
                                <CourseCard course={course} key={i} height={"h-[400px]"} />
                            ))
                        }
                    </div>
                </div>
            </div>

            <Footer />
        </div>


    )
}

export default Category
