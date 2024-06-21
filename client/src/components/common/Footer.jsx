import React from 'react'
import { FaGoogle, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa"
import studyNotionImage from "../../assets/Logo/Logo-Full-Light.png"
import FooterLinkBlocks from './FooterLinkBlocks'
import { Resources, Plans, Community, Company, Support, Subjects, Languages, CareerBuilding } from '../../data/footer-links';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <div className='w-full bg-richblack-800 text-richblack-300'>
            <div className='w-11/12 max-w-maxContent flex items-start justify-between mx-auto gap-10 pt-16 pb-6 border-richblack-800 text-richblack-400 leading-6 border-b-2'>
                {/* First Section */}
                <div className='flex flex-col text-left gap-7 align-start'>
                    <div>
                        <img src={studyNotionImage} alt='' className='mb-5 object-contain w-[170px]' />
                        <FooterLinkBlocks heading={"Company"} Links={Company} />
                    </div>
                    <div className='flex gap-4'>
                        <span><FaGoogle /></span>
                        <span><FaTwitter /></span>
                        <span><FaFacebook /></span>
                        <span><FaYoutube /></span>
                    </div>
                </div>

                {/* Section 2 */}
                <div className='flex flex-col text-left gap-7'>
                    <FooterLinkBlocks heading={"Resources"} Links={Resources} />
                    <FooterLinkBlocks heading={"Support"} Links={Support} />
                </div>

                {/* Section 3 */}
                <div className='flex flex-col text-left gap-7'>
                    <FooterLinkBlocks heading={"Plans"} Links={Plans} />
                    <FooterLinkBlocks heading={"Community"} Links={Community} />
                </div>

                {/* Section 4 */}
                <div className='flex flex-col text-left gap-7'>
                    <FooterLinkBlocks heading={"Subjects"} Links={Subjects} />
                </div>
                {/* Section 5 */}
                <div className='flex flex-col text-left gap-7'>
                    <FooterLinkBlocks heading={"Languages"} Links={Languages} />
                </div>
                {/* Section 6 */}
                <div className='flex flex-col text-left gap-7'>
                    <FooterLinkBlocks heading={"Career building"} Links={CareerBuilding} />
                </div>
            </div>
            <div className='py-10 w-11/12 max-w-maxContent mx-auto flex justify-between'>
                <div>
                    <Link to={"/privacy-policy"} className='border-r-2 px-3 border-richblack-500'>Privacy Policy</Link>
                    <Link to={"/cookie-policy"} className='border-r-2 px-3 border-richblack-500'>Cookie Policy</Link>
                    <Link to={"/terms"} className='px-3'>Terms</Link>
                </div>
                <div>
                    Made with ❤️ Faiz Ansari © 2024 SkillNest
                </div>
            </div>
        </div>
    )
}

export default Footer
