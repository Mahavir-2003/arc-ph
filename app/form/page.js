// "use client";
// import { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { z } from "zod";
// import Image from "next/image";
// import Link from "next/link";

// // Validation schema using zod
// const schema = z.object({
//   name: z.string().nonempty("Name is required"),
//   email: z.string().email("Invalid email address"),
//   number: z.string().nonempty("Number is required"),
//   date: z.string().nonempty("Date is required"),
//   time: z.string().nonempty("Time is required"),
//   message: z.string().nonempty("Message is required"),
// });

// export default function FormPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     number: "",
//     date: "",
//     time: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Validate form data
//       schema.parse(formData);
//       setErrors({}); // Clear errors if validation passes

//       const response = await fetch("/api/submit-form", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         toast.success("Form submitted successfully");
//         setFormData({
//           name: "",
//           email: "",
//           number: "",
//           date: "",
//           time: "",
//           message: "",
//         });

//         setTimeout(() => {
//           toast.success(
//             `Call scheduled for ${formData.date} at ${formData.time}`
//           );
//         }, 1000);
//       } else {
//         toast.error("Error submitting form");
//       }
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const validationErrors = {};
//         error.errors.forEach((err) => {
//           validationErrors[err.path[0]] = err.message;
//         });
//         setErrors(validationErrors);
//       } else {
//         toast.error("Error submitting form");
//       }
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#151515] text-gray-100 inter">
//       <Toaster />
//       <div className=" p-8 rounded-xl max-w-4xl w-full flex flex-col md:flex-row">
//         <div className="w-full md:w-1/2 p-4 hidden md:block">
//           <div className="w-full h-full relative">
//             <Image
//               className="object-cover rounded-xl"
//               layout="fill"
//               src="https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=600"
//               alt="About us image"
//             />
//           </div>
//         </div>
//         <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-4">
//           <h2 className="text-2xl font-bold mb-6 text-gray-100">
//             Schedule a Call
//           </h2>
//           <div className="mb-4">
//             <label className="block text-gray-100">
//               Name
//               <span>
//                 <sup className="pl-1 text-red-500">*</sup>
//               </span>{" "}
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Name"
//               className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-xl shadow-sm placeholder-gray-400 bg-[#121212] text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-100">
//               Email
//               <span>
//                 <sup className="pl-1 text-red-500">*</sup>
//               </span>{" "}
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-xl shadow-sm placeholder-gray-400 bg-[#121212] text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {errors.email && (
//               <p className="text-red-500 mt-1">{errors.email}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-100">
//               Number
//               <span>
//                 <sup className="pl-1 text-red-500">*</sup>
//               </span>{" "}
//             </label>
//             <input
//               type="text"
//               name="number"
//               value={formData.number}
//               onChange={handleChange}
//               placeholder="Number"
//               className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-xl shadow-sm placeholder-gray-400 bg-[#121212] text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {errors.number && (
//               <p className="text-red-500 mt-1">{errors.number}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-100">
//               Date
//               <span>
//                 <sup className="pl-1 text-red-500">*</sup>
//               </span>{" "}
//             </label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-xl shadow-sm placeholder-gray-400 bg-[#121212] text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {errors.date && <p className="text-red-500 mt-1">{errors.date}</p>}
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-100">
//               Time
//               <span>
//                 <sup className="pl-1 text-red-500">*</sup>
//               </span>{" "}
//             </label>
//             <input
//               type="time"
//               name="time"
//               value={formData.time}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-xl shadow-sm placeholder-gray-400 bg-[#121212] text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {errors.time && <p className="text-red-500 mt-1">{errors.time}</p>}
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-100">
//               Message
//               <span>
//                 <sup className="pl-1 text-red-500">*</sup>
//               </span>{" "}
//             </label>
//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               placeholder="Message"
//               className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-xl shadow-sm placeholder-gray-400 bg-[#121212] text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             ></textarea>
//             {errors.message && (
//               <p className="text-red-500 mt-1">{errors.message}</p>
//             )}
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//       {/* add a contact team button at the end for any issues */}
//       <div className="absolute bottom-4 right-4 flex">
//         <p className="text-gray-100 pr-2">Need help?</p>
//         <Link href="mailto:sales@archiphotography.com" className="text-indigo-500">
//           Contact our team
//         </Link>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";

// Validation schema using zod
const schema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  number: z.string().nonempty("Number is required"),
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form data
      schema.parse(formData);
      setErrors({}); // Clear errors if validation passes

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
    <div className="min-h-screen flex items-center justify-center bg-[#151515] text-gray-100 inter">
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
          <h2 className="text-2xl font-bold mb-6 text-gray-100">
            Schedule a Call
          </h2>
          <div className="mb-4">
            <label className="block text-gray-100">
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
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-xl shadow-sm placeholder-gray-400 bg-[#121212] text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-100">
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
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-xl shadow-sm placeholder-gray-400 bg-[#121212] text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-100">
              Number
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
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-xl shadow-sm placeholder-gray-400 bg-[#121212] text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.number && (
              <p className="text-red-500 mt-1">{errors.number}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-100">
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
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-xl shadow-sm placeholder-gray-400 bg-[#121212] text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.date && <p className="text-red-500 mt-1">{errors.date}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-100">
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
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-xl shadow-sm placeholder-gray-400 bg-[#121212] text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.time && <p className="text-red-500 mt-1">{errors.time}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-100">
              Services
              <span>
                <sup className="pl-1 text-red-500">*</sup>
              </span>{" "}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 bg-[#121212] rounded-xl px-4 py-2">
                <input
                  type="checkbox"
                  name="services"
                  value="Photography"
                  onChange={handleChange}
                  checked={formData.services.includes("Photography")}
                />
                Photography
              </label>
              <label className="flex items-center gap-2 bg-[#121212] rounded-xl px-4 py-2">
                <input
                  type="checkbox"
                  name="services"
                  value="Videography"
                  onChange={handleChange}
                  checked={formData.services.includes("Videography")}
                />
                Videography
              </label>
              <label className="flex items-center gap-2 bg-[#121212] rounded-xl px-4 py-2">
                <input
                  type="checkbox"
                  name="services"
                  value="Interior Design"
                  onChange={handleChange}
                  checked={formData.services.includes("Interior Design")}
                />
                Interior Design
              </label>
              <label className="flex items-center gap-2 bg-[#121212] rounded-xl px-4 py-2">
                <input
                  type="checkbox"
                  name="services"
                  value="Floor Planning"
                  onChange={handleChange}
                  checked={formData.services.includes("Floor Planning")}
                />
                Floor Planning
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
      {/* add a contact team button at the end for any issues */}
      <div className="absolute bottom-4 right-4 flex">
        <p className="text-gray-400 pr-2">Need help?</p>
        <Link href="mailto:" className="text-indigo-500">
          Contact our team
        </Link>
      </div>
    </div>
  );
}
