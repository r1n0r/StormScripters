import React from "react";
import Image from "next/image";
import Link from "next/link";
import FlipCard from "./FlipCard";

const About = () => {
  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
                data-wow-delay=".15s"
              >
                <Image
                  src="/images/about/about-image.svg"
                  alt="about image"
                  fill
                  className="drop-shadow-three dark:hidden dark:drop-shadow-none"
                />
                <Image
                  src="/images/about/about-image-dark.svg"
                  alt="about image"
                  fill
                  className="hidden drop-shadow-three dark:block dark:drop-shadow-none"
                />
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <div className="wow fadeInUp" data-wow-delay=".2s">
                <div className="mb-9">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    About Our Educational Platform
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    We are dedicated to helping students find their path to success through quality education. Our platform connects students with top universities and programs across the region.
                  </p>
                </div>
                <div className="mb-9">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    Why Choose Us?
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    We provide comprehensive information about universities, programs, and admission requirements to help you make informed decisions about your education.
                  </p>
                </div>
                <div className="mb-1">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <h3 className="mb-8 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
              Explore Our Programs
            </h3>
            <FlipCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 