"use client";
// Importing React and other important libraries

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";

const HeroSection = () => {
  const imageRef = useRef();

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        {/* Title and Description */}
        {/* gradient-title is the custom class for gradient */}
        <h1 className="text-5xl font-bold text-[#1E3A8A] md:text-8xl lg:text-[70px] pb-6 gradient-title animate-bounce">
          Smarter Finance, Brighter Future <br />
          <span className="text-2xl italic md:text-5xl lg:text-[40px]">
            – Powered by AI.
          </span>
        </h1>
        <p className="mt-4 text-xl max-w-2xl text-gray-600 mx-auto mb-8">
          WealthWise is your AI-driven finance companion, designed to track
          expenses, optimize budgets, and provide intelligent financial insights
          in real time. With advanced AI, WealthWise helps you manage money
          smarter, save more, and invest wisely – all in one seamless platform.
        </p>
        <div className="flex justify-center space-x-8">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 shadow-2xl">
              Get Started
            </Button>
          </Link>
          <Link href="/demo">
            <Button size="lg" variant="outline" className="px-8 shadow-2xl">
              Watch Demo
            </Button>
          </Link>
        </div>
      </div>

      <div className="hero-image-wrapper pt-12">
        {/* imageRef will act as a reference to this <div> */}
        <div ref={imageRef} className="hero-image">
          <Image
            src="/banner.jpg"
            width={1080}
            height={620}
            alt="Dashboard Preview"
            className="img rounded-lg shadow-2xl border mx-auto"
            priority
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
