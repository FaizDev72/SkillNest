const Category = require('../models/Category');
const Course = require("../models/Course");

// create Category
exports.createCategory = async (req, res) => {
    try {
        // get data
        const { category_name, category_desc } = req.body;
        console.log({ category_name, category_desc })

        // validate
        if (!category_name || !category_desc) {
            return
        }

        // create category
        const category = await Category.create({
            category_name,
            category_desc
        });

        return res.status(200).json({
            success: true,
            message: 'Category Created Successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// get all Category
exports.getAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find({}).populate("courses");

        res.status(200).json({
            success: true,
            message: "All tags returned successfully",
            data: allCategory,
        })
    } catch (error) {

    }
}

// Get Category Page Detais
exports.getPageDetails = async (req, res) => {
    try {
        // get data from request body
        const { category_id } = req.body;
        console.log(category_id)

        // get courses of category
        const selectedCategory = await Category.findById(category_id)
            .populate("courses").exec();

        // validating data
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Data Not Found",
            });
        }

        // get different category of courses
        const diffCategories = await Category.find(
            { _id: { $ne: category_id } },

        ).populate("courses").exec();

        // get most purchased course
        const mostPurchasedCourses = await Course.aggregate([
            {
                $addFields: {
                    purchasedCount: { $size: "$student_enrolled" }
                }
            },
            {
                $sort: { purchasedCount: -1 }
            }, {
                $limit: 4
            }
        ])

        //return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                diffCategories,
                mostPurchasedCourses
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


