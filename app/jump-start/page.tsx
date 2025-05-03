"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Common/Breadcrumb";

interface Course {
  id: number;
  title: string;
  professor: string;
  description: string;
  skills: string[];
  careerPaths: string[];
}

const courses: Course[] = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    professor: "Dr. Sarah Johnson",
    description: "A comprehensive introduction to computer science fundamentals, programming concepts, and problem-solving techniques.",
    skills: ["Programming", "Problem Solving", "Algorithm Design", "Data Structures"],
    careerPaths: ["Software Developer", "Data Scientist", "Systems Analyst", "IT Consultant"]
  },
  {
    id: 2,
    title: "Business Administration",
    professor: "Prof. Michael Chen",
    description: "Learn the core principles of business management, organizational behavior, and strategic planning.",
    skills: ["Leadership", "Strategic Planning", "Financial Analysis", "Project Management"],
    careerPaths: ["Business Manager", "Entrepreneur", "Management Consultant", "Operations Director"]
  },
  {
    id: 3,
    title: "Digital Marketing",
    professor: "Dr. Emily Rodriguez",
    description: "Master the art of digital marketing, including social media, SEO, content marketing, and analytics.",
    skills: ["Social Media Marketing", "SEO", "Content Creation", "Analytics"],
    careerPaths: ["Digital Marketing Manager", "Social Media Specialist", "SEO Consultant", "Content Strategist"]
  }
];

const JumpStartPage = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.professor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <Breadcrumb
        pageName="Course Explorer"
        description="Explore every course offered at TBU — including who teaches it, what you'll learn, and what career paths it opens up."
      />

      <section className="py-16 md:py-20 lg:py-28">
        <div className="container">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search courses or professors..."
              className="w-full rounded-lg border border-body-color border-opacity-10 bg-white px-4 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-white dark:border-opacity-10 dark:bg-dark dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Course List */}
            <div className="lg:col-span-2">
              <div className="grid gap-6">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="cursor-pointer rounded-lg border border-body-color border-opacity-10 bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:border-white dark:border-opacity-10 dark:bg-dark"
                    onClick={() => setSelectedCourse(course)}
                  >
                    <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
                      {course.title}
                    </h3>
                    <p className="mb-4 text-base text-body-color dark:text-body-color-dark">
                      Professor: {course.professor}
                    </p>
                    <p className="text-base text-body-color dark:text-body-color-dark">
                      {course.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Details */}
            <div className="lg:col-span-1">
              {selectedCourse ? (
                <div className="rounded-lg border border-body-color border-opacity-10 bg-white p-6 shadow-lg dark:border-white dark:border-opacity-10 dark:bg-dark">
                  <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
                    {selectedCourse.title}
                  </h3>
                  <div className="mb-6">
                    <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">
                      Professor
                    </h4>
                    <p className="text-base text-body-color dark:text-body-color-dark">
                      {selectedCourse.professor}
                    </p>
                  </div>
                  <div className="mb-6">
                    <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">
                      Skills You'll Gain
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCourse.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-primary bg-opacity-10 px-3 py-1 text-sm text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">
                      Career Paths
                    </h4>
                    <ul className="list-inside list-disc text-base text-body-color dark:text-body-color-dark">
                      {selectedCourse.careerPaths.map((career, index) => (
                        <li key={index}>{career}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-body-color border-opacity-10 bg-white p-6 text-center shadow-lg dark:border-white dark:border-opacity-10 dark:bg-dark">
                  <p className="text-base text-body-color dark:text-body-color-dark">
                    Select a course to view detailed information
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JumpStartPage; 