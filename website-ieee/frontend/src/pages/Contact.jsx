import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Contact = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(containerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    }, []);

    return (
        <div className="min-h-screen bg-ieee-warm-white dark:bg-ieee-dark transition-colors duration-300">
            <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-24" ref={containerRef}>
                <h1 className="text-4xl font-bold text-ieee-orange mb-12 text-center">Get in Touch</h1>
                <div className="bg-white dark:bg-ieee-dark-card rounded-3xl shadow-xl overflow-hidden transition-colors duration-300">

                    {/* Form — Full Width */}
                    <div className="p-10 md:p-12">
                        <p className="text-gray-500 dark:text-gray-400 mb-8 text-center">Fill out the form and our team will get back to you within 24 hours.</p>
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
