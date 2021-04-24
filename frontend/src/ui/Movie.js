import React, { useState } from 'react'
import { Grid, makeStyles, Card, Typography, CardContent, CardMedia, IconButton, Paper } from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from 'react-redux';
import { useEffect } from 'react';
import operations from '../state/movies/operations';
import actions from '../state/movies/actions';
import selectors from '../state/movies/selectors';
import Comment from './Comment';
import AddCommentIcon from '@material-ui/icons/AddComment';
import Popup from './Popup';


const useStyles = makeStyles((theme) => ({
    mainContainer: {
        paddingTop: "20px",
        paddingLeft: "15px",
        paddingRight: "15px",
    },
    card: {
        height: "100%",
        maxWidth: "900px",
        margin: "auto",
        display: "flex",
        flexDirection: "row",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            marginBottom: "18px",
            maxWidth: 400,
        },
        position: "relative",
    },
    cardContent: {
        height: '100%',
        width: "100%",
        padding: "20px 60px 60px 20px",
        position: "relative",
        [theme.breakpoints.down("sm")]: {
            height: 580,
            width: '350px'
        },
        backgroundColor: theme.palette.background.lightest
    },
    cardMedia: {
        height: 630,
        width: "100%",
        maxWidth: 450,
        objectFit: "cover",
        [theme.breakpoints.down("sm")]: {
            height: 550,
            width: "100%",
        }
    },
    title: {
        fontSize: 36,
        fontWeight: 600,
        textTransform: "uppercase",
        marginBottom: 8,
        color: "#ffffff",
    },
    tagline: {
        fontSize: 18,
        marginBottom: 10,
        color: theme.palette.primary.main,
    },
    overview: {
        color: "#ffffff",
    },
    movieInfoContainer: {
        marginTop: "50px",
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "150px",
        [theme.breakpoints.up("sm")]: {
            marginBottom: "42px",
        }
    },
    movieInfo: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: theme.palette.primary.main,
    }
}));

const Movie = (props) => {
    const { movieData, updateSearchKey } = props;
    const movieId = props.match.params.movieId;

    const classes = useStyles();

    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => updateSearchKey(""), []);

    return (
        <div>
            <Grid container className={classes.mainContainer}>
                {movieData !== undefined ? (
                    <>
                        <Grid item xs={12}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={movieData.poster_path ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` : "/poster-placeholder.png"}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography className={classes.title}>
                                        {movieData.title}
                                    </Typography>
                                    <Typography variant={'body1'} className={classes.tagline}>
                                        {movieData.tagline}
                                    </Typography>
                                    <Typography variant={"body2"} className={classes.overview}>
                                        {movieData.overview}
                                    </Typography>
                                    <Grid item container xs={12} direction="row" justify="space-between" className={classes.movieInfoContainer}>
                                        <Grid item xs={6}><Typography variant={"overline"} className={classes.movieInfo}>Average rating: {movieData.vote_average}</Typography></Grid>
                                        <Grid item xs={6}><Typography variant={"overline"} className={classes.movieInfo}>Running time: {movieData.runtime} mins</Typography></Grid>
                                        <Grid item xs={6}><Typography variant={"overline"} className={classes.movieInfo}>Release date: {movieData.release_date.substring(0, 10)}</Typography></Grid>
                                        <Grid item xs={6}><Typography variant={"overline"} className={classes.movieInfo}>Box office: ${movieData.revenue}</Typography></Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <div style={{ width: '100%', textAlign: 'center', margin: '24px auto 20px auto' }}>
                            <IconButton color="primary" aria-label="add" component="span" onClick={() => setDialogOpen(true)}>
                                <AddCommentIcon fontSize='large' />
                            </IconButton>
                        </div>
                        <Paper style={{ margin: '10px auto 20px auto' }}>
                            {movieData.comments.map(c => (
                                <Comment movieId={movieId} commentId={c.id} />
                            ))}
                        </Paper>
                        <Popup dialogOpen={dialogOpen} movieId={movieId} type={'addComment'} setDialogOpen={setDialogOpen} />
                    </>
                ) : (
                        <Grid item xs={12} style={{ marginTop: '64px', textAlign: "center" }}>
                            <CircularProgress thickness={4.2} size={50} style={{ 'color': "#454545" }} />
                        </Grid>
                    )}
            </Grid>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    const movieId = ownProps.match.params.movieId;
    const selectMovie = selectors.makeSelectMovieWithId(movieId)
    return {
        movieData: selectMovie(state),
        movies: state.movies.allMovies
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMovieDetails: (movieId) => dispatch(operations.getMovieDetails(movieId)),
        updateSearchKey: (query) => dispatch(actions.updateSearchKey(query))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Movie)
