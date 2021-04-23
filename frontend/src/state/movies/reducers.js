import types from "./types";

const initialState = {
    allMovies: [],
    genres: [
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "History",
        "Horror",
        "Music",
        "Mystery",
        "Romance",
        "Science Fiction",
        "TV Movie",
        "Thriller",
        "War",
        "Western",
    ],
    searchKey: "",
    genreFilter: "",
    yearFilter: { sliderRange: [], filterValues: [] },
    sortParams: { key: "", order: "desc" },
};

const movies = (state = initialState, action) => {
    switch (action.type) {

        case types.MOVIES_SUCCESS:
            return {
                ...state,
                allMovies: [
                    ...state.allMovies,
                    ...action.payload.results.map((movie) => ({
                        ...movie,
                        release: new Date(movie.release_date),
                    })),
                ],
            };

        case types.ADD_MOVIE_SUCCESS: {
            const { movieId, movieData } = action.payload.addedMovie;
            return {
                ...state,
                allMovies: [
                    ...state.allMovies,
                    { id: movieId, ...movieData }
                ],
            }
        }

        case types.EDIT_MOVIE_SUCCESS: {
            const { movieId, movieData } = action.payload.updatedMovie
            return {
                ...state,
                allMovies: state.allMovies.map(movie => movie.id === movieId ? { ...movie, ...movieData } : movie)
            }
        }

        case types.DELETE_MOVIE_SUCCESS:
            return {
                ...state,
                allMovies: state.allMovies.filter(
                    (movie) => movie.id !== action.payload.deletedMovie
                ),
            };

        case types.ADD_COMMENT_SUCCESS: {
            const { movieId, commentData } = action.payload.addedComment;
            return {
                ...state,
                allMovies: state.allMovies.map(movie => movie.id === movieId ? { ...movie, comments: [...movie.comments, commentData] } : movie)
            }
        }

        case types.EDIT_COMMENT_SUCCESS: {
            const { movieId, commentId, commentData } = action.payload.updatedComment;
            return {
                ...state,
                allMovies: state.allMovies.map(movie => movie.id === movieId
                    ? { ...movie, comments: movie.comments.map(c => c.id === commentId ? { ...c, ...commentData } : c) }
                    : movie)
            }
        }

        case types.DELETE_COMMENT_SUCCESS: {
            const { movieId, commentId } = action.payload.deletedComment;
            return {
                ...state,
                allMovies: state.allMovies.map(movie => movie.id === movieId ? { ...movie, comments: movie.comments.filter(c => c.id !== commentId) } : movie)
            }
        }

        case types.UPDATE_SEARCH_KEY:
            return { ...state, searchKey: action.payload.searchKey };

        case types.UPDATE_GENRE_FILTER:
            return { ...state, genreFilter: action.payload.genreFilter };

        case types.UPDATE_YEAR_SLIDER_RANGE:
            return {
                ...state,
                yearFilter: {
                    sliderRange: [...action.payload.sliderRange],
                    filterValues: [...action.payload.sliderRange],
                },
            };

        case types.UPDATE_YEAR_FILTER:
            return {
                ...state,
                yearFilter: {
                    ...state.yearFilter,
                    filterValues: [...action.payload.filterValues],
                },
            };

        case types.UPDATE_SORT_KEY:
            return {
                ...state,
                sortParams: {
                    ...state.sortParams,
                    key: action.payload.key,
                },
            };
            
        case types.UPDATE_SORT_ORDER:
            return {
                ...state,
                sortParams: {
                    ...state.sortParams,
                    order: state.sortParams.order === "asc" ? "desc" : "asc",
                },
            };
            
        default:
            return state;
    }
};

const moviesReducers = { movies };

export default moviesReducers;
