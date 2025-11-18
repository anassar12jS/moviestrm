
import React, { useState } from 'react';
import { View } from '../types';
import { FilmIcon, HomeIcon, ClapperboardIcon, TvIcon, TagIcon, SearchIcon } from './icons';

interface NavbarProps {
    currentView: View;
    onNavClick: (view: View) => void;
    onSearch: (query: string) => void;
}

const NavItem: React.FC<{
    view: View;
    currentView: View;
    onClick: (view: View) => void;
    Icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
}> = ({ view, currentView, onClick, Icon, children }) => {
    const isActive = currentView === view;
    return (
        <li>
            <button
                onClick={() => onClick(view)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 ${isActive ? 'text-white bg-brand-red' : 'text-gray-300 hover:bg-neutral-light hover:text-white'}`}
            >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{children}</span>
            </button>
        </li>
    );
};


const Navbar: React.FC<NavbarProps> = ({ currentView, onNavClick, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery.trim());
            setSearchQuery('');
        }
    };

    return (
        <header className="bg-black/80 backdrop-blur-sm fixed w-full top-0 z-50 shadow-lg shadow-black/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <a href="#" onClick={() => onNavClick('home')} className="flex items-center gap-2 text-2xl font-bold font-serif">
                             <FilmIcon className="w-8 h-8 text-brand-red" />
                            <span className="bg-gradient-to-r from-brand-red to-red-400 text-transparent bg-clip-text">MovieStream</span>
                        </a>
                    </div>
                    <nav className="hidden md:flex">
                        <ul className="flex items-center space-x-2">
                           <NavItem view="home" currentView={currentView} onClick={onNavClick} Icon={HomeIcon}>Home</NavItem>
                           <NavItem view="movies" currentView={currentView} onClick={onNavClick} Icon={ClapperboardIcon}>Movies</NavItem>
                           <NavItem view="tv" currentView={currentView} onClick={onNavClick} Icon={TvIcon}>TV Shows</NavItem>
                           <NavItem view="genres" currentView={currentView} onClick={onNavClick} Icon={TagIcon}>Genres</NavItem>
                        </ul>
                    </nav>
                    <div className="flex items-center">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="bg-neutral-light text-white w-32 sm:w-64 py-2 pl-10 pr-4 rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-red transition-all duration-300"
                            />
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </form>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
