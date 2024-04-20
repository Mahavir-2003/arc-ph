import React from "react";
import Image from "next/image";

const Projects = () => {
  return (
    <div className="nunitosans w-full min-h-fit relative bg-white">
      <div className="w-full h-full flex flex-col px-10">
        <div className="flex justify-start flex-col items-start">
          <div className="text-4xl sm:text-5xl lg:text-7xl tracking-wide leading-tight text-center">
            Featured projects
          </div>
          <div className="spacer h-[50px]"></div>
          <div className="flex flex-wrap justify-start items-center gap-x-5 sm:gap-x-3 md:gap-x-5 lg:gap-x-8 text-sm sm:text-md lg:text-lg tracking-wide leading-tight">
            <div className="min-w-fit min-h-fit px-4 py-1 rounded-full border-black border flex items-center justify-center m-1 sm:m-0.5 md:m-1 lg:m-1.5">
              Photography
            </div>
            <div className="min-w-fit min-h-fit px-4 py-1 rounded-full border-black border flex items-center justify-center m-1 sm:m-0.5 md:m-1 lg:m-1.5">
              Videography
            </div>
            <div className="min-w-fit min-h-fit px-4 py-1 rounded-full border-black border flex items-center justify-center m-1 sm:m-0.5 md:m-1 lg:m-1.5">
              Floor Planning
            </div>
            <div className="min-w-fit min-h-fit px-4 py-1 rounded-full border-black border flex items-center justify-center m-1 sm:m-0.5 md:m-1 lg:m-1.5">
              3D Design
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Replace the following divs with your actual project components */}
            <div className="bg-green-300 min-w-fit min-h-fit relative hover:scale-95 transition-all duration-700 ease-in-out">
              <div className="bg-green-300 w-full h-[400px] relative">
                <Image
                  className="object-cover"
                  layout="fill"
                  src="https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="About us image"
                />
                {/* add a text */}
                <div className="absolute top-0 left-0 w-full h-full flex justify-between items-end px-5 py-3">
                  <div className="text-white text-2xl">New York</div>
                  <div className="min-w-fit min-h-fit px-4 py-1 rounded-full border-white border flex items-center justify-center text-white">
                    Photography
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-green-300 min-w-fit min-h-fit relative hover:scale-95 transition-all duration-700 ease-in-out">
              <div className="bg-green-300 w-full h-[400px] relative">
                <Image
                  className="object-cover"
                  layout="fill"
                  src="https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="About us image"
                />
                <div className="absolute top-0 left-0 w-full h-full flex justify-between items-end px-5 py-3">
                  <div className="text-white text-2xl">New York</div>
                  <div className="min-w-fit min-h-fit px-4 py-1 rounded-full border-white border flex items-center justify-center text-white">
                    Photography
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-green-300 min-w-fit min-h-fit relative hover:scale-95 transition-all duration-700 ease-in-out">
              <div className="bg-green-300 w-full h-[400px] relative">
                <Image
                  className="object-cover"
                  layout="fill"
                  src="https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="About us image"
                />
                <div className="absolute top-0 left-0 w-full h-full flex justify-between items-end px-5 py-3">
                  <div className="text-white text-2xl">New York</div>
                  <div className="min-w-fit min-h-fit px-4 py-1 rounded-full border-white border flex items-center justify-center text-white">
                    Photography
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-green-300 min-w-fit min-h-fit relative hover:scale-95 transition-all duration-700 ease-in-out">
              <div className="bg-green-300 w-full h-[400px] relative">
                <Image
                  className="object-cover"
                  layout="fill"
                  src="https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="About us image"
                />
                <div className="absolute top-0 left-0 w-full h-full flex justify-between items-end px-5 py-3">
                  <div className="text-white text-2xl">New York</div>
                  <div className="min-w-fit min-h-fit px-4 py-1 rounded-full border-white border flex items-center justify-center text-white">
                    Photography
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center pt-5 pb-20">
          <div className="relative inline-block">
            <button className="min-w-fit py-1">View All Projects</button>
            <div className="flex relative w-full overflow-hidden h-[2px] rounded-full">
              <div className="bg-[#000] w-0 h-full absolute top-0 left-0 transition-all duration-500 ease-in-out"></div>
              <div className="bg-[#000]/50 w-full h-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
