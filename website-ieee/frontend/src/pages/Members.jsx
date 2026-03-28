import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import ojas from "../assets/ojas.png";
import shreem from "../assets/shreem.png";
import shaan from "../assets/shaan.png";
import hemanth from "../assets/hemanth.png";
import sharmila from "../assets/sharmila.jpg";
import kaushik from "../assets/kaushik.jpeg";
import naraen from "../assets/naraen1.png";
import akshaya from "../assets/akshaya.png";
import lokesh from "../assets/lokesh.png";
import saran from "../assets/saran.jpeg";
import prannitha from "../assets/prannitha.png";
import amitha from "../assets/amitha.jpeg";
import kaaviya from "../assets/kaaviya.png";
import preethi from "../assets/preethi.jpeg";
import nimitha from "../assets/nimithashree.jpeg";
import varshini from "../assets/varshini.jpeg";
import tanvi from "../assets/tanvi.png";
import harini from "../assets/harini.jpeg";
import dhanush from "../assets/dhanush.png";
import aadhi from "../assets/aadhi.png";
import chandini from "../assets/chandini.png";
import abhinav from "../assets/abhinav.png";
import siva from "../assets/siva sanjay.jpeg";
import swayam from "../assets/swayam.png";
import sheik from "../assets/sheik.png";



/* ── Data ───────────────────────────────────────────── */

const mentor = {
  name: "Dr. T Sree Sharmila",
  role: "Faculty Mentor",
  img: sharmila,
};

const teams = [
  {
    label: "Executives",
    accent: "from-ieee-orange to-amber-500",
    members: [
      { name: "Ojaskrisshnan", role: "Chairperson", img: ojas, objectPos: "object-contain" },
      { name: "Swayamprabha", role: "Vice Chair", img: swayam },
      { name: "Shreem Seth", role: "Secretary", img: shreem },
      { name: "Hemananth R", role: "Treasurer", img: hemanth },
      { name: "Shaan", role: "Joint Secretary", img: shaan, objectPos: "object-contain" },
    ],
  },
  {
    label: "Tech",
    accent: "from-blue-500 to-cyan-400",
    members: [
      { name: "Kaushik Kumar", role: "Head", img: kaushik },
      { name: "Naraen Rammoorthi", role: "Jr Head", img: naraen },
      { name: "Lokesh Selvam", role: "Jr Head", img: lokesh },
      { name: "Akshaya K", role: "Member", img: akshaya },
      { name: "Saran Kumar", role: "Member", img: saran },
      { name: "Prannitha", role: "Member", img: prannitha },
    ],
  },
  {
    label: "Design",
    accent: "from-pink-500 to-rose-400",
    members: [
      { name: "Amitha", role: "Head", img: amitha },
      { name: "Kaaviya", role: "Head", img: kaaviya },
      { name: "Preethi", role: "Jr Head", img: preethi },
      { name: "NimithaShree", role: "Jr Head", img: nimitha },
      { name: "Varshini", role: "Jr Head", img: varshini },
    ],
  },
  {
    label: "Media",
    accent: "from-violet-500 to-purple-400",
    members: [
      { name: "Tanvi Reddy", role: "Head", img: tanvi },
      { name: "Sriharini S", role: "Jr Head", img: harini, objectPos: "object-contain" },
      { name: "Dhanush S", role: "Member", img: dhanush, objectPos: "object-contain" },
    ],
  },
  {
    label: "Ops & Logistics",
    accent: "from-emerald-500 to-teal-400",
    members: [
      { name: "Aadhisesha D", role: "Head", img: aadhi },
      { name: "Chandini", role: "Jr Head", img: chandini },
      { name: "Muhammed Sheik", role: "Jr Head", img: sheik },
    ],
  },
  {
    label: "Events",
    accent: "from-yellow-500 to-orange-400",
    members: [
      { name: "C.S. Abhinav", role: "Head", img: abhinav },
      { name: "Abhishek S", role: " Head", img: "" },
      { name: "Mohamed Jasim J", role: "Jr Head", img: "" },
      { name: "Siva Sajay S", role: "Jr Head", img: siva },
    ],
  },
];

/* ── Card Component ─────────────────────────────────── */

const MemberCard = ({ name, role, img, large, objectPos = "object-cover object-top" }) => (
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
          className={`w-full h-full ${objectPos} group-hover:scale-110 transition-transform duration-500`}
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
              objectPos={mentor.objectPos}
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
              className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer border-2 ${activeTab === idx
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
                <MemberCard name={m.name} role={m.role} img={m.img} objectPos={m.objectPos} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Members;

