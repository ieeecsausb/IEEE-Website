import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Members = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            containerRef.current.children,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0 }
        );
    }, []);

    const members = [
        { id: 1, name: "Alex Johnson", role: "Chairperson", img: "https://via.placeholder.com/150" },
        { id: 2, name: "Sarah Williams", role: "Vice Chair", img: "https://via.placeholder.com/150" },
        { id: 3, name: "Michael Brown", role: "Secretary", img: "https://via.placeholder.com/150" },
        { id: 4, name: "Emily Davis", role: "Treasurer", img: "https://via.placeholder.com/150" },
        { id: 5, name: "David Miller", role: "Tech Lead", img: "https://via.placeholder.com/150" },
        { id: 6, name: "Jessica Wilson", role: "Event Coordinator", img: "https://via.placeholder.com/150" },
        { id: 7, name: "Daniel Taylor", role: "Web Master", img: "https://via.placeholder.com/150" },
        { id: 8, name: "Laura Anderson", role: "Design Lead", img: "https://via.placeholder.com/150" },
    ];

    return (
        <div className="min-h-screen bg-ieee-warm-white dark:bg-ieee-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <h1 className="text-5xl font-bold text-center mb-4 text-ieee-dark dark:text-ieee-white">
                    Meet The <span className="text-ieee-orange">Team</span>
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto text-lg">
                    The passionate individuals driving innovation and community at IEEE CS AU.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" ref={containerRef}>
                    {members.map((member) => (
                        <div key={member.id} className="group relative bg-white dark:bg-ieee-dark-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="aspect-w-1 aspect-h-1 w-full h-64 overflow-hidden bg-gray-200 dark:bg-ieee-dark-accent relative">
                                {/* Image Placeholder or Real Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 text-4xl font-bold bg-gray-100 dark:bg-ieee-dark-card group-hover:scale-110 transition-transform duration-500">
                                    {member.name.charAt(0)}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                    <div className="flex space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="w-8 h-8 bg-ieee-orange rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white hover:text-ieee-orange transition-colors">in</div>
                                        <div className="w-8 h-8 bg-ieee-orange rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white hover:text-ieee-orange transition-colors">@</div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-ieee-dark dark:text-ieee-white mb-1 group-hover:text-ieee-orange transition-colors">{member.name}</h3>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Members;
