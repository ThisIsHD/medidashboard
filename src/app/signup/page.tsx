"use client"; // Add this directive to make it a client component
import Link from "next/link";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-50"
      style={{
        backgroundImage: "url('/assets/images/hospital-bg.jpg')", // Path to the hospital background image
      }}
    >
      {/* Overlay */}
      <div className="min-h-screen bg-black bg-opacity-70 flex items-center justify-center">
        <div className="max-w-lg w-full bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-green-400 text-center mb-6">
            Sign Up
          </h1>
          <p className="text-gray-300 text-center mb-8">
            Create your account to manage patients and appointments easily.
          </p>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-black rounded-lg hover:bg-green-400 hover:text-gray-800 transition duration-200 font-bold"
            >
              Sign Up
            </button>
          </form>

          {/* Login Redirect */}
          <p className="text-gray-400 text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-green-400 hover:text-green-200">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
