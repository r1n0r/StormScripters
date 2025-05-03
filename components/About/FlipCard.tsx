import React from 'react';

interface University {
  name: string;
  location: string;
}

interface Subject {
  title: string;
  description: string;
  universities: University[];
}

const subjects: Subject[] = [
  {
    title: "Business & Economics",
    description: "Explore the world of business, finance, and economics at top universities in the region.",
    universities: [
      { name: "Tirana Business University (TBU)", location: "Tirana, Albania" },
      { name: "Epoka University", location: "Tirana, Albania" },
      { name: "University of Tirana, Faculty of Economics", location: "Tirana, Albania" },
      { name: "American College of Thessaloniki (ACT)", location: "Thessaloniki, Greece" }
    ]
  },
  {
    title: "Computer Science & IT",
    description: "Dive into the world of technology and innovation at leading institutions.",
    universities: [
      { name: "Epoka University", location: "Tirana, Albania" },
      { name: "Polytechnic University of Tirana (UPT)", location: "Tirana, Albania" },
      { name: "University of Pristina", location: "Pristina, Kosovo" },
      { name: "University of Ljubljana, Faculty of Computer and Information Science", location: "Ljubljana, Slovenia" }
    ]
  },
  {
    title: "Law",
    description: "Study law and justice at prestigious law schools across the region.",
    universities: [
      { name: "University of Tirana, Faculty of Law", location: "Tirana, Albania" },
      { name: "Tirana Business University (TBU)", location: "Tirana, Albania" },
      { name: "University of Sarajevo, Faculty of Law", location: "Sarajevo, Bosnia and Herzegovina" },
      { name: "University of Belgrade, Faculty of Law", location: "Belgrade, Serbia" }
    ]
  },
  {
    title: "Medicine",
    description: "Pursue a career in healthcare at renowned medical schools.",
    universities: [
      { name: "University of Medicine, Tirana", location: "Tirana, Albania" },
      { name: "University of Pristina, Faculty of Medicine", location: "Pristina, Kosovo" },
      { name: "Ss. Cyril and Methodius University of Skopje, Faculty of Medicine", location: "Skopje, North Macedonia" },
      { name: "University of Zagreb, School of Medicine", location: "Zagreb, Croatia" }
    ]
  }
];

const FlipCard = () => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {subjects.map((subject, index) => (
        <div key={index} className="group h-[400px] [perspective:1000px]">
          <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            {/* Front of card */}
            <div className="absolute inset-0">
              <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-white p-6 text-center shadow-xl dark:bg-dark">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
                  {subject.title}
                </h3>
                <p className="text-body-color dark:text-body-color-dark">
                  {subject.description}
                </p>
              </div>
            </div>
            {/* Back of card */}
            <div className="absolute inset-0 h-full w-full rounded-xl bg-primary px-12 text-center text-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <div className="flex min-h-full flex-col items-center justify-center">
                <h3 className="mb-4 text-xl font-bold">{subject.title}</h3>
                <ul className="space-y-2 text-left">
                  {subject.universities.map((university, idx) => (
                    <li key={idx} className="text-sm">
                      <span className="font-semibold">{university.name}</span>
                      <br />
                      <span className="text-primary/80">{university.location}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlipCard; 