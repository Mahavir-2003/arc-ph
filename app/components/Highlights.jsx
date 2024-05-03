import React from "react";

const Highlights = () => {
  return (
    <div className="nunitosans flex flex-col sm:flex-col lg:gap-32 gap-10 lg:flex-row lg:justify-between lg:items-center px-10 py-32 w-full bg-white">
      <div className="text-3xl sm:text-4xl lg:text-6xl tracking-wide leading-tight lg:w-1/2">
        Highlights
      </div>
      <div className="text-left lg:flex-row flex flex-col sm:flex-col sm:w-full w-full lg:w-1/2 lg:gap-20 gap-10 font-light">
        <div className="w-full md:w-1/2 tracking-wide leading-tight">
          We are pragmatic in our approach to design and handle each project in
          accordance with its particular set of requirements and imperatives.
          When working in conservation areas or on listed buildings we aim to
          respect and retain the best of the historic elements and to supplement
          these with contemporary interventions wherever appropriate.
        </div>
        <div className="w-full md:w-1/2 tracking-wide leading-tight">
          Energy efficiency and sustainability issues are given serious
          consideration at the outset of the design process, in particular on
          new-build projects. Properly considered they play an important part in
          adding present and future value.
        </div>
      </div>
    </div>
  );
};

export default Highlights;
