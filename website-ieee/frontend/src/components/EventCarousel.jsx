import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const events = [
  { title: 'HackForge 2025', img: 'https://picsum.photos/seed/ieee1/600/400' },
  { title: 'AI/ML Workshop', img: 'https://picsum.photos/seed/ieee2/600/400' },
  { title: 'WebDev Bootcamp', img: 'https://picsum.photos/seed/ieee3/600/400' },
  { title: 'Cloud Computing Seminar', img: 'https://picsum.photos/seed/ieee4/600/400' },
  { title: 'CTF Challenge', img: 'https://picsum.photos/seed/ieee5/600/400' },
  { title: 'Open Source Day', img: 'https://picsum.photos/seed/ieee6/600/400' },
  { title: 'Tech Talks Series', img: 'https://picsum.photos/seed/ieee7/600/400' },
  { title: 'Annual Tech Fest', img: 'https://picsum.photos/seed/ieee8/600/400' },
];

const EventCarousel = () => {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const rafId = requestAnimationFrame(() => {
      const cards = track.children;
      const totalCards = cards.length;
      const halfCount = totalCards / 2;

      let setWidth = 0;
      for (let i = 0; i < halfCount; i++) {
        setWidth += cards[i].offsetWidth + 24; // 24px = gap-6
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
  const handleMouseLeave = () => tweenRef.current?.resume();

  const allEvents = [...events, ...events];

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="carousel-track" ref={trackRef}>
        {allEvents.map((evt, i) => (
          <div key={i} className="carousel-card-photo group">
            <img
              src={evt.img}
              alt={evt.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCarousel;
