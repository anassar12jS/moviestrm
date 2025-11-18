
import React, { useState, useCallback } from 'react';
import * as tmdbService from '../services/tmdb';
import { Genre } from '../types';
import MovieGrid from './MovieGrid';
import { BoltIcon, LaughIcon, HeartIcon, GhostIcon, RocketIcon } from './icons';

const genreList: Genre[] = [
    { id: 28, name: 'Action', icon: BoltIcon },
    { id: 35, name: 'Comedy', icon: LaughIcon },
    { id: 18, name: 'Drama', icon: HeartIcon },
    { id: 27, name: 'Horror', icon: GhostIcon },
    { id: 878, name: 'Sci-Fi', icon: RocketIcon },
    { id: 10749, name: 'Romance', icon: HeartIcon },
];

interface GenresProps {
    onCardClick: (id: number, isTV: boolean) => void;
}

const Genres: React.FC<GenresProps> = ({ onCardClick }) => {
    const [selectedGenre, setSelectedGenre] = useState<Genre>(genreList[0]);

    const fetcher = useCallback(() => tmdbService.fetchByGenre(selectedGenre.id), [selectedGenre]);

    return (
        <div>
            <h2 className="text-3xl font-bold font-serif mb-6 text-white relative inline-block">
                Genres
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-brand-red"></span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
                {genreList.map((genre) => {
                    const Icon = genre.icon;
                    const isSelected = selectedGenre.id === genre.id;
                    return (
                        <button
                            key={genre.id}
                            onClick={() => setSelectedGenre(genre)}
                            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 ${isSelected ? 'bg-brand-red text-white' : 'bg-neutral-light text-gray-300 hover:bg-neutral-light/70'}`}
                        >
                            <Icon className="w-8 h-8" />
                            <span className="font-semibold">{genre.name}</span>
                        </button>
                    );
                })}
            </div>
            {selectedGenre && (
                <MovieGrid
                    key={selectedGenre.id}
                    title={`${selectedGenre.name} Movies`}
                    fetcher={fetcher}
                    onCardClick={onCardClick}
                />
            )}
        </div>
    );
};

export default Genres;
