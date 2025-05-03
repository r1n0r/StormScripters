"use client";
import Header from "@/components/Header";

const QuizPage = () => {
  return (
    <>
      <Header />
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Quiz
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Quiz functionality coming soon...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QuizPage; 