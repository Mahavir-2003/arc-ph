"use client";
import { useState, useEffect, useCallback } from "react";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "@heroui/react";
import FormField from "../components/FormField";
import { useToast } from "../hooks/useToast";
import { Loader2 } from "lucide-react";
const schema = z.object({
  name: z.string().nonempty("Name is required"),
  ownerName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  number: z
    .string()
    .regex(/^(?:\+?61|0)\s?[2-478](?:[ -]?[0-9]){8}$/)
    .or(z.string().regex(/^(?:\+?91|0)?[6789]\d{9}$/))
    .refine((value) => value !== "", {
      message: "Phone number is required",
    }),
  ownerNumber: z.string().optional(),
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const showToast = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        services: checked
          ? [...prevData.services, value]
          : prevData.services.filter((service) => service !== value),
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        showToast("Form submitted successfully", "success");
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
          showToast(
            `Call scheduled for ${formData.date} at ${formData.time}`,
            "success"
          );
        }, 1000);
      } else {
        showToast("Error submitting form", "error");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = {};
        error.errors.forEach((err) => {
          validationErrors[err.path[0]] = err.message;
        });
        setErrors(validationErrors);
      } else {
        showToast("Error submitting form", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isClient) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-800 inter">
      <div className="p-5 rounded-xl max-w-6xl w-full flex flex-col md:flex-row">
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
          <FormField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          <FormField
            label={<span className="text-gray-500">Owner&apos;s Name (Optional)</span>}
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            error={errors.ownerName}
            classNames={{
              inputWrapper: "bg-gray-50/50 hover:bg-gray-100/50",
              input: "text-gray-500"
            }}
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <FormField
            label="Phone Number"
            name="number"
            type="tel"
            value={formData.number}
            onChange={handleChange}
            error={errors.number}
            required
          />
          <FormField
            label={<span className="text-gray-500">Owner&apos;s Phone Number (Optional)</span>}
            name="ownerNumber"
            type="tel"
            value={formData.ownerNumber}
            onChange={handleChange}
            error={errors.ownerNumber}
            classNames={{
              inputWrapper: "bg-gray-50/50 hover:bg-gray-100/50",
              input: "text-gray-500"
            }}
          />
          <FormField
            label="Property Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            required
          />
          <FormField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            error={errors.date}
            required
          />
          <FormField
            label="Time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            error={errors.time}
            required
          />
          <div className="mb-2">
            <label className="block text-gray-800">Services</label>
            <div className="mt-1 grid sm:grid-cols-1 md:grid-cols-2 gap-4 min-w-full">
              {[
                "Photography",
                "Floor Planning 2D Colored",
                "Floor Planning 2D Black & White",
                "Floor Plan 3D",
              ].map((service) => (
                <Checkbox
                  key={service}
                  name="services"
                  value={service}
                  onChange={handleChange}
                  radius="sm"
                  isSelected={formData.services.includes(service)}
                >
                  {service}
                </Checkbox>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Need help?{" "}
            <Link href="mailto:sales@archiphotography.com">
              <span className="text-indigo-600 pl-2">Contact us</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
