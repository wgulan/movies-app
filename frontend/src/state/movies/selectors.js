import { createSelector } from "reselect";

const selectAllMovies = (state) => state.movies.allMovies;
const selectAllGenres = (state) => state.movies.genres;
const getSearchKey = (state) => state.movies.searchKey;
const getGenreFilter = (state) => state.movies.genreFilter;
const getYearFilter = (state) => state.movies.yearFilter.filterValues;
const getSortKey = (state) => state.movies.sortParams.key;
const getSortOrder = (state) => state.movies.sortParams.order;

const makeSelectMovieWithId = (id) => createSelector(
    [selectAllMovies],
    (allMovies) => {
        return allMovies.find(movie => movie.id === id);
    }
)

const makeSelectCommentWithId = (movieId, commentId) => createSelector(
    [selectAllMovies],
    (allMovies) => {
        return allMovies.find(movie => movie.id === movieId).comments.find(c => c.id === commentId);
    }
)

const selectFilteredMovies = createSelector(
    [selectAllMovies, getSearchKey, getGenreFilter, getYearFilter, getSortKey, getSortOrder],
    (allMovies, searchKey, genreFilter, yearFilter, sortKey, sortOrder) => {
        console.log("first time?");
        const order = sortOrder === "asc" ? 1 : -1;
        const movies = allMovies
            .filter((movie) => {
                const releaseYear = Number(movie.release_date.substring(0, 4));
                return (
                    movie.title
                        .toLowerCase()
                        .includes(searchKey.toLowerCase()) &&
                    (yearFilter[0] !== Infinity
                        ? releaseYear >= yearFilter[0] &&
                        releaseYear <= yearFilter[1]
                        : true) &&
                    (genreFilter === "" || genreFilter === "all"
                        ? true
                        : movie.genres.includes(genreFilter))
                );
            })
            .sort((a, b) => {
                if (sortKey === "title") {
                    return a.title > b.title ? 1 : a.title < b.title ? -1 : 0;
                }
                if (sortKey === "rating") {
                    return a.vote_average - b.vote_average;
                }
                if (sortKey === "release") {
                    return a.release - b.release;
                } else return 1;
            });
        return order === 1 ? movies : movies.reverse();
    }
);

const selectors = {
    makeSelectMovieWithId,
    makeSelectCommentWithId,
    selectAllGenres,
    selectFilteredMovies,
};

export default selectors;
