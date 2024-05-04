import React from "react";

const Highlights = () => {
  return (
    <main>
      <div className="nunitosans flex flex-col sm:flex-col lg:gap-32 gap-10 lg:flex-row lg:justify-between lg:items-center px-10 py-40 w-full bg-white">
        <div className="text-4xl sm:text-4xl lg:text-6xl tracking-wide leading-tight lg:w-1/2">
          Highlights
        </div>
        <div className="text-xl text-left lg:flex-row flex flex-col sm:flex-col sm:w-full w-full lg:w-1/2 lg:gap-20 gap-10 font-light">
          <div className="w-full md:w-1/2 tracking-wide leading-tight">
            We are pragmatic in our approach to design and handle each project
            in accordance with its particular set of requirements and
            imperatives. When working in conservation areas or on listed
            buildings we aim to respect and retain the best of the historic
            elements and to supplement these with contemporary interventions
            wherever appropriate.
          </div>
          <div className="w-full md:w-1/2 tracking-wide leading-tight">
            Energy efficiency and sustainability issues are given serious
            consideration at the outset of the design process, in particular on
            new-build projects. Properly considered they play an important part
            in adding present and future value.
          </div>
        </div>
      </div>
      <div className="newsreader flex flex-col sm:flex-col md:flex-row lg:gap-32 gap-5 lg:flex-row lg:justify-around md:justify-around sm:justify-around lg:items-center px-10 bg-white">
        <div className="text-left flex flex-col gap-2 border-t-2 border-black">
          <div className="text-4xl lg:text-7xl sm:text-5xl mt-5">30+</div>
          <div className="text-xl">Years of Experience</div>
        </div>
        <div className="flex flex-col gap-2 border-t-2 border-black">
          <div className="text-4xl lg:text-7xl sm:text-5xl mt-5">11+</div>
          <div className="text-xl">Countires Covered</div>
        </div>
        <div className="flex flex-col gap-2 border-t-2 border-black">
          <div className="text-4xl lg:text-7xl sm:text-5xl mt-5">300+</div>
          <div className="text-xl">Projects Delivered</div>
        </div>
        <div className="flex flex-col gap-2 border-t-2 border-black">
          <div className="text-4xl lg:text-7xl sm:text-5xl mt-5">25+</div>
          <div className="text-xl text-black">Projects per year</div>
        </div>
      </div>
    </main>
  );
};

export default Highlights;
