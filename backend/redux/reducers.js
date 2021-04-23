const { ADD_MOVIE, DELETE_MOVIE, EDIT_MOVIE, ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT } = require("./types");
const data = require('./test.json')

const initialState = data

const movies = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MOVIE: {
            return [
                ...state,
                {
                    id: action.payload.movieId,
                    ...action.payload.movieData,
                },
            ];
        }

        case EDIT_MOVIE: {
            const { movieId, movieData } = action.payload
            return state.map(movie => movie.id === movieId ? { ...movie, ...movieData } : movie)
        }

        case DELETE_MOVIE: {
            return state.filter(movie => movie.id !== action.payload.movieId)
        }

        case ADD_COMMENT: {
            const { movieId, commentData } = action.payload
            return state.map(movie => movie.id === movieId ? { ...movie, comments: [...movie.comments, commentData] } : movie)
        }

        case EDIT_COMMENT: {
            const { movieId, commentId, commentData } = action.payload
            return state.map(movie => movie.id === movieId
                ? { ...movie, comments: movie.comments.map(c => c.id === commentId ? { ...c, ...commentData } : c) }
                : movie)
        }

        case DELETE_COMMENT: {
            const { movieId, commentId } = action.payload
            return state.map(movie => movie.id === movieId ? { ...movie, comments: movie.comments.filter(c => c.id !== commentId) } : movie)
        }

        default:
            return state;
    }
};

module.exports = movies;

