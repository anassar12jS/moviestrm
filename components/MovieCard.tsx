
import React from 'react';
import { Movie } from '../types';
import * as tmdbService from '../services/tmdb';
import { PlayIcon } from './icons';

interface MovieCardProps {
    item: Movie;
    onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ item, onClick }) => {
    const posterUrl = item.poster_path
        ? `${tmdbService.IMAGE_BASE_URL}w500${item.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image';

    return (
        <div onClick={onClick} className="group relative rounded-lg overflow-hidden cursor-pointer bg-neutral-medium shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:z-10 hover:shadow-2xl hover:shadow-black/50">
            <img src={posterUrl} alt={item.title || item.name} className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-lg line-clamp-2">{item.title || item.name}</h3>
                    <p className="text-gray-300 text-sm mt-1 line-clamp-3">{item.overview}</p>
                </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                <PlayIcon className="w-8 h-8 text-white" />
            </div>
        </div>
    );
};

export default MovieCard;
