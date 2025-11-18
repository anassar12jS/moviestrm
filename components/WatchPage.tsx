
import React, { useState, useEffect, useMemo } from 'react';
import { WatchItem, MovieDetails, TVShowDetails, TVSeasonDetails } from '../types';
import * as tmdbService from '../services/tmdb';
import { BackIcon } from './icons';

interface WatchPageProps {
    item: WatchItem;
    onClose: () => void;
}

const WatchPage: React.FC<WatchPageProps> = ({ item, onClose }) => {
    const [details, setDetails] = useState<MovieDetails | TVShowDetails | null>(null);
    const [seasonDetails, setSeasonDetails] = useState<TVSeasonDetails | null>(null);
    const [selectedSeason, setSelectedSeason] = useState<number>(1);
    const [selectedEpisode, setSelectedEpisode] = useState<number>(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const fetchedDetails = item.isTV
                    ? await tmdbService.getTVDetails(item.id)
                    : await tmdbService.getMovieDetails(item.id);
                setDetails(fetchedDetails);
                if (item.isTV) {
                    const tvDetails = fetchedDetails as TVShowDetails;
                    const firstSeasonNumber = tvDetails.seasons.find(s => s.season_number > 0)?.season_number || 1;
                    setSelectedSeason(firstSeasonNumber);
                }
            } catch (error) {
                console.error("Failed to fetch item details", error);
            }
        };
        fetchDetails();
    }, [item]);

    useEffect(() => {
        if (item.isTV && details) {
            const fetchSeason = async () => {
                try {
                    const fetchedSeasonDetails = await tmdbService.getTVSeasonDetails(item.id, selectedSeason);
                    setSeasonDetails(fetchedSeasonDetails);
                    setSelectedEpisode(1);
                    setLoading(false);
                } catch (error) {
                    console.error("Failed to fetch season details", error);
                }
            };
            fetchSeason();
        } else {
             setLoading(false);
        }
    }, [item.isTV, item.id, details, selectedSeason]);

    const embedUrl = useMemo(() => {
        if (!details) return '';
        return item.isTV
            ? `${tmdbService.EMBED_BASE_URL}/tv/${item.id}/${selectedSeason}/${selectedEpisode}`
            : `${tmdbService.EMBED_BASE_URL}/movie/${item.id}`;
    }, [item, details, selectedSeason, selectedEpisode]);

    const tvDetails = details as TVShowDetails;
    const seasons = tvDetails?.seasons?.filter(s => s.season_number > 0);

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col animate-fade-in">
            <header className="flex items-center p-4 bg-black/50 gap-4 flex-wrap">
                <button onClick={onClose} className="flex items-center gap-2 text-white hover:text-brand-red transition">
                    <BackIcon className="w-6 h-6" />
                    <span className="hidden sm:inline">Back</span>
                </button>
                <h2 className="text-xl font-bold flex-1 truncate">{details?.title || details?.name}</h2>
                {item.isTV && seasons && (
                    <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
                        <select
                            value={selectedSeason}
                            onChange={(e) => setSelectedSeason(Number(e.target.value))}
                            className="bg-neutral-light border border-neutral-light/50 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red"
                        >
                            {seasons.map(season => (
                                <option key={season.id} value={season.season_number}>
                                    Season {season.season_number}
                                </option>
                            ))}
                        </select>
                        {seasonDetails && (
                            <select
                                value={selectedEpisode}
                                onChange={(e) => setSelectedEpisode(Number(e.target.value))}
                                className="bg-neutral-light border border-neutral-light/50 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red"
                            >
                                {seasonDetails.episodes.map(ep => (
                                    <option key={ep.id} value={ep.episode_number}>
                                        Episode {ep.episode_number}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                )}
            </header>
            <div className="flex-1 bg-black flex items-center justify-center">
                {loading ? (
                    <div className="w-full h-full bg-neutral-medium animate-pulse"></div>
                ) : (
                    <iframe
                        key={embedUrl}
                        src={embedUrl}
                        title="Movie Player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                    ></iframe>
                )}
            </div>
        </div>
    );
};

export default WatchPage;
