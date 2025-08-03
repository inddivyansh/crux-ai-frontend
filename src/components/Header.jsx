import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, ShieldCheck, Menu, X, Languages, Home, Users, FileText, Target, Lightbulb, User } from 'lucide-react';

const Header = ({ role, setPage, activePage, theme, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'about', label: 'About Us', icon: Users },
        { id: 'problem', label: 'Problem', icon: FileText },
        { id: 'challenges', label: 'Challenges', icon: Target },
        { id: 'suggestions', label: 'Suggestions', icon: Lightbulb },
        { id: 'profile', label: 'Profile', icon: User },
    ];

    const NavLink = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => { setPage(id); setIsMenuOpen(false); }}
            className={`px-2 py-2 lg:px-3 lg:py-2 rounded-md text-sm font-medium transition-colors duration-300 relative flex items-center gap-1 lg:gap-2 ${
                activePage === id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
            }`}
        >
            <Icon className="w-4 h-4" />
            <span className="hidden lg:block">{label}</span>
            {activePage === id && (
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400"
                    layoutId="underline"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
            )}
        </button>
    );

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 bg-black/90 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => setPage('home')}>
                             <Bot className="w-6 h-6 lg:w-7 lg:h-7 text-purple-400" />
                            <h1 className="text-lg lg:text-xl font-bold tracking-wider">
                                Team <span className="text-purple-400">CRuX</span>
                            </h1>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 lg:ml-10 flex items-baseline space-x-1 lg:space-x-4">
                                {navItems.map(item => <NavLink key={item.id} {...item} />)}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-3 lg:gap-4">
                        {role === 'admin' && (
                            <div className="flex items-center gap-2 px-2 py-1 lg:px-3 lg:py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30">
                                <ShieldCheck className="w-3 h-3 lg:w-4 lg:h-4 text-purple-400" />
                                <span className="text-xs font-medium text-purple-300 hidden lg:block">Admin</span>
                            </div>
                        )}
                        <LanguageSwitcher />
                    </div>
                    <div className="flex md:hidden">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className="p-2 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 border-t border-gray-800/50">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => { setPage(item.id); setIsMenuOpen(false); }}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center gap-3 ${
                                    activePage === item.id ? 'text-white bg-purple-600/20' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                }`}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

const LanguageSwitcher = () => {
    // Placeholder for language switching logic
    return (
        <button className="p-1.5 lg:p-2 rounded-full hover:bg-gray-800" title="Language">
            <Languages className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
        </button>
    );
};

export default Header;
