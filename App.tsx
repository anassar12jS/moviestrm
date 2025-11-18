
import React, { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieGrid from './components/MovieGrid';
import WatchPage from './components/WatchPage';
import Footer from './components/Footer';
import Genres from './components/Genres';
import { View, WatchItem } from './types';
import * as tmdbService from './services/tmdb';

const App: React.FC = () => {
    const [view, setView] = useState<View>('home');
    const [watchItem, setWatchItem] = useState<WatchItem | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResultsTitle, setSearchResultsTitle] = useState<string>('');

    const handleNavClick = useCallback((newView: View) => {
        setView(newView);
        setSearchQuery('');
        window.scrollTo(0, 0);
    }, []);

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        setSearchResultsTitle(`Search Results for "${query}"`);
        setView('search');
        window.scrollTo(0, 0);
    }, []);

    const openWatchPage = useCallback((id: number, isTV: boolean) => {
        setWatchItem({ id, isTV });
    }, []);

    const closeWatchPage = useCallback(() => {
        setWatchItem(null);
    }, []);
    
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeWatchPage();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [closeWatchPage]);

    return (
        <div className="min-h-screen bg-neutral-dark flex flex-col">
            <Navbar 
                currentView={view} 
                onNavClick={handleNavClick} 
                onSearch={handleSearch} 
            />
            
            <main className="flex-grow pt-20">
                {watchItem && (
                    <WatchPage 
                        item={watchItem} 
                        onClose={closeWatchPage} 
                    />
                )}
                
                <div className={watchItem ? 'hidden' : 'block'}>
                    {view === 'home' && (
                        <>
                            <Hero onPlay={openWatchPage} />
                            <div className="p-4 md:p-8 space-y-12">
                                <MovieGrid title="Trending Now" fetcher={tmdbService.fetchTrending} onCardClick={openWatchPage} />
                                <MovieGrid title="New Releases" fetcher={tmdbService.fetchUpcomingMovies} onCardClick={openWatchPage} />
                                <MovieGrid title="Popular Movies" fetcher={tmdbService.fetchPopularMovies} onCardClick={openWatchPage} />
                            </div>
                        </>
                    )}

                    {view === 'movies' && (
                        <div className="p-4 md:p-8">
                            <MovieGrid title="Top Rated Movies" fetcher={tmdbService.fetchTopRatedMovies} onCardClick={openWatchPage} />
                        </div>
                    )}
                    
                    {view === 'tv' && (
                        <div className="p-4 md:p-8">
                            <MovieGrid title="Popular TV Shows" fetcher={tmdbService.fetchPopularTVShows} onCardClick={openWatchPage} isTV />
                        </div>
                    )}
                    
                    {view === 'genres' && (
                         <div className="p-4 md:p-8">
                            <Genres onCardClick={openWatchPage} />
                         </div>
                    )}

                    {view === 'search' && searchQuery && (
                         <div className="p-4 md:p-8">
                            <MovieGrid title={searchResultsTitle} fetcher={() => tmdbService.searchMulti(searchQuery)} onCardClick={openWatchPage} key={searchQuery} />
                         </div>
                    )}
                </div>
            </main>

            {!watchItem && <Footer />}
        </div>
    );
};

export default App;
