const { ADD_MOVIE, DELETE_MOVIE, EDIT_MOVIE, ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT } = require("./types");

const addMovie = (movieId, movieData) => ({
    type: ADD_MOVIE,
    payload: {
        movieId,
        movieData,
    },
});

const deleteMovie = (movieId) => ({
    type: DELETE_MOVIE,
    payload: {
        movieId
    }
})

const editMovie = (movieId, movieData) => ({
    type: EDIT_MOVIE,
    payload: {
        movieId,
        movieData
    }
})

const addComment = (movieId, commentData) => ({
    type: ADD_COMMENT,
    payload: {
        movieId,
        commentData
    }
})

const editComment = (movieId, commentId, commentData) => ({
    type: EDIT_COMMENT,
    payload: {
        movieId,
        commentId,
        commentData
    }
})

const deleteComment = (movieId, commentId) => ({
    type: DELETE_COMMENT,
    payload: {
        movieId,
        commentId
    }
})

module.exports = {
    addMovie,
    deleteMovie,
    editMovie,
    addComment,
    editComment,
    deleteComment
};
