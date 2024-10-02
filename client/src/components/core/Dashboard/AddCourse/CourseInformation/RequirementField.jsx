import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const RequirementField = ({ name, label, errors, register, getValues, setValue }) => {

    const [instruction, setInstruction] = useState("");
    const [instructionList, setInstructionList] = useState([]);
    const { course, editCourse } = useSelector((state) => state.course)

    function addInstructionHandler() {
        if (instruction && !instructionList.includes(instruction)) {
            setInstructionList([...instructionList, instruction]);
            setInstruction("")
        }
    }

    function removeInstructionHandler(index) {
        console.log(index)
        setInstructionList(instructionList.filter((ele) => ele !== instructionList[index]))
    }

    useEffect(() => {
        if (editCourse) {
            setInstructionList(course?.instructions)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
    }, [])

    useEffect(() => {
        setValue(name, instructionList);
    }, [instructionList])

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor={name}>
                {label} <sup className="text-pink-200">*</sup>
            </label>
            <div className="flex flex-col items-start space-y-2">
                <input
                    className="form-style w-full"
                    type='text'
                    id={name}
                    name={name}
                    value={instruction}
                    onChange={(e) => { setInstruction(e.target.value) }}
                />
                {errors[name] && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        {label} is required
                    </span>
                )}
                <button
                    type='button'
                    onClick={addInstructionHandler}
                    className="font-semibold text-yellow-50"
                >Add</button>
            </div>
            {
                instructionList?.length > 0 && (
                    <ul className="mt-2 list-inside list-disc">
                        {
                            instructionList.map((element, index) => (
                                <li key={index} className="flex items-center text-richblack-5">
                                    <span>{element}</span>
                                    <button
                                        type="button"
                                        className="ml-2 text-xs text-pure-greys-300 "
                                        onClick={() => removeInstructionHandler(index)}
                                    >
                                        clear
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default RequirementField

