"use client";

import { useState, useEffect } from "react";

const collegeQuestions = [
  {
    question: "Which of these activities do you enjoy the most?",
    options: ["Designing apps", "Leading a team", "Writing blogs", "Analyzing data"],
    scores: ["Software Engineering", "Management", "Marketing", "Business Informatics"]
  },
  {
    question: "Which tool would you prefer to use?",
    options: ["VS Code", "Excel", "WordPress", "Legal documents"],
    scores: ["Computer Engineering", "Finance & Accounting", "Marketing", "Law"]
  },
  {
    question: "You get assigned a team project. What role do you take?",
    options: ["Developer", "Team leader", "Presenter", "Strategist"],
    scores: ["Software Engineering", "Management", "Marketing", "Business Administration"]
  },
  {
    question: "What excites you the most?",
    options: ["New tech trends", "Financial markets", "Brand growth", "Rules and policies"],
    scores: ["Computer Engineering", "Finance & Accounting", "Marketing", "Law"]
  },
  {
    question: "Which environment sounds best to you?",
    options: ["Startup coding team", "Corporate office", "Marketing agency", "Law firm"],
    scores: ["Software Engineering", "Business Administration", "Marketing", "Law"]
  },
  {
    question: "Choose a task:",
    options: ["Build a website", "Balance accounts", "Plan a campaign", "Create a business plan"],
    scores: ["Software Engineering", "Finance & Accounting", "Marketing", "Business Administration"]
  },
  {
    question: "How do you usually solve problems?",
    options: ["Coding a solution", "Analyzing the issue", "Brainstorming ideas", "Following rules"],
    scores: ["Software Engineering", "Business Informatics", "Marketing", "Law"]
  },
  {
    question: "What do you value most in a job?",
    options: ["Innovation", "Structure", "Creativity", "Leadership"],
    scores: ["Computer Engineering", "Law", "Marketing", "Management"]
  },
  {
    question: "Which subject interests you the most?",
    options: ["Programming", "Business", "Media", "Justice"],
    scores: ["Computer Engineering", "Business Administration", "Marketing", "Law"]
  },
  {
    question: "If you had to pick one, what would you rather do?",
    options: ["Debug code", "Audit finances", "Plan a campaign", "Manage a company"],
    scores: ["Software Engineering", "Finance & Accounting", "Marketing", "Management"]
  },
  {
    question: "What's your ideal project?",
    options: ["Developing software", "Organizing a team", "Analyzing business needs", "Creating ads"],
    scores: ["Computer Engineering", "Management", "Business Informatics", "Marketing"]
  },
  {
    question: "Choose your dream job:",
    options: ["App Developer", "CEO", "Digital Marketer", "Corporate Lawyer"],
    scores: ["Software Engineering", "Management", "Marketing", "Law"]
  },
  {
    question: "How do you prefer to make decisions?",
    options: ["Using data", "Based on law", "With creativity", "By leading a group"],
    scores: ["Business Informatics", "Law", "Marketing", "Management"]
  },
  {
    question: "What's your favorite part of school?",
    options: ["Computer class", "Debates", "Group projects", "Presentations"],
    scores: ["Computer Engineering", "Law", "Management", "Marketing"]
  },
  {
    question: "Pick a tool you'd love to master:",
    options: ["Python", "Excel", "Google Ads", "Contracts"],
    scores: ["Software Engineering", "Finance & Accounting", "Marketing", "Law"]
  }
];

const nonCollegeQuestions = [
  {
    question: "How do you like to express yourself?",
    options: ["Drawing or painting", "Fixing machines", "Making clothes", "Telling stories"],
    scores: ["Artist", "Tinkerer", "Tailor", "Storyteller"]
  },
  {
    question: "Which activity sounds most fun?",
    options: ["Singing", "Gardening", "Baking", "Crafting"],
    scores: ["Performer", "Grower", "Baker", "Creator"]
  },
  {
    question: "Your friends often ask you for help with:",
    options: ["Fixing stuff", "Making something creative", "Helping them carry things", "Styling their look"],
    scores: ["Tinkerer", "Creator", "Mover", "Stylist"]
  },
  {
    question: "What space would you love to work in?",
    options: ["Kitchen", "Workshop", "Garden", "Stage"],
    scores: ["Baker", "Tinkerer", "Grower", "Performer"]
  },
  {
    question: "Pick a word that fits you:",
    options: ["Energetic", "Creative", "Organized", "Helpful"],
    scores: ["Mover", "Artist", "Tailor", "Stylist"]
  },
  {
    question: "What do you enjoy doing most?",
    options: ["Decorating things", "Making people laugh", "Tending plants", "Using tools"],
    scores: ["Artist", "Storyteller", "Grower", "Tinkerer"]
  },
  {
    question: "Which of these hobbies do you like?",
    options: ["Sewing", "Baking", "Fixing gadgets", "Drawing"],
    scores: ["Tailor", "Baker", "Tinkerer", "Artist"]
  },
  {
    question: "How do you handle challenges?",
    options: ["Hands-on fixing", "Try a creative approach", "Stay calm and organized", "Make it fun"],
    scores: ["Tinkerer", "Creator", "Tailor", "Storyteller"]
  },
  {
    question: "What would you rather learn?",
    options: ["New recipe", "Make-up techniques", "How to tell stories", "How to grow food"],
    scores: ["Baker", "Stylist", "Storyteller", "Grower"]
  },
  {
    question: "What gives you satisfaction?",
    options: ["Helping others", "Creating something unique", "Improving a space", "Entertaining people"],
    scores: ["Mover", "Creator", "Tailor", "Performer"]
  },
  {
    question: "What kind of tools do you like?",
    options: ["Brushes", "Wrenches", "Measuring tape", "Microphone"],
    scores: ["Artist", "Tinkerer", "Tailor", "Performer"]
  },
  {
    question: "What motivates you most?",
    options: ["Freedom to create", "Making others happy", "Being useful", "Doing something new every day"],
    scores: ["Artist", "Stylist", "Mover", "Storyteller"]
  },
  {
    question: "What are you most drawn to?",
    options: ["Food", "Fashion", "Repairs", "Plants"],
    scores: ["Baker", "Stylist", "Tinkerer", "Grower"]
  },
  {
    question: "How do you like to help people?",
    options: ["Cooking", "Lifting & carrying", "Giving advice", "Making them laugh"],
    scores: ["Baker", "Mover", "Stylist", "Performer"]
  },
  {
    question: "Pick a space you'd love to decorate:",
    options: ["Cake", "Room", "Outfit", "Stage"],
    scores: ["Baker", "Artist", "Tailor", "Performer"]
  },
  {
    question: "What sounds relaxing to you?",
    options: ["Baking bread", "Drawing quietly", "Fixing something", "Watering plants"],
    scores: ["Baker", "Artist", "Tinkerer", "Grower"]
  },
  {
    question: "What kind of books or videos do you prefer?",
    options: ["DIY tips", "Comedy shows", "Fashion vlogs", "Cooking tutorials"],
    scores: ["Tinkerer", "Storyteller", "Stylist", "Baker"]
  },
  {
    question: "Choose a tool you'd like to master:",
    options: ["Drill", "Whisk", "Hairbrush", "Sewing machine"],
    scores: ["Tinkerer", "Baker", "Stylist", "Tailor"]
  },
  {
    question: "What kind of day sounds good?",
    options: ["Entertaining a group", "Working with hands", "Designing something", "Organizing a space"],
    scores: ["Performer", "Tinkerer", "Tailor", "Mover"]
  },
  {
    question: "You feel happiest when you...",
    options: ["Make something from scratch", "Help someone out", "Fix something broken", "Get creative"],
    scores: ["Creator", "Mover", "Tinkerer", "Artist"]
  }
];

const collegeResults = {
  "Software Engineering": {
    text: "You might be great in Software Engineering!",
    career: "If you finish this program, you can become a software developer, web developer, or app engineer."
  },
  "Business Administration": {
    text: "You seem suited for Business Administration!",
    career: "If you finish this program, you can become a business manager, HR officer, or operations coordinator."
  },
  "Business Informatics": {
    text: "You might enjoy Business Informatics!",
    career: "If you finish this program, you can become a business analyst, IT consultant, or ERP specialist."
  },
  "Computer Engineering": {
    text: "Computer Engineering could be your path!",
    career: "If you finish this program, you can become a hardware engineer, embedded systems designer, or IT technician."
  },
  "Management": {
    text: "You might thrive in Management!",
    career: "If you finish this program, you can become a project manager, team leader, or executive assistant."
  },
  "Finance & Accounting": {
    text: "Finance & Accounting may suit your skills!",
    career: "If you finish this program, you can become an accountant, auditor, or financial analyst."
  },
  "Marketing": {
    text: "Marketing could be a strong match for you!",
    career: "If you finish this program, you can become a marketing coordinator, brand manager, or social media specialist."
  },
  "Law": {
    text: "You may be interested in Law!",
    career: "If you finish this program, you can become a legal advisor, compliance officer, or contract specialist."
  }
};

const nonCollegeResults = {
  "Tinkerer": {
    text: "You're a Tinkerer!",
    career: "You enjoy solving hands-on problems and working with tools."
  },
  "Artist": {
    text: "You're an Artist!",
    career: "You love expressing yourself visually and bringing beauty into the world."
  },
  "Tailor": {
    text: "You're a Tailor!",
    career: "You're precise, creative, and enjoy crafting with fabric and design."
  },
  "Storyteller": {
    text: "You're a Storyteller!",
    career: "You connect with people through words, humor, and shared experiences."
  },
  "Grower": {
    text: "You're a Grower!",
    career: "You enjoy nature, nurturing things, and working with your hands outdoors."
  },
  "Stylist": {
    text: "You're a Stylist!",
    career: "You're expressive and love helping others look and feel their best."
  },
  "Baker": {
    text: "You're a Baker!",
    career: "You enjoy creating delicious things and working with your hands in the kitchen."
  },
  "Mover": {
    text: "You're a Mover!",
    career: "You're energetic, reliable, and enjoy physically helping people."
  },
  "Creator": {
    text: "You're a Creator!",
    career: "You enjoy making new things and being hands-on in your work."
  },
  "Performer": {
    text: "You're a Performer!",
    career: "You shine in front of others and love to entertain, share, and engage."
  }
};

const infoCards = [
  {
    title: "Personalized Assessment",
    description: "Our quiz adapts to your answers, providing a tailored career path recommendation based on your interests and skills."
  },
  {
    title: "Comprehensive Analysis",
    description: "We evaluate multiple aspects of your personality and preferences to suggest the most suitable career options."
  },
  {
    title: "Real-World Insights",
    description: "Get practical information about potential careers, including required skills and typical job responsibilities."
  },
  {
    title: "Career Path Options",
    description: "Discover both traditional and alternative career paths that match your unique strengths and interests."
  },
  {
    title: "Skill Development",
    description: "Learn about the skills you'll need to develop for your recommended career paths and how to acquire them."
  },
  {
    title: "Next Steps Guidance",
    description: "Receive actionable advice on how to pursue your recommended career paths and achieve your goals."
  }
];

export default function QuizPage() {
  const [mounted, setMounted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scoreCount, setScoreCount] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [topResult, setTopResult] = useState(null);
  const [quizType, setQuizType] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAnswer = (index) => {
    const questions = quizType === 'college' ? collegeQuestions : nonCollegeQuestions;
    const selectedScore = questions[currentQuestion].scores[index];
    const updatedScores = {
      ...scoreCount,
      [selectedScore]: (scoreCount[selectedScore] || 0) + 1
    };
    setScoreCount(updatedScores);

    if (currentQuestion + 1 === questions.length) {
      const top = Object.keys(updatedScores).reduce((a, b) =>
        updatedScores[a] > updatedScores[b] ? a : b
      );
      setTopResult(top);
      setShowResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScoreCount({});
    setShowResult(false);
    setTopResult(null);
    setQuizType(null);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[#F1EFEC]" />;
  }

  if (!quizType) {
    return (
      <div className="min-h-screen bg-[#F1EFEC] py-16 mt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-[#123458] mb-4">Choose Your Path</h1>
            <p className="text-lg text-gray-600">Select the quiz that best matches your career goals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center cursor-pointer hover:shadow-2xl transition-all duration-300"
                 onClick={() => setQuizType('college')}>
              <h2 className="text-2xl font-bold text-[#123458] mb-4">Careers That Need College</h2>
              <p className="text-gray-600">Take this quiz to discover professional career paths that require a college degree.</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center cursor-pointer hover:shadow-2xl transition-all duration-300"
                 onClick={() => setQuizType('non-college')}>
              <h2 className="text-2xl font-bold text-[#123458] mb-4">Careers That Don't Need College</h2>
              <p className="text-gray-600">Some people aren't cut out for college. Discover rewarding careers that value skills and experience over degrees.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {infoCards.map((card, index) => (
              <div key={index} 
                   className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-semibold text-[#123458] mb-3">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const questions = quizType === 'college' ? collegeQuestions : nonCollegeQuestions;
  const results = quizType === 'college' ? collegeResults : nonCollegeResults;

  return (
    <div className="min-h-screen bg-[#F1EFEC] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center">
        {!showResult ? (
          <>
            <h2 className="text-xl font-semibold mb-4">
              {questions[currentQuestion]?.question}
            </h2>
            <div className="flex flex-col gap-3">
              {questions[currentQuestion]?.options?.map((option, index) => (
                <button
                  key={index}
                  className="bg-[#123458] text-white py-2 rounded-xl hover:opacity-90"
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-[#123458] mb-4">
              Your Suggested Path
            </h2>
            {topResult && results[topResult] && (
              <>
                <p className="text-lg mb-2">{results[topResult].text}</p>
                <p className="text-md text-gray-700 mb-6">{results[topResult].career}</p>
              </>
            )}
            <button
              onClick={resetQuiz}
              className="bg-[#123458] text-white py-2 px-6 rounded-xl hover:opacity-90"
            >
              Take Another Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 