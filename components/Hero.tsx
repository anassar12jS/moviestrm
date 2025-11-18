
import React, { useState, useEffect, useCallback } from 'react';
import { Movie } from '../types';
import * as tmdbService from '../services/tmdb';
import { PlayIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';

interface HeroProps {
    onPlay: (id: number, isTV: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ onPlay }) => {
    const [slides, setSlides] = useState<Movie[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const trendingMovies = await tmdbService.fetchTrending();
                setSlides(trendingMovies.slice(0, 5));
            } catch (error) {
                console.error("Failed to fetch hero data", error);
            }
        };
        fetchHeroData();
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        if (slides.length > 0) {
            const slideInterval = setInterval(nextSlide, 7000);
            return () => clearInterval(slideInterval);
        }
    }, [slides.length, nextSlide]);

    if (slides.length === 0) {
        return <div className="h-[60vh] bg-neutral-medium animate-pulse"></div>;
    }

    const activeSlide = slides[currentIndex];
    
    return (
        <div className="relative h-[70vh] w-full overflow-hidden text-white">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img
                        src={`${tmdbService.IMAGE_BASE_URL}original${slide.backdrop_path}`}
                        alt={slide.title || slide.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark via-neutral-dark/60 to-transparent"></div>
                </div>
            ))}

            <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-16">
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4 drop-shadow-xl">
                        {activeSlide.title || activeSlide.name}
                    </h1>
                    <p className="text-md md:text-lg mb-6 line-clamp-3 opacity-90 drop-shadow-lg">
                        {activeSlide.overview}
                    </p>
                    <button
                        onClick={() => onPlay(activeSlide.id, activeSlide.media_type === 'tv')}
                        className="flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-bold py-3 px-6 rounded-full transition-transform duration-300 ease-in-out hover:scale-105"
                    >
                        <PlayIcon className="w-6 h-6" />
                        Watch Now
                    </button>
                </div>
            </div>

            <div className="absolute z-20 bottom-8 right-8 flex items-center gap-3">
                <button onClick={prevSlide} className="bg-black/50 p-2 rounded-full hover:bg-white/20 transition">
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <button onClick={nextSlide} className="bg-black/50 p-2 rounded-full hover:bg-white/20 transition">
                    <ChevronRightIcon className="w-6 h-6" />
                </button>
            </div>
             <div className="absolute z-20 bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
