const express = require("express");
const cors = require("cors");
const fileSystem = require('fs');
const Movie = require("./models/Movie");

const json = express.json;

const app = express();
app.use(cors());
app.options("*", cors());
app.use(json());

// server methods

// ----- GET MOVIES
app.get('/movies', async (req, res) => {
    const movies = await Movie.find({});
    res.status(200).send({ results: movies })
})

// ----- POST MOVIE
app.post('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movieData = req.body;

    await Movie.create({
        id: movieId,
        ...movieData
    }, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send(err);
        }
        else {
            console.log({ addedMovie: { movieId, movieData } })
            res.status(201).send({ addedMovie: { movieId, movieData } });
        }
    });
})

// ----- POST COMMENT
app.post('/movies/:movieId/comments', async (req, res) => {
    const movieId = req.params.movieId;
    const commentData = req.body;

    await Movie.findOneAndUpdate({ id: movieId },
        {
            $push: {
                comments: { ...commentData }
            }
        }, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err);
            }
            else {
                console.log({ addedComment: { movieId, commentData } })
                res.status(201).send({ addedComment: { movieId, commentData } });
            }
        });
})


// ----- PUT MOVIE
app.put('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movieData = req.body;

    await Movie.findOneAndUpdate({ id: movieId },
        { ...movieData }, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err);
            }
            else {
                console.log({ updatedMovie: { movieId, movieData } })
                res.status(201).send({ updatedMovie: { movieId, movieData } });
            }
        });
})

// ----- PUT COMMENT
app.put('/movies/:movieId/comments/:commentId', async (req, res) => {
    const movieId = req.params.movieId;
    const commentId = req.params.commentId;
    const commentData = req.body;

    await Movie.findOneAndUpdate({ id: movieId, comments: { $elemMatch: { id: commentId } } },
        { $set: { 'comments.$.author': commentData.author, 'comments.$.content': commentData.content } },
        { 'new': true, 'safe': true, 'upsert': true },
        (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err);
            }
            else {
                console.log({ updatedComment: { movieId, commentId, commentData } })
                res.status(201).send({ updatedComment: { movieId, commentId, commentData } });
            }
        });
})



// ----- DELETE MOVIE
app.delete('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;

    await Movie.findOneAndDelete({ id: movieId },
        (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err);
            }
            else {
                console.log({ deletedMovie: movieId })
                res.status(200).send({ deletedMovie: movieId });
            }
        });
})

// ----- DELETE COMMENT
app.delete('/movies/:movieId/comments/:commentId', async (req, res) => {
    const movieId = req.params.movieId;
    const commentId = req.params.commentId;

    await Movie.findOneAndUpdate({ id: movieId },
        {
            $pull: {
                comments: { id: commentId }
            }
        }, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err);
            }
            else {
                console.log({ deletedComment: { movieId, commentId } });
                res.status(201).send({ deletedComment: { movieId, commentId } });
            }
        });
})


// -------- CONNECTING TO DATABASE
const mongoose = require("mongoose");

const dbConnectData = {
    host: process.env.MONGO_HOST || 'db-mongo',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DATABASE || 'moviesDb',
}

mongoose.connect(
    `mongodb://${dbConnectData.host}:${dbConnectData.port}/${dbConnectData.database}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
)
    .then(async (response) => {
        console.log(
            `Connected to MongoDB. Database name: "${response.connections[0].name}"`
        );
        const PORT = process.env.PORT || 4000;
        // load data to database
        await resetCollection("movies", "./data/data.json")
        app.listen(PORT, () => {
            console.log(`API server listening at http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.error("Error connecting to MongoDB", error));



async function resetCollection(dbCollectionName, fileName) {
    try {
        // 1. Drop existing collection, if exists
        console.log('Deleting collection:', dbCollectionName);
        try {
            await Movie.collection.drop();
        } catch (err) {
            if (err.message !== 'ns not found') {
                throw err;
            }
        }

        // 2. Load data from JSON files in the server
        console.log('Reading JSON file:', fileName);
        let data = fileSystem.readFileSync(fileName, 'utf8');
        let documents = JSON.parse(data);

        // 3. Insert new documents in the collection
        console.log('Inserting docs in collection:', dbCollectionName);
        await Movie.insertMany(documents);
    } catch (err) {
        throw err;
    }
}