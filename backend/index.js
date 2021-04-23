const express = require("express");
const json = express.json;
const cors = require("cors");
const store = require("./redux/store");
const { deleteMovie, editMovie, addComment, deleteComment, addMovie, editComment } = require("./redux/actions");

const app = express();
app.use(cors());
app.options("*", cors());
app.use(json());

const movies = JSON.stringify(store.getState().movies.map(m => {
    return { ...m, comments: [] }
}))

// var fs = require('fs');
// fs.writeFile("test.json", movies, function (err) {
//     if (err) {
//         console.log(err);
//     }
// });
const regexChecker = (id) => {
    const letters = /[a-zA-Z]/g;
    return letters.test(id)
}


// server methods

// ----- GET MOVIES
app.get('/movies', (req, res) => {
    const movies = store.getState().movies;
    res.status(200).send({ results: movies })
})

// ----- POST MOVIE
app.post('/movies/:movieId', (req, res) => {
    const movieId = req.params.movieId;
    const movieData = req.body;
    store.dispatch(addMovie(movieId, movieData))
    console.log({ addedMovie: { movieId, movieData } })
    res.status(200).send({ addedMovie: { movieId, movieData } })
})

// ----- POST COMMENT
app.post('/movies/:movieId/comments', (req, res) => {
    const movieId = (regexChecker(req.params.movieId)) ? req.params.movieId : parseInt(req.params.movieId, 10);
    const commentData = req.body;
    store.dispatch(addComment(movieId, commentData))
    console.log({ addedComment: { movieId, commentData } })
    res.status(200).send({ addedComment: { movieId, commentData } })
})


// ----- PUT MOVIE
app.put('/movies/:movieId', (req, res) => {
    const movieId = (regexChecker(req.params.movieId)) ? req.params.movieId : parseInt(req.params.movieId, 10);
    const movieData = req.body;
    store.dispatch(editMovie(movieId, movieData))
    console.log({ updatedMovie: { movieId, movieData } })
    res.status(200).send({ updatedMovie: { movieId, movieData } })
})

// ----- PUT COMMENT
app.put('/movies/:movieId/comments/:commentId', (req, res) => {
    const movieId = (regexChecker(req.params.movieId)) ? req.params.movieId : parseInt(req.params.movieId, 10);
    const commentId = req.params.commentId;
    const commentData = req.body;
    store.dispatch(editComment(movieId, commentId, commentData))
    console.log({ updatedComment: { movieId, commentId, commentData } })
    res.status(200).send({ updatedComment: { movieId, commentId, commentData } })
})



// ----- DELETE MOVIE
app.delete('/movies/:movieId', (req, res) => {
    const movieId = (regexChecker(req.params.movieId)) ? req.params.movieId : parseInt(req.params.movieId, 10);
    store.dispatch(deleteMovie(movieId))
    console.log({ deletedMovie: movieId })
    res.status(200).send({ deletedMovie: movieId })
})

// ----- DELETE COMMENT
app.delete('/movies/:movieId/comments/:commentId', (req, res) => {
    const movieId = (regexChecker(req.params.movieId)) ? req.params.movieId : parseInt(req.params.movieId, 10);
    const commentId = req.params.commentId;
    store.dispatch(deleteComment(movieId, commentId))
    console.log({ deletedComment: { movieId, commentId } })
    res.status(200).send({ deletedComment: { movieId, commentId } })
})


// start express server
const PORT = 4000;
app.listen(PORT, () => {
    console.log("Express server running on port", PORT);
});
