import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Contact = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(containerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    }, []);

    return (
        <div className="min-h-screen bg-ieee-warm-white dark:bg-ieee-dark transition-colors duration-300 flex items-center justify-center">
            <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-24" ref={containerRef}>
                <h1 className="text-4xl font-bold text-ieee-orange mb-12 text-center">Get in Touch</h1>
                <div className="bg-white dark:bg-ieee-dark-card rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row transition-colors duration-300">

                    {/* Contact Info Side */}
                    <div className="md:w-2/5 bg-ieee-orange p-10 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                            <p className="mb-8 text-orange-100 leading-relaxed">Fill out the form and our team will get back to you within 24 hours.</p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl">📍</span>
                                    <div>
                                        <p className="font-bold">Location</p>
                                        <p className="text-sm text-orange-100">Anna University, CEG Campus, Chennai - 600025</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl">📧</span>
                                    <div>
                                        <p className="font-bold">Email</p>
                                        <p className="text-sm text-orange-100">ieeecsausb@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl">🕒</span>
                                    <div>
                                        <p className="font-bold">Office Hours</p>
                                        <p className="text-sm text-orange-100">Mon – Fri, 10:00 AM – 5:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decor */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                        <div className="absolute -top-20 -left-20 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                    </div>

                    {/* Form Side */}
                    <div className="md:w-3/5 p-10">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="block w-full rounded-xl border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-ieee-dark-input text-gray-900 dark:text-white focus:border-ieee-orange focus:ring focus:ring-ieee-orange focus:ring-opacity-20 p-3 transition-colors duration-300"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="block w-full rounded-xl border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-ieee-dark-input text-gray-900 dark:text-white focus:border-ieee-orange focus:ring focus:ring-ieee-orange focus:ring-opacity-20 p-3 transition-colors duration-300"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="block w-full rounded-xl border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-ieee-dark-input text-gray-900 dark:text-white focus:border-ieee-orange focus:ring focus:ring-ieee-orange focus:ring-opacity-20 p-3 transition-colors duration-300 resize-none"
                                    placeholder="Write your message here..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 px-6 rounded-xl font-bold text-white bg-ieee-orange hover:bg-opacity-90 transform active:scale-95 transition-all shadow-md hover:shadow-lg"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
