import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <div className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            className="object-cover image-container h-[100vh] py-2"
            src="https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Parallax Image"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
      </div>
      {/* company profile */}
      <div className="p-5 flex flex-col lg:flex-row justify-between py-20">
        <div>
          <h1 className="lg:text-3xl text-2xl font-bold text-black">ARCHI</h1>
        </div>
        {/* spacer */}
        <div className="h-3"></div>
        <div>
          <div className="flex flex-col w-full">
            <p className="text-black lg:text-2xl text-md font-normal w-full">
              Visualize. Captivate. Elevate. Your property, our expertise.
            </p>
          </div>
        </div>
      </div>
      {/* company profile ended */}
      {/* footer */}
      <footer className="p-5 text-black text-md font-regular md:flex flex-col md:flex-row text-center md:text-start justify-center md:justify-between">
        <div id="contact">
          <p>&#169; ARCHI &#8211; Photography & Drafting 2024</p>
          <p>
            Adelaide
          </p>
        </div>
        {/* spacer */}
        <div className="h-5 md:h-0"></div>
        {/* spacer */}
        <div className="flex flex-col text-center md:text-right text-md contact">
          <Link href="tel:0404098419">
            <p className="text-black">+61 404098419</p>
          </Link>
          <Link href="mailto:sales@archiphotography.com">
            <p className="text-black group">sales@archiphotography.com</p>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
