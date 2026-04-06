import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ieeeLogoBlack from '../assets/IEEE-logo-black.jpeg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Force dark mode on mount
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsOpen(false);
    }, [location]);

    const toggleMenu = () => setIsOpen(!isOpen);

    // ─── DARK-MODE STYLES (hardcoded) ─────────────────────────────────────────
    const currentLogo = ieeeLogoBlack;
    const logoBlend = 'mix-blend-screen';
    const headerBg = 'bg-black';
    const textColor = 'text-white';
    const hoverColor = 'hover:text-orange-500';
    const iconHoverBg = 'hover:bg-gray-800';
    const mobileBg = 'bg-black border-gray-800';

    const linkClass = (isActive) =>
        `text-sm font-semibold tracking-wide transition-colors duration-200 ${isActive ? 'text-orange-500' : `${textColor} ${hoverColor}`
        }`;

    return (
        <nav className={`fixed w-full z-50 ${headerBg} shadow-md transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* ── Logo ─────────────────────────────────────── */}
                    <Link to="/" className="flex items-center">
                        <img
                            src={currentLogo}
                            alt="IEEE CS Logo"
                            className={`h-16 w-auto object-contain ${logoBlend}`}
                        />
                    </Link>

                    {/* ── Desktop Nav ──────────────────────────────── */}
                    <div className="hidden md:flex items-center space-x-8">
                        {['Home', 'About', 'Members', 'Events', 'Contact'].map((item) => {
                            const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                            const isActive = location.pathname === path;
                            return (
                                <Link key={item} to={path} className={linkClass(isActive)}>
                                    {item.toUpperCase()}
                                </Link>
                            );
                        })}

                    </div>

                    {/* ── Mobile Controls ───────────────────────────── */}
                    <div className="md:hidden flex items-center gap-3">

                        {/* Hamburger */}
                        <button
                            onClick={toggleMenu}
                            className={`${textColor} focus:outline-none`}
                        >
                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                </div>
            </div>

            {/* ── Mobile Menu ───────────────────────────────────────── */}
            {isOpen && (
                <div className={`md:hidden absolute w-full left-0 top-full shadow-lg border-t ${mobileBg}`}>
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        {['Home', 'About', 'Members', 'Events', 'Contact'].map((item) => {
                            const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                            const isActive = location.pathname === path;
                            return (
                                <Link
                                    key={item}
                                    to={path}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive
                                        ? 'text-orange-500'
                                        : `${textColor} ${hoverColor}`
                                        }`}
                                >
                                    {item}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
