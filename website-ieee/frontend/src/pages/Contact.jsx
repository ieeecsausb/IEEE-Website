import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Contact = () => {
    const containerRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".fade-up", 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen bg-ieee-warm-white dark:bg-ieee-dark transition-colors duration-500 relative overflow-hidden flex items-center pt-20 pb-12" ref={containerRef}>
            
            {/* Background glowing orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-ieee-orange rounded-full filter blur-[150px] opacity-[0.05] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-orange-400 rounded-full filter blur-[150px] opacity-[0.05] pointer-events-none"></div>

            <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                <div className="text-center mb-16 fade-up">
                    <h4 className="text-sm font-bold text-ieee-orange tracking-[0.2em] uppercase mb-3">Reach Out</h4>
                    <h1 className="text-4xl md:text-6xl font-black text-ieee-dark dark:text-white capitalize tracking-tight">
                        Get In Touch
                    </h1>
                </div>

                <div className="bg-white dark:bg-ieee-dark-card rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col lg:flex-row transition-all duration-300 fade-up">
                    
                    {/* Left Side: Contact Info */}
                    <div className="lg:w-5/12 bg-gradient-to-br from-gray-900 to-ieee-dark p-10 md:p-14 text-white relative overflow-hidden flex flex-col justify-between">
                        {/* Interactive overlay pattern */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 border-[40px] border-ieee-orange rounded-full opacity-10 pointer-events-none"></div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-extrabold mb-6 mt-4">Let's talk about the future.</h3>
                            <p className="text-gray-400 text-lg leading-relaxed mb-12">
                                Whether you're interested in joining our branch, partnering for an event, or just dropping a line to say hello, we'd love to hear from you.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                                        <svg className="w-6 h-6 text-ieee-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Email</h4>
                                        <p className="text-lg font-medium">ieeecsausb@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                                        <svg className="w-6 h-6 text-ieee-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Location</h4>
                                        <p className="text-lg font-medium leading-snug">Department of CSE<br/>College of Engineering, Guindy<br/>Anna University, Chennai</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:w-7/12 p-10 md:p-14 bg-white dark:bg-ieee-dark-card flex flex-col justify-center relative">
                        <form className="space-y-8" ref={formRef} onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider ml-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full bg-gray-50 dark:bg-[#111111] border-none rounded-2xl text-gray-900 dark:text-white px-5 py-4 focus:ring-2 focus:ring-ieee-orange/50 transition-all shadow-inner"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider ml-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full bg-gray-50 dark:bg-[#111111] border-none rounded-2xl text-gray-900 dark:text-white px-5 py-4 focus:ring-2 focus:ring-ieee-orange/50 transition-all shadow-inner"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="subject" className="block text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider ml-1">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full bg-gray-50 dark:bg-[#111111] border-none rounded-2xl text-gray-900 dark:text-white px-5 py-4 focus:ring-2 focus:ring-ieee-orange/50 transition-all shadow-inner"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider ml-1">Message</label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    className="w-full bg-gray-50 dark:bg-[#111111] border-none rounded-2xl text-gray-900 dark:text-white px-5 py-4 focus:ring-2 focus:ring-ieee-orange/50 transition-all shadow-inner resize-none"
                                    placeholder="Tell us more about your inquiry..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 px-10 py-4 font-bold text-white bg-gradient-to-r from-ieee-orange to-orange-500 rounded-full hover:shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1 transition-all duration-300 w-full md:w-auto"
                            >
                                Send Message
                                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;
