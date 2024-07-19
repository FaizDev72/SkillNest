import React, { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md"
import { useSelector } from 'react-redux'

const InputTags = ({ name, label, errors, register, placeholder, setValue, getValues }) => {

    const [tags, setTags] = useState([])
    const { editCourse, course } = useSelector((state) => state.course)

    function keyDownHandler(event) {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault()
            let tagValue = event.target.value.trim();
            if (tagValue && !tags.includes(tagValue)) {
                let newTags = [...tags, tagValue];
                setTags(newTags);
                event.target.value = ''
            }
        }
    }

    function deleteTagHandler(index) {
        console.log(index)
        let newTags = tags.filter((tag) => tag !== tags[index])
        setTags(newTags)
    }

    useEffect(() => {
        // if (editCourse) {
        //     console.log("Printing tags->> ",course.tag)
        //     setTags(course?.tag)
        // }

        if (editCourse) {
            let tags = course?.tag;
            if (typeof tags === 'string') {
                try {
                    tags = JSON.parse(tags.replace(/'/g, '"'))
                } catch (e) {
                    console.error('Failed to parse tags:', e)
                }
            }
            setTags(tags || [])
        }

        register(name, { required: true, validate: (value) => value.length > 0 })
    }, [])

    useEffect(() => {
        setValue(name, tags)
        console.log(tags)
    }, [tags])

    return (
        <div className="flex flex-col space-y-2">
            {/* Labels */}
            <label className="text-sm text-richblack-5" htmlFor={name}>{label}<sup className="text-pink-200">*</sup></label>
            {/* Tags */}
            <div className="flex w-full flex-wrap gap-y-2">
                {
                    tags.map((tag, index) => (
                        <div key={index} className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5">
                            <span>{tag}</span>
                            <button className="ml-2 focus:outline-none" type='button' onClick={() => deleteTagHandler(index)}> <MdClose className="text-sm" /></button>
                        </div>
                    ))
                }
            </div>

            {/* Input */}
            <input
                className="form-style w-full"
                name={name}
                id={name}
                placeholder={placeholder}
                type='text'
                onKeyDown={keyDownHandler}
            />
            {
                errors[name] && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        {label} is required
                    </span>
                )
            }
        </div>
    )
}

export default InputTags
