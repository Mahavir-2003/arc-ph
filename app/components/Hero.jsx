import React from "react";

const Hero = () => {
  return (
    <div className=" w-full h-[100dvh]  relative">
      <div className=" w-full h-full flex flex-col px-10">
        <div className=" flex-1 flex justify-center items-center ">
          <div className="relative flex justify-center items-center w-full">
            <div className="flex-1">
              <h1 className=" text-2xl sm:text-5xl lg:text-7xl font-light tracking-wide leading-tight">
                Commercial focused design <br />
                led environments.
              </h1>
              <div className="spacer h-[50px]"></div>
              <button className=" bg-blue-200  rounded-full min-w-[300px] py-4">
                View Projects
              </button>
            </div>
            <div className=" hidden md:flex  flex-col justify-center items-center h-full  gap-y-4">
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </div>
          </div>
        </div>
        <div className=" w-full pb-10 flex justify-center items-center ">
          <div className=" w-full flex justify-between items-center gap-x-4 md:gap-x-12 text-xs md:text-lg">
            <div className=" flex-1">
              <h2 className="  tracking-wide mb-3 font-light">Our Company</h2>
              <div className="relative w-full overflow-hidden h-[2px] rounded-full">
                <div className=" bg-[#ffffff]/50 w-full h-full"></div>
                <div className=" bg-[#fff] w-full h-full absolute top-0 left-0 -translate-x-[50%]"></div>
              </div>
            </div>
            <div className=" flex-1">
              <h2 className="  tracking-wide mb-3 font-light">Our Company</h2>
              <div className="relative w-full overflow-hidden h-[2px] rounded-full">
                <div className=" bg-[#ffffff]/50 w-full h-full"></div>
                <div className=" bg-[#fff] w-full h-full absolute top-0 left-0 -translate-x-[50%]"></div>
              </div>
            </div>
            <div className=" flex-1">
              <h2 className="  tracking-wide mb-3 font-light">Our Company</h2>
              <div className="relative w-full overflow-hidden h-[2px] rounded-full">
                <div className=" bg-[#ffffff]/50 w-full h-full"></div>
                <div className=" bg-[#fff] w-full h-full absolute top-0 left-0 -translate-x-[50%]"></div>
              </div>
            </div>
            <div className=" flex-1">
              <h2 className="  tracking-wide mb-3 font-light">Our Company</h2>
              <div className="relative w-full overflow-hidden h-[2px] rounded-full">
                <div className=" bg-[#ffffff]/50 w-full h-full"></div>
                <div className=" bg-[#fff] w-full h-full absolute top-0 left-0 -translate-x-[50%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
