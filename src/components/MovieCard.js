import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

const MovieCard = ({ movie, isFavorite, toggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={posterUrl}
          alt={movie.title}
          className={`w-full object-cover rounded border-4 transition-opacity duration-300 ${
            isHovered ? "opacity-40" : "opacity-100"
          } 
          h-48 sm:h-52 md:h-64 lg:h-72`}
        />
        {isHovered && (
          <div className="absolute inset-0 gap-2 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center p-4 transition-opacity duration-300">
            <FaStar className="text-yellow-400 text-3xl" />
            <p className="text-2xl font-bold">
              {movie.vote_average.toFixed(1) + " / 10 " || "N/A"}
            </p>
          </div>
        )}
      </div>
      <div
        className="grid grid-cols-4 p-2 text-white transition-opacity duration-300 items-center"
      >
        <div className="col-span-3">
          <h2 className="text-lg font-bold truncate whitespace-nowrap overflow-hidden">
            {movie.title}
          </h2>
          <p className="text-sm text-gray-400">
            {movie.release_date?.split("-")[0] || "N/A"}
          </p>
        </div>
        <div className="col-span-1 flex justify-end">
          <button
            onClick={() => toggleFavorite(movie)}
            className="p-2 text-white rounded-full bg-gray-700 hover:bg-gray-500"
          >
            {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
