'use client';

import { useState } from 'react';
import SectionTitle from '@/components/Common/SectionTitle';
import ScrollUp from '@/components/Common/ScrollUp';
import Image from 'next/image';

interface TourLocation {
  id: number;
  name: string;
  description: string;
  image: string;
}

const tourLocations: TourLocation[] = [
  {
    id: 1,
    name: "Main Campus",
    description: "Welcome to our main campus building. This modern facility houses our main classrooms, administrative offices, and student services.",
    image: "/images/virtual_campus_tours/main_campus.jpg"
  },
  {
    id: 2,
    name: "Library",
    description: "Our state-of-the-art library offers a quiet study environment, digital resources, and collaborative spaces for group work.",
    image: "/images/virtual_campus_tours/library.jpg"
  },
  {
    id: 3,
    name: "Computer Labs",
    description: "Modern computer labs equipped with the latest technology for hands-on learning and research.",
    image: "/images/virtual_campus_tours/computers_lab.jpg"
  },
  {
    id: 4,
    name: "Student Center",
    description: "A vibrant space for students to relax, socialize, and participate in various activities and events.",
    image: "/images/virtual_campus_tours/student_center.jpg"
  }
];

const VirtualCampusTour = () => {
  const [currentLocation, setCurrentLocation] = useState<TourLocation>(tourLocations[0]);

  return (
    <>
      <ScrollUp />
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container">
          <SectionTitle
            title="Virtual Campus Tour"
            paragraph="Explore our campus facilities and get a feel for the learning environment through our interactive virtual tour."
            center
          />

          <div className="grid gap-8 lg:grid-cols-2">
            {/* 360 Tour View */}
            <div className="wow fadeInUp" data-wow-delay=".1s">
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                <Image
                  src={currentLocation.image}
                  alt={currentLocation.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <p className="text-white text-xl font-semibold">360° View Coming Soon</p>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="wow fadeInUp" data-wow-delay=".2s">
              <div className="bg-white dark:bg-dark rounded-lg p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{currentLocation.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {currentLocation.description}
                </p>
                
                {/* Location Navigation */}
                <div className="grid grid-cols-2 gap-4">
                  {tourLocations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => setCurrentLocation(location)}
                      className={`p-4 rounded-lg text-left transition-colors ${
                        currentLocation.id === location.id
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <h3 className="font-semibold">{location.name}</h3>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="wow fadeInUp" data-wow-delay=".3s">
              <div className="bg-white dark:bg-dark rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Opening Hours</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Monday - Friday: 8:00 AM - 8:00 PM<br />
                  Saturday: 9:00 AM - 5:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
            <div className="wow fadeInUp" data-wow-delay=".4s">
              <div className="bg-white dark:bg-dark rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Phone: (123) 456-7890<br />
                  Email: info@campus.edu<br />
                  Address: 123 Campus Street
                </p>
              </div>
            </div>
            <div className="wow fadeInUp" data-wow-delay=".5s">
              <div className="bg-white dark:bg-dark rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Virtual Tour Tips</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  • Use arrow keys to navigate<br />
                  • Click and drag to look around<br />
                  • Click on hotspots for more info
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-gray-50 dark:bg-dark">
        <div className="container">
          <SectionTitle
            title="Campus Location"
            paragraph="Find us on the map and plan your visit to our campus."
            center
          />
          <div className="wow fadeInUp" data-wow-delay=".1s">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.8000000000006!2d19.86003!3d41.2801103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135031a4301009cf%3A0x195b2cf710bbb87c!2sTirana%20Business%20University%20College!5e0!3m2!1sen!2s!4v1710864000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container">
          <SectionTitle
            title="Student Experiences"
            paragraph="Hear what our students have to say about their campus experience."
            center
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="wow fadeInUp" data-wow-delay=".1s">
              <div className="bg-white dark:bg-dark rounded-lg p-8 shadow-lg">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Ermal Hoxha</h3>
                  <p className="text-gray-600 dark:text-gray-300">Informatikë</p>
                  <div className="flex text-yellow-400 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "Fasilitetet e kampusit janë të mrekullueshme! Laboratorët e kompjuterëve janë të pajisur mirë, dhe biblioteka është vendi i përkryer për të studiuar."
                </p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="wow fadeInUp" data-wow-delay=".2s">
              <div className="bg-white dark:bg-dark rounded-lg p-8 shadow-lg">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Anisa Leka</h3>
                  <p className="text-gray-600 dark:text-gray-300">Administrim Biznesi</p>
                  <div className="flex text-yellow-400 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "E dua qendrën e studentëve! Është një vend i shkëlqyeshëm për të takuar miqtë dhe për të marrë pjesë në aktivitete të ndryshme."
                </p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="wow fadeInUp" data-wow-delay=".3s">
              <div className="bg-white dark:bg-dark rounded-lg p-8 shadow-lg">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Blerim Kola</h3>
                  <p className="text-gray-600 dark:text-gray-300">Inxhinieri</p>
                  <div className="flex text-yellow-400 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "Kampusi është i bukur dhe modern. Fasilitetet janë të shkëlqyera, dhe gjithmonë ka diçka interesante që po ndodh."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Interview Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-gray-50 dark:bg-dark">
        <div className="container">
          <SectionTitle
            title="Student Spotlight"
            paragraph="Një intervistë me një nga studentët tanë"
            center
          />
          <div className="grid gap-4 lg:grid-cols-2 items-center">
            {/* Student Image */}
            <div className="wow fadeInUp" data-wow-delay=".1s">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                <Image
                  src="/images/virtual_campus_tours/guy.jpg"
                  alt="Student Interview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Interview Content */}
            <div className="wow fadeInUp" data-wow-delay=".2s">
              <div className="bg-white dark:bg-dark rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Intervistë me Klajdi Mema</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Përshkruani eksperiencën tuaj në TBU</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      "Eksperienca ime në TBU ka qenë jashtëzakonisht pozitive. Mësimdhënësit janë shumë të përgatitur dhe gjithmonë të gatshëm për të ndihmuar. Mjedisi i kampusit është modern dhe stimulues për të mësuar."
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Cilat janë përfitimet e studimit në TBU?</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      "TBU ofron shumë mundësi për zhvillimin profesional. Kemi akses në laboratore moderne, programe praktike, dhe lidhje të forta me industrinë. Gjithashtu, diversiteti i programeve na lejon të zgjedhim rrugën që na përshtatet më së miri."
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Çfarë këshillash do t'u jepnit studentëve të rinj?</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      "Këshilloj studentët e rinj të përfshiren në sa më shumë aktivitete të kampusit, të ndërtojnë lidhje me mësimdhënësit dhe studentët e tjerë, dhe të shfrytëzojnë të gjitha burimet që ofron universiteti. Suksesi vjen nga angazhimi dhe përkushtimi."
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                  <div>
                    <h4 className="font-semibold">Klajdi Mema</h4>
                    <p className="text-gray-600 dark:text-gray-300">Student i Vitit të Tretë - Informatikë</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VirtualCampusTour; 