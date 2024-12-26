# Movie Browser App

Welcome to the **Movie Browser App**, a React-based application for browsing and discovering movies using **The Movie Database (TMDb)** API. The app allows users to search for movies, filter by genres, release year, and ratings, as well as manage a list of favorite movies.

---

## Features

- **Movie Search:** Search for movies by title.
- **Filters:** Refine your search using filters such as genre, release year, and ratings.
- **Favorites Management:** Add or remove movies from your favorites list and store them in local storage.
- **Infinite Scrolling:** Automatically load more movies as you scroll.
- **Responsive Design:** Optimized for various screen sizes.
- **Dynamic Metadata:** SEO-friendly page title and description.

---

## Demo

[Deployed Link](https://movie-browser-beryl.vercel.app/)

---

## Installation and Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/movie-browser.git
   cd movie-browser
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Replace the `API_KEY` constant in the `App.js` file with your TMDb API key:
   ```javascript
   const API_KEY = "your_tmdb_api_key";
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

## Project Structure

```
movie-browser/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Filters.js       # Filter controls for the movie list
│   │   ├── MovieCard.js     # Individual movie card
│   ├── App.js               # Main application logic
│   └── index.js             # Application entry point
├── package.json             # Project dependencies and scripts
└── README.md                # Documentation
```

---

## Key Files

### `App.js`
- Manages application state (movies, filters, favorites, loading).
- Implements infinite scrolling using `IntersectionObserver`.
- Fetches movies from TMDb API based on user input and filters.

### `MovieCard.js`
- Displays individual movie details.
- Highlights movie ratings on hover.
- Allows users to add or remove movies from favorites.

### `Filters.js`
- Fetches genres from TMDb API dynamically.
- Provides options for filtering movies by genre, release year, and rating.
- Includes a toggle to show only favorite movies.

---

## API Integration

The app uses **The Movie Database (TMDb)** API for fetching movie data:
- **Base URL:** `https://api.themoviedb.org/3`
- **Endpoints Used:**
  - `/search/movie`: For searching movies by title.
  - `/discover/movie`: For browsing movies with filters.
  - `/genre/movie/list`: For fetching available genres.

### Example API Call
```javascript
axios.get("https://api.themoviedb.org/3/discover/movie", {
  params: {
    api_key: "your_tmdb_api_key",
    page: 1,
    with_genres: "28", // Action genre
  },
});
```

---

## Customization

- **API Key:** Replace the placeholder API key with your own TMDb API key in the `App.js` file.
- **Features:** Extend the app by adding more filters or functionalities, such as sorting by popularity or runtime.

---

## Technologies Used

- **Frontend:** React.js, TailwindCSS
- **Backend:** TMDb API
- **Icons:** `react-icons`

---

## Known Issues

- Infinite scrolling may load duplicate movies if the API response contains overlapping results.

---

## Possible Improvements

1. **Debounced Search:** Implement debouncing for search input to reduce API calls.
2. **Improved Pagination Handling:** Ensure no duplicate movies are loaded during infinite scrolling.
3. **Dark/Light Theme Toggle:** Add support for toggling between dark and light themes.

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the movie data.
- [React Icons](https://react-icons.github.io/react-icons/) for the icon library.

---

Feel free to suggest further enhancements or report bugs via the Issues section. 😊
