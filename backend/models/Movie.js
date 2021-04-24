const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    id: String,
    budget: Number,
    overview: String,
    poster_path: String,
    release_date: Date,
    revenue: Number,
    runtime: Number,
    tagline: String,
    title: String,
    vote_average: Number,
    vote_count: Number,
    genres: [{ type: String }],
    comments: [{ id: String, author: String, content: String }]
})

module.exports = model("Movie", movieSchema);
// {
//     "id": 425,
//     "budget": 59000000,
//     "overview": "With the impending ice age almost upon them, a mismatched trio of prehistoric critters – Manny the woolly mammoth, Diego the saber-toothed tiger and Sid the giant sloth – find an orphaned infant and decide to return it to its human parents. Along the way, the unlikely allies become friends but, when enemies attack, their quest takes on far nobler aims.",
//     "poster_path": "/gLhHHZUzeseRXShoDyC4VqLgsNv.jpg",
//     "release_date": "2002-03-10",
//     "revenue": 383257136,
//     "runtime": 81,
//     "tagline": "They came. They thawed. They conquered.",
//     "title": "Ice Age",
//     "vote_average": 7.3,
//     "vote_count": 9654,
//     "genres": ["Animation", "Comedy", "Family", "Adventure"]
// },