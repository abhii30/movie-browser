import React, { useEffect, useState } from "react";
import axios from "axios";

const Filters = ({
  filters,
  setFilters,
  setPage,
  showFavorites,
  setShowFavorites,
}) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list",
        { params: { api_key: "029a7ef075fa11823b3531a7d517d809" } }
      );
      setGenres(response.data.genres || []);
    };
    fetchGenres();
  }, []);

  const updateFilter = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setPage(1);
  };

  // Generate year options dynamically
  const generateYearOptions = () => {
    const options = [
      { label: "All", value: "" },
      { label: "2024", value: "2024" },
      { label: "2023", value: "2023" },
      { label: "2020-Now", value: "2020-now" },
      { label: "2010-2019", value: "2010-2019" },
      { label: "2000-2009", value: "2000-2009" },
    ];
    for (let year = 1990; year >= 1900; year -= 10) {
      options.push({
        label: `${year}-${year + 9}`,
        value: `${year}-${year + 9}`,
      });
    }
    options.push({ label: "1900-1950", value: "1900-1950" });
    options.push({ label: "Before 1900", value: "before-1900" });
    return options;
  };

  return (
    <div className="py-4 px-32 bg-gray-800 flex flex-wrap gap-6 items-center justify-center">
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-400">Genre:</span>
        <select
          className="p-2 bg-gray-700 text-white rounded cursor-pointer"
          onChange={(e) => updateFilter("genre", e.target.value)}
        >
          <option value="">All</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-400">Year:</span>
        <select
          className="p-2 bg-gray-700 text-white rounded cursor-pointer"
          onChange={(e) => updateFilter("year", e.target.value)}
        >
          {generateYearOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-400">Rating:</span>
        <select
          className="p-2 w-20 bg-gray-700 text-white rounded cursor-pointer"
          onChange={(e) => updateFilter("rating", e.target.value)}
        >
          <option value="">All</option>
          {[...Array(10).keys()].map((rating) => (
            <option key={rating} value={rating}>
              {rating}+
            </option>
          ))}
        </select>
      </div>
      <button
        className={`p-2 rounded ${
          showFavorites ? "bg-red-500 text-white" : "bg-gray-700 text-gray-300"
        }`}
        onClick={() => {
          setShowFavorites(!showFavorites);
          setPage(1); // Reset pagination
        }}
      >
        {showFavorites ? "Show All Movies" : "Show Favorites"}
      </button>
    </div>
  );
};

export default Filters;
