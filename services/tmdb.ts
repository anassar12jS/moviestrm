import { Movie, MovieDetails, TVShow, TVShowDetails, TVSeasonDetails } from '../types';

const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c'; // Publicly available TMDB API key
const API_BASE_URL = 'https://api.themoviedb.org/3';

const fetchData = async <T,>(endpoint: string): Promise<T> => {
    try {
        const separator = endpoint.includes('?') ? '&' : '?';
        const response = await fetch(`${API_BASE_URL}${endpoint}${separator}api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Failed to fetch data:", error);
        throw error;
    }
};

interface TMDBResponse<T> {
    results: T[];
}

export const fetchTrending = async (): Promise<Movie[]> => {
    const data = await fetchData<TMDBResponse<Movie>>('/trending/all/week?language=en-US');
    return data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv');
};

export const fetchUpcomingMovies = async (): Promise<Movie[]> => {
    const data = await fetchData<TMDBResponse<Movie>>('/movie/upcoming?language=en-US&page=1');
    return data.results;
};

export const fetchPopularMovies = async (): Promise<Movie[]> => {
    const data = await fetchData<TMDBResponse<Movie>>('/movie/popular?language=en-US&page=1');
    return data.results;
};

export const fetchTopRatedMovies = async (): Promise<Movie[]> => {
    const data = await fetchData<TMDBResponse<Movie>>('/movie/top_rated?language=en-US&page=1');
    return data.results;
};

export const fetchPopularTVShows = async (): Promise<TVShow[]> => {
    const data = await fetchData<TMDBResponse<TVShow>>('/tv/popular?language=en-US&page=1');
    return data.results;
};

export const fetchByGenre = async (genreId: number): Promise<Movie[]> => {
    const data = await fetchData<TMDBResponse<Movie>>(`/discover/movie?with_genres=${genreId}&language=en-US&page=1`);
    return data.results;
}

export const searchMulti = async (query: string): Promise<Movie[]> => {
    const data = await fetchData<TMDBResponse<Movie>>(`/search/multi?query=${encodeURIComponent(query)}&language=en-US&page=1`);
    return data.results.filter(item => (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path);
};

export const getMovieDetails = (id: number): Promise<MovieDetails> => {
    return fetchData<MovieDetails>(`/movie/${id}?language=en-US`);
};

export const getTVDetails = (id: number): Promise<TVShowDetails> => {
    return fetchData<TVShowDetails>(`/tv/${id}?language=en-US`);
};

export const getTVSeasonDetails = (tvId: number, seasonNumber: number): Promise<TVSeasonDetails> => {
    return fetchData<TVSeasonDetails>(`/tv/${tvId}/season/${seasonNumber}?language=en-US`);
};

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
export const EMBED_BASE_URL = 'https://cinemaos.tech/player'; // Using cinemaos.tech embed source