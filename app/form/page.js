"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "@nextui-org/checkbox";

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  ownerName: z.string().nonempty("Owner's Name is required"),
  email: z.string().email("Invalid email address"),
  number: z
    .string()
    .regex(/^(?:\+?61|0)\s?[2-478](?:[ -]?[0-9]){8}$/)
    .or(z.string().regex(/^(?:\+?91|0)?[6789]\d{9}$/))
    .refine((value) => value !== "", {
      message: "Phone number is required",
    }),
  ownerNumber: z
    .string()
    .regex(/^(?:\+?61|0)\s?[2-478](?:[ -]?[0-9]){8}$/)
    .or(z.string().regex(/^(?:\+?91|0)?[6789]\d{9}$/))
    .refine((value) => value !== "", {
      message: "Owner's phone number is required",
    }),
  address: z.string().nonempty("Address is required"),
  date: z.string().nonempty("Date is required"),
  time: z.string().nonempty("Time is required"),
});

export default function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    email: "",
    number: "",
    ownerNumber: "",
    address: "",
    date: "",
    time: "",
    services: [],
  });

  const [errors, setErrors] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fields = [
      "name",
      "ownerName",
      "email",
      "number",
      "ownerNumber",
      "address",
      "date",
      "time",
    ];
    fields.forEach((field) => {
      if (errors[field] && formData[field]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "",
        }));
      }
    });
  }, [formData]);

  if (!mounted)
    return (
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
          ownerName: "",
          email: "",
          number: "",
          ownerNumber: "",
          address: "",
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
    const { name, value, checked } = e.target;
    if (name === "services") {
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
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-800 inter">
        <Toaster />
        <div className=" p-5 rounded-xl max-w-6xl w-full flex flex-col md:flex-row">
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
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Book Now</h2>
            <div className="mb-2">
              <label className="block text-gray-800">
                Name
                <span>
                  <span className="pl-1 text-red-500">&#42;</span>
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
              {errors.name && (
                <p className="text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-gray-800">
                Owner&apos;s Name
                <span>
                  <span className="pl-1 text-red-500">&#42;</span>
                </span>{" "}
              </label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="Owner Name"
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-xl shadow-sm placeholder-gray-600 bg-gray-100 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.ownerName && (
                <p className="text-red-500 mt-1">{errors.ownerName}</p>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-gray-800">
                Email
                <span>
                  <span className="pl-1 text-red-500">&#42;</span>
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
            <div className="mb-2">
              <label className="block text-gray-800">
                Phone Number
                <span>
                  <span className="pl-1 text-red-500">&#42;</span>
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
            <div className="mb-2">
              <label className="block text-gray-800">
                Owner&apos;s Phone Number
                <span>
                  <span className="pl-1 text-red-500">&#42;</span>
                </span>{" "}
              </label>
              <input
                type="text"
                name="ownerNumber"
                value={formData.ownerNumber}
                onChange={handleChange}
                placeholder="Owner Number"
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-xl shadow-sm placeholder-gray-600 bg-gray-100 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.ownerNumber && (
                <p className="text-red-500 mt-1">{errors.ownerNumber}</p>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-gray-800">
                Property Address
                <span>
                  <span className="pl-1 text-red-500">&#42;</span>
                </span>{" "}
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-xl shadow-sm placeholder-gray-600 bg-gray-100 text-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.address && (
                <p className="text-red-500 mt-1">{errors.address}</p>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-gray-800">
                Date
                <span>
                  <span className="pl-1 text-red-500">&#42;</span>
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
              {errors.date && (
                <p className="text-red-500 mt-1">{errors.date}</p>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-gray-800">
                Time
                <span>
                  <span className="pl-1 text-red-500">&#42;</span>
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
              {errors.time && (
                <p className="text-red-500 mt-1">{errors.time}</p>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-gray-800">Services</label>
              <div className="mt-1 grid sm:grid-cols-1 md:grid-cols-2 gap-4 min-w-full">
                <Checkbox
                  name="services"
                  value="Photography"
                  onChange={handleChange}
                  radius="sm"
                >
                  {" "}
                  <p className="">Photography</p>{" "}
                </Checkbox>
                <Checkbox
                  name="services"
                  value="Floor Planning 2D Colored"
                  onChange={handleChange}
                  radius="sm"
                >
                  {" "}
                  <p className="">Floor Plan 2D Colored</p>{" "}
                </Checkbox>
                <Checkbox
                  name="services"
                  value="Floor Planning 2D Black & White"
                  onChange={handleChange}
                  radius="sm"
                >
                  {" "}
                  <p className="">Floor Plan 2D Black & White</p>
                </Checkbox>
                <Checkbox
                  name="services"
                  value="Floor Plan 3D"
                  onChange={handleChange}
                  radius="sm"
                >
                  {" "}
                  <p className="">Floor Plan 3D</p>
                </Checkbox>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              Submit
            </button>
            <p className="flex justify-end text-right text-gray-800 inter pt-2">
              Need help?{" "}
              <Link href="mailto:sales@archiphotography.com">
                <p className="text-indigo-600 pl-2">Contact us</p>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
