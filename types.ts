
export interface Movie {
    id: number;
    title: string;
    name?: string; // For TV shows
    poster_path: string;
    backdrop_path: string;
    overview: string;
    vote_average: number;
    media_type?: 'movie' | 'tv';
}

export interface MovieDetails extends Movie {
    genres: { id: number; name: string }[];
    runtime: number;
    release_date: string;
}

export interface TVShow extends Movie {
    name: string;
    first_air_date: string;
}

export interface TVShowDetails extends TVShow {
    seasons: {
        id: number;
        name: string;
        season_number: number;
        episode_count: number;
    }[];
    number_of_seasons: number;
    genres: { id: number; name: string }[];
}

export interface TVSeasonDetails {
    episodes: {
        id: number;
        name: string;
        episode_number: number;
        overview: string;
    }[];
}

export type View = 'home' | 'movies' | 'tv' | 'genres' | 'search';

export interface WatchItem {
    id: number;
    isTV: boolean;
}

export interface Genre {
    id: number;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
}
