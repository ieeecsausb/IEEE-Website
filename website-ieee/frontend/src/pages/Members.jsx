import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

/* ── Data ───────────────────────────────────────────── */

const mentor = {
  name: "Dr. Faculty Name",
  role: "Faculty Mentor",
  img: "https://via.placeholder.com/150",
};

const teams = [
  {
    label: "Executives",
    accent: "from-ieee-orange to-amber-500",
    members: [
      { name: "Member 1", role: "Chairperson", img: "" },
      { name: "Member 2", role: "Vice Chair", img: "" },
      { name: "Member 3", role: "Secretary", img: "" },
      { name: "Member 4", role: "Treasurer", img: "" },
      { name: "Member 5", role: "Joint Secretary", img: "" },
    ],
  },
  {
    label: "Tech",
    accent: "from-blue-500 to-cyan-400",
    members: [
      { name: "Member 1", role: "Tech Lead", img: "" },
      { name: "Member 2", role: "Full Stack Dev", img: "" },
      { name: "Member 3", role: "Backend Dev", img: "" },
      { name: "Member 4", role: "Frontend Dev", img: "" },
      { name: "Member 5", role: "ML Engineer", img: "" },
      { name: "Member 6", role: "App Dev", img: "" },
    ],
  },
  {
    label: "Design",
    accent: "from-pink-500 to-rose-400",
    members: [
      { name: "Member 1", role: "Design Lead", img: "" },
      { name: "Member 2", role: "UI/UX Designer", img: "" },
      { name: "Member 3", role: "Graphic Designer", img: "" },
      { name: "Member 4", role: "Motion Designer", img: "" },
      { name: "Member 5", role: "Visual Designer", img: "" },
    ],
  },
  {
    label: "Media",
    accent: "from-violet-500 to-purple-400",
    members: [
      { name: "Member 1", role: "Media Lead", img: "" },
      { name: "Member 2", role: "Content Writer", img: "" },
      { name: "Member 3", role: "Photographer", img: "" },
    ],
  },
  {
    label: "Ops & Logistics",
    accent: "from-emerald-500 to-teal-400",
    members: [
      { name: "Member 1", role: "Ops Lead", img: "" },
      { name: "Member 2", role: "Logistics Coordinator", img: "" },
      { name: "Member 3", role: "Volunteer Coordinator", img: "" },
    ],
  },
  {
    label: "Events",
    accent: "from-yellow-500 to-orange-400",
    members: [
      { name: "Member 1", role: "Events Lead", img: "" },
      { name: "Member 2", role: "Event Coordinator", img: "" },
      { name: "Member 3", role: "Event Planner", img: "" },
      { name: "Member 4", role: "Event Manager", img: "" },
    ],
  },
];

/* ── Card Component ─────────────────────────────────── */

const MemberCard = ({ name, role, img, large }) => (
  <div
    className={`group relative bg-white dark:bg-ieee-dark-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-[transform,box-shadow] duration-300 transform hover:-translate-y-2 w-full ${large ? "max-w-md mx-auto" : ""}`}
  >
    <div
      className={`w-full overflow-hidden bg-gray-200 dark:bg-ieee-dark-accent relative ${large ? "h-72" : "h-64"}`}
    >
      {img ? (
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 text-5xl font-bold bg-gray-100 dark:bg-ieee-dark-card group-hover:scale-110 transition-transform duration-500">
          {name.charAt(0)}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
        <div className="flex space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="w-8 h-8 bg-ieee-orange rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white hover:text-ieee-orange transition-colors text-xs font-bold">
            in
          </div>
          <div className="w-8 h-8 bg-ieee-orange rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white hover:text-ieee-orange transition-colors text-xs font-bold">
            @
          </div>
        </div>
      </div>
    </div>
    <div className="p-6 text-center">
      <h3 className="text-xl font-bold text-ieee-dark dark:text-ieee-white mb-1 group-hover:text-ieee-orange transition-colors">
        {name}
      </h3>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {role}
      </p>
    </div>
  </div>
);

/* ── Page ───────────────────────────────────────────── */

const Members = () => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
    );
  }, []);

  // Animate cards in when tab changes
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.children;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out",
      },
    );
  }, [activeTab]);

  const activeTeam = teams[activeTab];

  return (
    <div className="min-h-screen bg-ieee-warm-white dark:bg-ieee-dark transition-colors duration-300">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        ref={containerRef}
      >
        {/* Page Header */}
        <h1 className="text-5xl font-bold text-center mb-4 text-ieee-dark dark:text-ieee-white">
          Meet The <span className="text-ieee-orange">Team</span>
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto text-lg">
          The passionate individuals driving innovation and community at IEEE CS
          AU.
        </p>

        {/* ── Mentor ── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10 text-ieee-dark dark:text-ieee-white">
            <span className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-ieee-orange to-amber-500 text-white text-lg tracking-wide shadow-md">
              Mentor
            </span>
          </h2>
          <div className="flex justify-center">
            <MemberCard
              name={mentor.name}
              role={mentor.role}
              img={mentor.img}
              large
            />
          </div>
        </section>

        {/* ── Team Tab Bar ── */}
        <nav className="flex flex-wrap justify-center gap-3 mb-14">
          {teams.map((team, idx) => (
            <button
              key={team.label}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer border-2 ${
                activeTab === idx
                  ? "bg-ieee-orange text-white border-transparent shadow-lg scale-105"
                  : "bg-white dark:bg-ieee-dark-card text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-ieee-orange hover:text-ieee-orange dark:hover:border-ieee-orange dark:hover:text-ieee-orange"
              }`}
            >
              {team.label}
            </button>
          ))}
        </nav>

        {/* ── Active Team Members ── */}
        <section>
          <div
            ref={gridRef}
            className="flex flex-wrap justify-center gap-8"
          >
            {activeTeam.members.map((m, i) => (
              <div key={`${activeTab}-${i}`} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]">
                <MemberCard name={m.name} role={m.role} img={m.img} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Members;

