"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

const Navbar = () => {
  const menuItems = [
    { id: 1, title: "Services", tag: "services" },
    { id: 2, title: "Timings", tag: "timings" },
    { id: 3, title: "Contact", tag: "contact" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToElement = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error(`Element with id '${id}' not found.`);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({});

    // Function to calculate the height of the ul element
    const ulElement = document.querySelector("#navbar-hamburger ul");
    const ulHeight = ulElement.scrollHeight;

    if (isMenuOpen) {
      tl.set("#navbar-hamburger ul", { height: 0, overflow: "hidden" })
        .to("#navbar-hamburger ul", {
          height: ulHeight, // Use the calculated height
          duration: 0.5,
          ease: "power2.out",
          onComplete: function () {
            gsap.set("#navbar-hamburger ul", { height: "auto" });
          },
        })
        .fromTo(
          "#navbar-hamburger li",
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
          }
        );
    }

    return () => {
      tl.kill();
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const tl = gsap.timeline({});

    tl.set(".nav-items li", { opacity: 0, y: -20 }).to(".nav-items li", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2,
    });
  }, []);

  return (
    <nav className="dark:bg-gray-800 dark:border-gray-700 transition-all ease-in-out duration-300 pt-5 px-2">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <p className="flex items-center rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              ARCHI
            </span>
          </p>
        </Link>
        <button
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-hamburger"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex w-full md:w-auto`}
          id="navbar-hamburger"
        >
          <ul className="nav-items flex flex-col md:flex-row font-medium mt-4 md:mt-0 md:space-x-8 rounded-lg dark:bg-gray-800 dark:border-gray-700 items-start md:items-center">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.tag}`}
                  className="text-black group transition duration-300"
                  onClick={(e) => scrollToElement(e, item.tag)}
                >
                  <p className="block py-1">{item.title}</p>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-black"></span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/portfolio"
                className="text-black group transition duration-300"
              >
                <p className="block py-1">Portfolio</p>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-black"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/form"
                className="text-black group transition duration-300"
              >
                <p className="block text-black py-1">Book Now</p>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-black"></span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
