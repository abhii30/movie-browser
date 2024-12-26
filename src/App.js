import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import Filters from "./components/Filters";
import { Helmet } from "react-helmet";

const API_KEY = "029a7ef075fa11823b3531a7d517d809"; // API key
const BASE_URL = "https://api.themoviedb.org/3";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({ genre: "", year: "", rating: "" });
  const [showFavorites, setShowFavorites] = useState(false);
  const sentinelRef = useRef(null);

  const fetchMovies = async () => {
    // Skip fetching if loading or showing favorites
    if (loading || showFavorites) return; 
    setLoading(true);

    try {
      const params = {
        api_key: API_KEY,
        page,
        query: query || undefined,
        with_genres: filters.genre || undefined,
        "vote_average.gte": filters.rating || undefined,
        primary_release_year: filters.year || undefined,
      };

      const endpoint = query ? "/search/movie" : "/discover/movie";
      const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
      const newMovies = response.data.results || [];
      console.log(newMovies);
      setMovies((prevMovies) =>
        page === 1 ? newMovies : [...prevMovies, ...newMovies]
      );
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic fetching (query, filters, page)
  useEffect(() => {
    if (!showFavorites) {
      fetchMovies();
    } else {
      setMovies(favorites); // Show only favorites
    }
  }, [query, filters, page, showFavorites]);

  // Initialize favorites from local storage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (movie) => {
    const updatedFavorites = favorites.find((fav) => fav.id === movie.id)
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Infinite scrolling with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loading]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Helmet>
        <title>Movie Browser</title>
        <meta
          name="description"
          content="Browse and discover your favorite movies!"
        />
      </Helmet>
      <header className="p-4 bg-gray-800 text-center">
        <h1 className="text-2xl font-bold">Movie Browser</h1>
        <input
          type="text"
          placeholder="Search for a movie..."
          className="mt-2 p-2 w-full max-w-md rounded bg-gray-700 text-white"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
            setFilters({ genre: "", year: "", rating: "" });
          }}
        />
      </header>
      <Filters
        filters={filters}
        setFilters={setFilters}
        setPage={setPage}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />
      <main className="py-10 px-5 sm:px-10 md:px-20 lg:px-32 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favorites.some((fav) => fav.id === movie.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </main>

      {loading && <p className="text-center py-4">Loading...</p>}
      {/* Sentinel div for IntersectionObserver */}
      <div ref={sentinelRef} className="h-10"></div>
    </div>
  );
};

export default App;
