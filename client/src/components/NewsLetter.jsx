import React from 'react'

function NewsLetter() {
  return (
    <div className='flex flex-col items-center space-y-2 my-32'>
        <h1 className='md:text-4xl text-2xl font-semibold'>Stay updated with the blog!</h1>
        <p className='md:text-lg text-gray-500/70 pb-8'>Subscribe for the latest blog updates</p>
        <form className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
            <input
              className="bg-white border-2 border-primary/50 border-r-0 focus:ring-2 focus:ring-primary shadow-sm rounded-md h-full outline-none w-full px-4 text-gray-700 placeholder-gray-400 transition"
              type="email"
              placeholder="Enter your email"
              required
            />
            <button type='submit' className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-1-none'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetter