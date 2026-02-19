import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ieeeLogoWhite from '../assets/IEEE-logo-white.jpeg';
import ieeeLogoBlack from '../assets/IEEE-logo-black.jpeg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Theme state - persisted to localStorage
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const toggleMenu = () => setIsOpen(!isOpen);

    // ─── THEME-BASED STYLES ───────────────────────────────────────────────────
    //
    // DARK MODE:
    //   • Logo  → IEEE-logo-black.jpeg  (white text on black bg)
    //   • Header → bg-black             (matches logo bg → seamless)
    //   • Text  → text-white
    //
    // LIGHT MODE:
    //   • Logo  → IEEE-logo-white.jpeg  (black text on white bg)
    //   • Header → bg-white             (matches logo bg → seamless)
    //   • Text  → text-gray-900
    //
    const isDark = theme === 'dark';

    const currentLogo = isDark ? ieeeLogoBlack : ieeeLogoWhite;
    // mix-blend-screen   → black JPEG background disappears on dark header
    // mix-blend-multiply → white JPEG background disappears on light header
    const logoBlend = isDark ? 'mix-blend-screen' : 'mix-blend-multiply';
    const headerBg = isDark ? 'bg-black' : 'bg-white';
    const textColor = isDark ? 'text-white' : 'text-gray-900';
    const hoverColor = 'hover:text-orange-500';
    const iconHoverBg = isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100';
    const mobileBg = isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-100';

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
                            className={`h-14 w-auto object-contain ${logoBlend}`}
                        />
                    </Link>

                    {/* ── Desktop Nav ──────────────────────────────── */}
                    <div className="hidden md:flex items-center space-x-8">
                        {['Home', 'About', 'Members', 'Events', 'Projects', 'Contact'].map((item) => {
                            const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                            const isActive = location.pathname === path;
                            return (
                                <Link key={item} to={path} className={linkClass(isActive)}>
                                    {item.toUpperCase()}
                                </Link>
                            );
                        })}

                        {/* Dark-mode toggle */}
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle Dark Mode"
                            className={`p-2 rounded-full ${textColor} ${iconHoverBg} transition-colors focus:outline-none`}
                        >
                            {isDark ? (
                                /* Sun icon */
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                /* Moon icon */
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* ── Mobile Controls ───────────────────────────── */}
                    <div className="md:hidden flex items-center gap-3">
                        {/* Dark-mode toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full ${textColor} ${iconHoverBg} transition-colors focus:outline-none`}
                        >
                            {isDark ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

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
                        {['Home', 'About', 'Members', 'Events', 'Projects', 'Contact'].map((item) => {
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
