import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-ieee-warm-white dark:bg-ieee-dark text-gray-800 dark:text-white py-12 mt-auto transition-colors duration-300 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-bold text-ieee-orange mb-4">IEEE</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Empowering engineers and building the future. Join our community to innovate and grow.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-ieee-orange dark:hover:text-ieee-orange transition-colors">About Us</Link></li>
                            <li><Link to="/events" className="text-gray-600 dark:text-gray-400 hover:text-ieee-orange dark:hover:text-ieee-orange transition-colors">Events</Link></li>
                            <li><Link to="/projects" className="text-gray-600 dark:text-gray-400 hover:text-ieee-orange dark:hover:text-ieee-orange transition-colors">Projects</Link></li>
                            <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-ieee-orange dark:hover:text-ieee-orange transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-1">
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                            <li>Anna University, CEG Campus</li>
                            <li>Chennai - 600025</li>
                            <li>ieeecsausb@gmail.com</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="col-span-1">
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-ieee-dark-accent flex items-center justify-center shadow-sm hover:bg-ieee-orange dark:hover:bg-ieee-orange transition-colors group">
                                <span className="text-ieee-dark dark:text-white font-bold group-hover:text-white">in</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-ieee-dark-accent flex items-center justify-center shadow-sm hover:bg-ieee-orange dark:hover:bg-ieee-orange transition-colors group">
                                <span className="text-ieee-dark dark:text-white font-bold group-hover:text-white">Ig</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-ieee-dark-accent flex items-center justify-center shadow-sm hover:bg-ieee-orange dark:hover:bg-ieee-orange transition-colors group">
                                <span className="text-ieee-dark dark:text-white font-bold group-hover:text-white">X</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-500 dark:text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} IEEE CS Anna University Student Branch. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
