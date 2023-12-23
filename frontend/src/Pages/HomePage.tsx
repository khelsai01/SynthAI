import React from 'react'

const HomePage = () => {
  return (
    <div className="mx-auto my-8 max-w-7xl">
        <img className='w-[80%] m-auto sm:w-[50%] md:w-[40%] lg:w-[40%]' src="https://media.licdn.com/dms/image/D5612AQH4oZPVNHJn4A/article-cover_image-shrink_600_2000/0/1668740838822?e=2147483647&v=beta&t=muC7maKSIB6N-LaVrnZcUeakYCyhYB1ONaORFAIohrE" alt="" />
        <section className="text-white dark:bg-gray-900 my-5">
    <div className=" px-4 mx-auto max-w-screen-xl text-center ">
        <h1 className="mb-4 text-gray-500 text-4xl font-extrabold  leading-none  md:text-5xl lg:text-6xl dark:text-white">Decode Your Career <br /> Elevate with <span className='text-purple-500'>AI Interviews</span></h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Seize success with precision! Master interviews on our AI-enhanced platform for a journey guided by expertise and innovation.</p>
        <div className="m-auto">
            <a href="/interview" className="inline-flex justify-center items-center w-[200px] py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                GET STARTED
                
            </a>
           
        </div>
    </div>
</section>



    </div>
  )
}

export default HomePage