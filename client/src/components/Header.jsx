import React from "react";

function Header() {
  return (
    <div className="relative">
      <div className="mx-8 sm: mx-16 xl: mx-24 text-center mt-20 mb-8">
        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16">
          Document my <br />
          <span className="text-primary">fangirl</span> era
        </h1>

        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">
          A blog where I share my fangirl moments and all the things that make
          me happy.
        </p>

        <form className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden">
          <input type="text" placeholder="Search for posts" required className="w-full pl-4 outline-none"/>
          <button type="submit" className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer  ">Search</button>
        </form>
      </div>
    </div>
  );
}

export default Header;
