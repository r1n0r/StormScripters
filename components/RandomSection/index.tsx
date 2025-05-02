const RandomSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp" data-wow-delay=".2s">
              <h2 className="mb-9 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                Discover Your Perfect Career Path
              </h2>
              <p className="mb-9 text-base leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg sm:leading-relaxed">
                Take our comprehensive career quiz to find out which field best matches your interests, skills, and personality. Our quiz analyzes your preferences across various aspects of work and study to suggest the most suitable career path for you.
              </p>
              <p className="mb-9 text-base leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg sm:leading-relaxed">
                The quiz consists of 15 carefully crafted questions that will help us understand your preferences in different work environments, tools, and activities. Based on your answers, we'll suggest the most suitable career path from our range of programs.
              </p>
              <div className="mb-10 flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <a
                  href="/quiz"
                  className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                >
                  Start Quiz
                </a>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0" data-wow-delay=".2s">
              <img
                src="/images/features/quiz-image.svg"
                alt="quiz image"
                className="mx-auto max-w-full lg:mr-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RandomSection; 