"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaMapMarkedAlt, FaPlane, FaHotel } from "react-icons/fa"; // Example Icons
import BlogComponent from "../Landing-page/BlogComponent"; // Assuming a separate Blog component
import home from "@/public/landing-page.png";

export const HomePageComponent = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white  text-black">
      {/* Header Section */}
      <header className="w-full flex items-center justify-between px-10 py-5 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          {/* <Image src="/logo.svg" alt="Logo" width={40} height={40} /> */}
          <span className="text-3xl text-black font-bold">Tour AI</span>
        </div>
        <div>
          <Button
            onClick={() => {
              window.location.href = "/signin";
            }}
            className="bg-black text-white "
          >
            Contact US
          </Button>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex flex-col justify-center bg-white flex-grow text-center space-y-20">
        {" "}
        {/* Added more space between sections */}
        {/* Hero Section */}
        <div className="flex flex-col items-center space-y-8 w-11/12 md:w-3/4 lg:w-2/3 mx-auto mt-20">
          {" "}
          {/* Increased the width of the box */}
          <h1 className="text-6xl font-extrabold text-fuchsia-600">
            Discover Your Next Adventure with AI:
          </h1>
          <h2 className="text-5xl font-extrabold text-black">
            Personalized Itineraries at Your Fingertips
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Your personal trip planner and travel curator, creating custom
            itineraries tailored to your interests and budget.
          </p>
          <Button
            onClick={() => {
              window.location.href = "/create-trip";
            }}
            className="text-white bg-fuchsia-600 py-6 px-8 rounded-lg transition-all duration-500 ease-in-out"
          >
            Get Started, Its Free
          </Button>
        </div>
        {/* Image or Visual Representation */}
        <div className="bg-gray-900 border border-gray-300 rounded-lg p-6 flex justify-center items-center mx-auto w-11/12 md:w-3/4 lg:w-2/3">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={home} // Replace with your actual image path
              alt="Travel preview"
              layout="fill" // Makes the image responsive and fills the container
              objectFit="cover" // Ensures the image maintains its aspect ratio
              className="rounded-md"
            />
          </div>
        </div>
        {/* Features Section */}
        <section className="flex flex-col items-center space-y-8 w-11/12 md:w-3/4 lg:w-2/3 mx-auto">
          {" "}
          {/* Reduced width and added consistent spacing */}
          <h2 className="text-4xl font-bold text-black mt-20">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <div className="flex flex-col items-center p-6 border border-gray-300 rounded-lg bg-white shadow-sm transition-all duration-300 transform hover:scale-105">
              <FaMapMarkedAlt size={50} className=" text-fuchsia-600" />
              <h3 className="text-2xl font-semibold mt-5">
                Custom Itineraries
              </h3>
              <p className="text-gray-600 text-center">
                Create personalized itineraries tailored to your budget and
                interests.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 border border-gray-300 rounded-lg bg-white shadow-sm transition-all duration-300 transform hover:scale-105">
              <FaPlane size={50} className=" text-fuchsia-600" />
              <h3 className="text-2xl font-semibold mt-5">
                Flight Integration
              </h3>
              <p className="text-gray-600 text-center">
                Get suggestions for flights and travel plans as part of your
                itinerary.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 border border-gray-300 rounded-lg bg-white shadow-sm transition-all duration-300 transform hover:scale-105">
              <FaHotel size={50} className=" text-fuchsia-600" />
              <h3 className="text-2xl font-semibold mt-5">Accommodation</h3>
              <p className="text-gray-600 text-center">
                Find the best places to stay with recommendations from our AI.
              </p>
            </div>
          </div>
        </section>
        {/* Blog Section */}
        <section className="w-11/12 md:w-3/4 lg:w-2/3 mx-auto">
          <h2 className="text-4xl text-black font-bold text-center mb-10 mt-20">
            Latest Blogs
          </h2>
          {/* BlogComponent would handle rendering multiple blog previews */}
          <BlogComponent />
        </section>
        {/* Footer */}
        <footer className=" bg-fuchsia-600 text-white w-full py-10">
          <div className="w-11/12 md:w-3/4 lg:w-2/3 mx-auto flex justify-between">
            <div className="flex flex-col space-y-4">
              <span className="text-2xl font-bold">Tour AI</span>
              <p className="text-gray-900">
                Plan your next adventure with AI-powered tools.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <span className="text-lg font-semibold">Quick Links</span>
              <a href="/create-trip" className="text-gray-900 hover:underline">
                Create a Trip
              </a>
              <a href="/blogs" className="text-gray-900 hover:underline">
                Blogs
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
