import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import empoweringinnovation from '../assets/prev-events/empowering_innovation_through_ieee.png';
import ieeejourney from '../assets/prev-events/IEEE&Your_Journey.png';
import neurons_in_silicon from '../assets/prev-events/neurons-in-silicon.png';
import neonova_25 from '../assets/prev-events/neonova_2025.png';
import codesprint1 from '../assets/prev-events/codesprint1.png';
import codesprint2 from '../assets/prev-events/codesprint2.png';
import blockchain_webinar from '../assets/prev-events/blockchain_webinar.png';

const events = [
  {
    title: 'WEBINAR ON Empowering Innovation Through IEEE: Membership Benefits & Opportunities',
    images: [
      empoweringinnovation,
      empoweringinnovation,
      empoweringinnovation
    ],
    desc: 'It highlighted membership benefits like networking on IEEE Collabratec, professional publication access, and career enhancement opportunities.The session also detailed student resources including volunteering roles, project funding, travel grants, technical competitions, and scholarships.',
  },
  {
    title: 'IEEE & Your Tech Journey: Unlocking Opportunities in Computing & Beyond',
    images: [
      ieeejourney,
      ieeejourney,
      ieeejourney
    ],
    desc: '',
  },
  {
    title: 'WEBINAR ON “Neurons in Silicon"',
    images: [
      neurons_in_silicon,
      neurons_in_silicon,
      neurons_in_silicon
    ],
    desc: 'A full-stack web development bootcamp spanning two weekends. Attendees learned React, Node.js, and MongoDB while building a complete project from scratch with guided mentorship.',
  },
  {
    title: 'NEONOVA - AU IEEE Computer Society’s Ideathon',
    images: [
      neonova_25,
      neonova_25,
      neonova_25
    ],
    desc: 'Industry experts from leading cloud providers shared insights on modern cloud architectures, serverless computing, and best practices for deploying scalable applications on AWS, Azure, and GCP.',
  },
  {
    title: 'CodeSprint – “Think Fast. Code Faster.”',
    images: [
      codesprint1,
      codesprint2,
      codesprint1
    ],
    desc: 'A competitive Capture The Flag cybersecurity event with 50+ teams battling through challenges in cryptography, reverse engineering, web exploitation, and forensics.',
  },
  {
    title: 'Webinar on “Unveiling Blockchain: Its Purpose and Applications”',
    images: [
      blockchain_webinar,
      blockchain_webinar,
      blockchain_webinar,
    ],
    desc: 'A collaborative event where students contributed to real open-source projects under the guidance of experienced mentors. Over 100 pull requests were submitted across multiple repositories.',
  },
];

const EventCarousel = () => {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const modalRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const rafId = requestAnimationFrame(() => {
      const cards = track.children;
      const totalCards = cards.length;
      const halfCount = totalCards / 2;

      let setWidth = 0;
      for (let i = 0; i < halfCount; i++) {
        setWidth += cards[i].offsetWidth + 24;
      }

      tweenRef.current = gsap.to(track, {
        x: -setWidth,
        duration: 30,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % setWidth),
        },
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      tweenRef.current?.kill();
    };
  }, []);

  const handleMouseEnter = () => tweenRef.current?.pause();
  const handleMouseLeave = () => {
    if (!selectedEvent) tweenRef.current?.resume();
  };

  const openModal = (evt) => {
    setSelectedEvent(evt);
    setPhotoIndex(0);
    tweenRef.current?.pause();
    requestAnimationFrame(() => {
      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }
        );
      }
    });
  };

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.92,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setSelectedEvent(null);
          setPhotoIndex(0);
          tweenRef.current?.resume();
        },
      });
    } else {
      setSelectedEvent(null);
      setPhotoIndex(0);
      tweenRef.current?.resume();
    }
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    if (!selectedEvent) return;
    setPhotoIndex((prev) =>
      prev === 0 ? selectedEvent.images.length - 1 : prev - 1
    );
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    if (!selectedEvent) return;
    setPhotoIndex((prev) =>
      prev === selectedEvent.images.length - 1 ? 0 : prev + 1
    );
  };

  // Use first image from each event for carousel thumbnails
  const allEvents = [...events, ...events];

  return (
    <>
      <div
        className="carousel-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="carousel-track" ref={trackRef}>
          {allEvents.map((evt, i) => (
            <div
              key={i}
              className="carousel-card-photo group cursor-pointer"
              onClick={() => openModal(events[i % events.length])}
            >
              <img
                src={evt.images[0]}
                alt={evt.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Expanded Event Modal ── */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 h-full w-full overflow-y-auto"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal Content — larger */}
          <div
            ref={modalRef}
            className="relative w-full bg-white dark:bg-ieee-dark-card rounded-2xl overflow-hidden shadow-2xl"
            style={{ maxWidth: '960px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image with arrows */}
            <div className="relative w-full overflow-hidden" style={{ height: 'clamp(300px, 50vh, 540px)' }}>
              <img
                src={selectedEvent.images[photoIndex]}
                alt={`${selectedEvent.title} photo ${photoIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Left Arrow */}
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center text-2xl font-bold transition-colors duration-200 cursor-pointer backdrop-blur-sm"
                aria-label="Previous photo"
              >
                ‹
              </button>

              {/* Right Arrow */}
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center text-2xl font-bold transition-colors duration-200 cursor-pointer backdrop-blur-sm"
                aria-label="Next photo"
              >
                ›
              </button>

              {/* Photo counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full">
                {photoIndex + 1} / {selectedEvent.images.length}
              </div>
            </div>

            {/* Details */}
            <div className="p-8 md:p-10">
              <h3 className="text-2xl md:text-4xl font-bold text-ieee-dark dark:text-ieee-white mb-4">
                {selectedEvent.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                {selectedEvent.desc}
              </p>
              <button
                onClick={closeModal}
                className="px-8 py-3 bg-ieee-orange text-white font-bold rounded-full hover:bg-orange-600 transition-colors duration-200 cursor-pointer text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventCarousel;
