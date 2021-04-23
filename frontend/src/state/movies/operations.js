import { createAction } from "redux-api-middleware";
import {
    MOVIES_FAILURE,
    MOVIES_REQUEST,
    MOVIES_SUCCESS,

    EDIT_MOVIE_REQUEST,
    EDIT_MOVIE_SUCCESS,
    EDIT_MOVIE_FAILURE,

    DELETE_MOVIE_REQUEST,
    DELETE_MOVIE_SUCCESS,
    DELETE_MOVIE_FAILURE,

    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,

    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,

    ADD_MOVIE_REQUEST,
    ADD_MOVIE_SUCCESS,
    ADD_MOVIE_FAILURE,
    EDIT_COMMENT_REQUEST,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_FAILURE
} from "./types";

const getMovies = () => (dispatch) =>
    dispatch(
        createAction({
            endpoint: 'http://localhost:4000/movies',
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            types: [MOVIES_REQUEST, MOVIES_SUCCESS, MOVIES_FAILURE],
        })
    );

const addMovie = (movieId, movieData) => (dispatch) => {
    console.log('POST')
    dispatch(
        createAction({
            endpoint: `http://localhost:4000/movies/${movieId}`,
            method: "POST",
            body: JSON.stringify(movieData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            types: [ADD_MOVIE_REQUEST, ADD_MOVIE_SUCCESS, ADD_MOVIE_FAILURE],
        })
    );
}


const addComment = (movieId, commentData) => (dispatch) => {
    console.log('POST')
    dispatch(
        createAction({
            endpoint: `http://localhost:4000/movies/${movieId}/comments`,
            method: "POST",
            body: JSON.stringify(commentData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            types: [ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE],
        })
    );
}


const editMovie = (movieId, movieData) => (dispatch) =>
    dispatch(
        createAction({
            endpoint: `http://localhost:4000/movies/${movieId}`,
            method: "PUT",
            body: JSON.stringify(movieData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            types: [EDIT_MOVIE_REQUEST, EDIT_MOVIE_SUCCESS, EDIT_MOVIE_FAILURE],
        })
    );

const editComment = (movieId, commentId, commentData) => (dispatch) =>
    dispatch(
        createAction({
            endpoint: `http://localhost:4000/movies/${movieId}/comments/${commentId}`,
            method: "PUT",
            body: JSON.stringify(commentData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            types: [EDIT_COMMENT_REQUEST, EDIT_COMMENT_SUCCESS, EDIT_COMMENT_FAILURE],
        })
    );


const deleteMovie = (movieId) => (dispatch) =>
    dispatch(
        createAction({
            endpoint: `http://localhost:4000/movies/${movieId}`,
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            types: [DELETE_MOVIE_REQUEST, DELETE_MOVIE_SUCCESS, DELETE_MOVIE_FAILURE],
        })
    );

const deleteComment = (movieId, commentId) => (dispatch) =>
    dispatch(
        createAction({
            endpoint: `http://localhost:4000/movies/${movieId}/comments/${commentId}`,
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            types: [DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE],
        })
    );

const operations = {
    getMovies,
    addMovie,
    addComment,
    editMovie,
    editComment,
    deleteMovie,
    deleteComment,
};

export default operations;
