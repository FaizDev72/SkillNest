import React from 'react';

const ConfirmationModal = ({ modalContent }) => {
  const { text1, text2, btn1, btn2, btnHandler1, btnHandler2, activeBtnClasses } = modalContent;

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm transition-all duration-200'>
      <div className='w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6'>
        <h4 className='text-2xl font-semibold text-richblack-5'>{text1}</h4>
        <p className='mt-3 mb-5 leading-6 text-richblack-200'>{text2}</p>
        <div className='flex items-center gap-x-4 w-full'>
          <button onClick={btnHandler1} className={`w-full flex items-center justify-center cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold ${activeBtnClasses ?activeBtnClasses:"bg-yellow-50 text-richblack-900" }`}>{btn1}</button>
          <button onClick={btnHandler2} className='w-full cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-90'>{btn2}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
