import Link from "next/link";
import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div className="flex flex-col sm:gap-28 gap-10 lg:flex-row justify-between items-center px-10 py-10 sm:py-32 w-full bg-white">
      <div className="flex flex-col w-full">
        <div className="text-4xl sm:text-5xl lg:text-7xl tracking-wide leading-tight">
          About
        </div>
        <div className="spacer h-[50px]"></div>
        <div className="lg:text-2xl font-light text-left">
          UBBS is vastly experienced at working across sectors – Residential,
          Hospitality and Commercial, and across disciplines – Architecture and
          Interior Design. We offer a multifaceted, entirely bespoke design
          service, focussed around achieving the best possible end result.
          Energy efficiency and sustainability issues are given serious
          consideration at the outset of the design process, in particular on
          new-build projects.
        </div>
        <div className="spacer h-[50px]"></div>
        {/* <div className="max-w-fit group">
          <Link href="#" className="text-xl tracking-widest">
            MEET THE TEAM
          </Link>
          <div className="relative w-full overflow-hidden h-[1px] rounded-full mt-2">
            <div className="bg-[#fff] w-full h-full absolute top-0 left-0 -translate-x-[100%] group-hover:-translate-x-[0%] transition-all duration-500 ease-in-out"></div>
            <div className="bg-[#ffffff]/50 w-full h-full"></div>
          </div>
        </div> */}
      </div>
      <div className="w-full h-[500px] relative">
        <Image
          className="object-cover"
          layout="fill"
          src="https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="About us image"
        />
      </div>
    </div>
  );
};

export default About;
