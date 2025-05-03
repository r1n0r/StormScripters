"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useLanguage } from "@/context/LanguageContext";

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    careerPath: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "questions.workEnvironment",
    options: [
      { text: "options.fastPaced", careerPath: "dynamic" },
      { text: "options.creative", careerPath: "creative" },
      { text: "options.structured", careerPath: "analytical" },
      { text: "options.social", careerPath: "social" },
    ],
  },
  {
    id: 2,
    text: "questions.problemSolving",
    options: [
      { text: "options.innovation", careerPath: "dynamic" },
      { text: "options.artistic", careerPath: "creative" },
      { text: "options.data", careerPath: "analytical" },
      { text: "options.helping", careerPath: "social" },
    ],
  },
  {
    id: 3,
    text: "questions.impact",
    options: [
      { text: "options.products", careerPath: "dynamic" },
      { text: "options.art", careerPath: "creative" },
      { text: "options.systems", careerPath: "analytical" },
      { text: "options.difference", careerPath: "social" },
    ],
  },
  {
    id: 4,
    text: "questions.skills",
    options: [
      { text: "options.leadership", careerPath: "dynamic" },
      { text: "options.design", careerPath: "creative" },
      { text: "options.technical", careerPath: "analytical" },
      { text: "options.communication", careerPath: "social" },
    ],
  },
  {
    id: 5,
    text: "questions.challenges",
    options: [
      { text: "options.ventures", careerPath: "dynamic" },
      { text: "options.solutions", careerPath: "creative" },
      { text: "options.problems", careerPath: "analytical" },
      { text: "options.success", careerPath: "social" },
    ],
  },
];

const careerResults = {
  dynamic: {
    title: "dynamicPath.title",
    description: "dynamicPath.description",
    careers: [
      "Entrepreneur",
      "Business Development Manager",
      "Product Manager",
      "Startup Founder",
      "Innovation Consultant",
    ],
  },
  creative: {
    title: "creativePath.title",
    description: "creativePath.description",
    careers: [
      "Graphic Designer",
      "UI/UX Designer",
      "Art Director",
      "Creative Director",
      "Brand Strategist",
    ],
  },
  analytical: {
    title: "analyticalPath.title",
    description: "analyticalPath.description",
    careers: [
      "Data Scientist",
      "Software Engineer",
      "Research Analyst",
      "Systems Architect",
      "Technical Consultant",
    ],
  },
  social: {
    title: "socialPath.title",
    description: "socialPath.description",
    careers: [
      "Human Resources Manager",
      "Social Worker",
      "Counselor",
      "Community Manager",
      "Education Coordinator",
    ],
  },
};

const CareerMatchChallenge = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<string>("");
  const [futureNote, setFutureNote] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);
  const { t } = useLanguage();

  const handleAnswer = (careerPath: string) => {
    const newAnswers = [...answers, careerPath];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const careerCounts = newAnswers.reduce((acc, path) => {
        acc[path] = (acc[path] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const mostFrequentCareer = Object.entries(careerCounts).reduce(
        (a, b) => (b[1] > a[1] ? b : a)
      )[0];

      setSelectedCareer(mostFrequentCareer);
      setShowResult(true);
    }
  };

  const handleSaveNote = () => {
    setNoteSaved(true);
    setShowNoteInput(false);
    setTimeout(() => setNoteSaved(false), 3000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedCareer("");
    setFutureNote("");
    setShowNoteInput(false);
    setNoteSaved(false);
  };

  return (
    <>
      <Header />
      <Breadcrumb
        pageName={t("careerMatchTitle")}
        description={t("careerMatchDescription")}
      />

      <div className="container mx-auto px-4 py-8">
        {!showResult ? (
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t("question")} {currentQuestion + 1} {t("of")} {questions.length}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              {t(questions[currentQuestion].text)}
            </h2>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.careerPath)}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {t(option.text)}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {t(careerResults[selectedCareer as keyof typeof careerResults].title)}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t(careerResults[selectedCareer as keyof typeof careerResults].description)}
              </p>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("relatedCareers")}:
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  {careerResults[selectedCareer as keyof typeof careerResults].careers.map(
                    (career, index) => (
                      <li key={index}>{career}</li>
                    )
                  )}
                </ul>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={resetQuiz}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t("takeQuizAgain")}
              </button>
              <button
                onClick={() => setShowNoteInput(true)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {t("writeToFuture")}
              </button>
            </div>

            {showNoteInput && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {t("writeNoteToFuture")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {t("inFiveYears")}
                  </p>
                  <textarea
                    value={futureNote}
                    onChange={(e) => setFutureNote(e.target.value)}
                    className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                    placeholder={t("inFiveYears")}
                  />
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setShowNoteInput(false)}
                      className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                    >
                      {t("cancel")}
                    </button>
                    <button
                      onClick={handleSaveNote}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {t("saveNote")}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {noteSaved && (
              <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
                {t("noteSaved")}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CareerMatchChallenge; 