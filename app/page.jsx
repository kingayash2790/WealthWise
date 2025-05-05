"use client";

import HeroSection from "@/components/hero";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
  pricingPlansData,
  faqData,
} from "@/data/landing";

import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Image from "next/image";

import { useEffect, useState } from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  // State to track the current index for the testimonials carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = testimonialsData.length;

  useEffect(() => {
    // Automatically change the testimonial slide every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);
  return (
    <div className="mt-40">
      {/* Hero Section */}
      <HeroSection />

      {/* Statistics Section */}
      <section className="py-16 m-0 bg-[#1E3A8A] mb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {statsData.map((statsData, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-blue-50 p-6 rounded-xl shadow-md transition-transform transform hover:scale-105"
                aria-label={statsData.label}
              >
                {/* Display statistic value and label */}
                <div className="text-5xl font-extrabold text-blue-500 mb-2">
                  {statsData.value}
                </div>
                <div className="text-lg text-gray-600 font-medium">
                  {statsData.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 m-0 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center font-bold mb-12">
            Everything you need to manage your Finances.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card
                key={index}
                className="p-6 bg-blue-100 rounded-lg shadow-md"
              >
                <CardContent className="space-y-4 pt-4">
                  <div className="flex items-center space-x-4">
                    {/* Feature icon and title */}
                    <div className="text-blue-500">{feature.icon}</div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="py-16 mt-8 bg-blue-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center font-bold mb-16">
            How it works?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <div className="text-xl font-semibold mb-4">{step.title}</div>
                <div className="text-gray-600">{step.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* How It Works Section */}
      <section className="py-20 mt-12 bg-gradient-to-r from-blue-200 to-blue-100">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <h2 className="text-4xl text-center font-extrabold text-gray-800 mb-16">
            How It Works?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {howItWorksData.map((step, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white shadow-xl rounded-xl transition-transform transform hover:scale-105"
              >
                {/* Step Icon */}
                <div className="w-16 h-16 bg-blue-100 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-2">
                  {step.icon}
                </div>

                {/* Step title and description */}
                <div className="text-xl font-semibold text-gray-700 mb-4">
                  {step.title}
                </div>
                <div className="text-gray-600 leading-relaxed">
                  {step.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="py-16 m-0 bg-blue-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl text-center font-bold mb-16">Testimonials</h2>
          <Carousel className="w-full overflow-hidden">
            <CarouselPrevious />
            <CarouselContent className="flex items-center justify-center">
              {testimonialsData.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="p-6 bg-white rounded-lg shadow-lg text-center w-full max-w-md mx-auto"
                >
                  <div className="flex flex-col items-center">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="rounded-full mb-4"
                    />
                    <div className="text-lg font-bold text-gray-600">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      {testimonial.role}
                    </div>
                    <p className="text-gray-700 italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselNext />
          </Carousel>
        </div>
      </section> */}

      {/* Testimonials Section */}
      <section className="py-16 mt-8 overflow-hidden">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl text-center font-bold mb-10">Testimonials</h2>
          <Carousel className="w-full relative">
            <CarouselContent
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonialsData.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="p-8 bg-blue-100 rounded-lg shadow-lg text-center w-full flex-shrink-0"
                >
                  {/* Testimonial image */}
                  <div className="flex flex-col items-center">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="rounded-full mb-4"
                    />
                    {/* Testimonial name */}
                    <div className="text-xl font-bold text-gray-600">
                      {testimonial.name}
                    </div>
                    {/* Testimonial role */}
                    <div className="text-sm text-gray-600 mb-2">
                      {testimonial.role}
                    </div>
                    {/* Testimonial quote */}
                    <p className="text-gray-700 italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="absolute left-4 transform -translate-y-1/2 top-1/2 z-10 bg-white p-2 rounded-full shadow-md"
              onClick={() =>
                setCurrentIndex(
                  (prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides
                )
              }
            />
            <CarouselNext
              className="absolute right-4 transform -translate-y-1/2 top-1/2 z-10 bg-white p-2 rounded-full shadow-md"
              onClick={() =>
                setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
              }
            />
          </Carousel>
        </div>
      </section>

      {/* Pricing Plan Section */}
      <section className="py-16 mt-8 bg-blue-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-blue-900">
            Pricing Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlansData.map((plan, index) => (
              <Card
                key={index}
                className="p-8 m-4 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 border-t-4 border-blue-500"
              >
                <CardContent>
                  <h3 className="text-2xl font-semibold text-blue-600">
                    {plan.name}
                  </h3>
                  <p className="text-xl text-gray-700 my-4 font-bold">
                    {plan.price}
                  </p>
                  <ul className="text-gray-600 text-left space-y-4 mt-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <span className="text-green-500">✔</span>{" "}
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl text-center font-bold mb-12 text-gray-900">
            FAQs
          </h2>
          <div className="space-y-6">
            <Accordion type="single" collapsible>
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={String(index)}>
                  <div className="p-4 bg-gray-50 rounded-lg shadow-md border-l-4 border-blue-500 hover:bg-gray-200 transition">
                    <AccordionTrigger>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {faq.question}
                      </h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 mt-2">{faq.answer}</p>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl text-center font-bold mb-4 text-white">
            Excited to take control of your financial future with AI-powered
            insights?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Master your finances effortlessly with AI-driven insights. Join
            thousands of users who are already managing their finances. Get
            financially samrter with 💰<span className="text-[#2fffff] font-bold text-lg">WealthWise</span>💰
          </p>
          <Link href="/dashboard" className="mx-auto">
            <Button size="lg" className="rounded-lg bg-white text-blue-600 hover:bg-blue-200 mx-auto animate-bounce">Start your free trial</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
