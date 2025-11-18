
import React from 'react';
import { FilmIcon } from './icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-neutral-medium border-t border-neutral-light/50 mt-12 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
                <div className="flex justify-center items-center gap-2 text-xl font-bold font-serif mb-4">
                    <FilmIcon className="w-6 h-6 text-brand-red" />
                    <span className="text-white">MovieStream</span>
                </div>
                <p>&copy; {new Date().getFullYear()} MovieStream Pro. All Rights Reserved.</p>
                <p className="mt-2 text-sm">
                    This site is a demonstration project. All content is provided by{' '}
                    <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">
                        The Movie Database (TMDB)
                    </a>.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
