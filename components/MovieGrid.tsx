
import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types';

interface MovieGridProps {
    title: string;
    fetcher: () => Promise<Movie[]>;
    onCardClick: (id: number, isTV: boolean) => void;
    isTV?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ title, fetcher, onCardClick, isTV = false }) => {
    const [items, setItems] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadItems = async () => {
            setLoading(true);
            try {
                const fetchedItems = await fetcher();
                setItems(fetchedItems);
            } catch (error) {
                console.error(`Failed to fetch ${title}:`, error);
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetcher]);

    return (
        <section>
            <h2 className="text-3xl font-bold font-serif mb-6 text-white relative inline-block">
                {title}
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-brand-red"></span>
            </h2>
            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                         <div key={index} className="aspect-[2/3] bg-neutral-medium rounded-lg animate-pulse"></div>
                    ))}
                </div>
            ) : (
                items.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                        {items.map(item => (
                            <MovieCard
                                key={item.id}
                                item={item}
                                onClick={() => onCardClick(item.id, item.media_type === 'tv' || isTV)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No results found.</p>
                )
            )}
        </section>
    );
};

export default MovieGrid;
