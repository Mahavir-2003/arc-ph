"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "@nextui-org/checkbox";

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  number: z
    .string()
    .regex(/^(?:\+?61|0)\s?[2-478](?:[ -]?[0-9]){8}$/)
    .or(z.string().regex(/^(?:\+?91|0)?[6789]\d{9}$/))
    .optional()
    .refine((value) => value !== "", { message: "Phone number is required" }),
  date: z.string().nonempty("Date is required"),
  time: z.string().nonempty("Time is required"),
});

export default function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    date: "",
    time: "",
    services: [],
  });

  const [errors, setErrors] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      // show a loader
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-800 inter">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      schema.parse(formData);
      setErrors({});

      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Form submitted successfully");
        setFormData({
          name: "",
          email: "",
          number: "",
          date: "",
          time: "",
          services: [],
        });

        setTimeout(() => {
          toast.success(
            `Call scheduled for ${formData.date} at ${formData.time}`
          );
        }, 1000);
      } else {
        toast.error("Error submitting form");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = {};
        error.errors.forEach((err) => {
          validationErrors[err.path[0]] = err.message;
        });
        setErrors(validationErrors);
      } else {
        toast.error("Error submitting form");
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "services") {
      const { value, checked } = e.target;
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          services: [...prevData.services, value],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          services: prevData.services.filter((service) => service !== value),
        }));
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-800 inter">
      <Toaster />
      <div className=" p-8 rounded-xl max-w-4xl w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4 hidden md:block">
          <div className="w-full h-full relative">
            <Image
              className="object-cover rounded-xl"
              layout="fill"
              src="https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="About us image"
            />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Schedule a Call
          </h2>
          <div className="mb-4">
            <label className="block text-gray-800">
              Name
              <span>
                <sup className="pl-1 text-red-500">*</sup>
              </span>{" "}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-xl shadow-sm placeholder-gray-600 bg-gray-100 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-800">
              Email
              <span>
                <sup className="pl-1 text-red-500">*</sup>
              </span>{" "}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-xl shadow-sm placeholder-gray-600 bg-gray-100 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-800">
              Phone Number
              <span>
                <sup className="pl-1 text-red-500">*</sup>
              </span>{" "}
            </label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Number"
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-xl shadow-sm placeholder-gray-600 bg-gray-100 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.number && (
              <p className="text-red-500 mt-1">{errors.number}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-800">
              Date
              <span>
                <sup className="pl-1 text-red-500">*</sup>
              </span>{" "}
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Date"
              min={new Date().toISOString().split("T")[0]}
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-xl shadow-sm placeholder-gray-600 bg-gray-100 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.date && <p className="text-red-500 mt-1">{errors.date}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-800">
              Time
              <span>
                <sup className="pl-1 text-red-500">*</sup>
              </span>{" "}
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="Time"
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-xl shadow-sm placeholder-gray-600 bg-gray-100 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.time && <p className="text-red-500 mt-1">{errors.time}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-800">Services</label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <Checkbox
                name="services"
                value="Videography"
                onChange={handleChange}
                radius="sm"
              >
                {" "}
                Videography{" "}
              </Checkbox>
              <Checkbox
                name="services"
                value="Photography"
                onChange={handleChange}
                radius="sm"
              >
                {" "}
                Photography{" "}
              </Checkbox>
              <Checkbox
                name="services"
                value="Floor Planning 2D"
                onChange={handleChange}
                radius="sm"
              >
                {" "}
                Floor Plan 2D{" "}
              </Checkbox>
              <Checkbox
                name="services"
                value="Floor Plan 3D"
                onChange={handleChange}
                radius="sm"
              >
                {" "}
                Floor Plan 3D{" "}
              </Checkbox>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            Submit
          </button>
        </form>
        <p className="absolute bottom-4 right-4 flex text-gray-800">
          Need help?{" "}
          <Link href="mailto:sales@archiphtography.com">
            <p className="text-indigo-600 pl-2">Contact us</p>
          </Link>
        </p>
      </div>
    </div>
  );
}
