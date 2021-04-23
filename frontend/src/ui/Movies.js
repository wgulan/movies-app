import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import { useEffect } from "react";
import selectors from "../state/movies/selectors";
import { Card, CardContent, CardMedia, Grid, makeStyles, Typography, CardActionArea, IconButton } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import actions from "../state/movies/actions";
import operations from "../state/movies/operations";
import Popup from "./Popup"

const useStyles = makeStyles((theme) => ({
    moviesContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
        width: "100%",
        margin: 0,
        [theme.breakpoints.down("xs")]: {
            padding: '20px 3%',
        },
    },
    pagination: {
        marginTop: "3px",
        marginBottom: "6px",
        [theme.breakpoints.down("xs")]: {
            minWidth: "350px",
        },
        padding: "12px",
        color: theme.palette.bgColor.main
    },
    ul: {
        "& .MuiPaginationItem-root": {
            color: "#fff"
        }
    },
    cardContainer: {
        height: '100%',
        textAlign: "center",
        [theme.breakpoints.down("xs")]: {
            width: "300px",
        },
        margin: 'auto',
        width: "auto",
        position: 'relative',
        borderRadius: '1px',
        transition: "transform 0.15s ease-in-out",
        "&:hover": { transform: "scale3d(1.03, 1.03, 1)" }
    },
    cardButtons: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 10
    },
    cardAction: {
        height: '100%',
        backgroundColor: theme.palette.background.lightest
    },
    cardMedia: {
        height: 630,
        width: "auto",
        objectFit: "cover",
        [theme.breakpoints.down("xs")]: {
            height: 450,
        },
    },
    cardContent: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
    },
    text: {
        lineHeight: 1.8,
        fontSize: "18px",
        color: "white",
        textTransform: "uppercase"
    },
}));

const Movies = (props) => {
    const classes = useStyles(props.theme);

    const [page, setPage] = useState(1);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formType, setFormType] = useState('');
    const [editedMovieId, setEditedMovieId] = useState();

    useEffect(() => {
        setPage(1)
    }, [props.filteredMovies])


    const handlePageChange = (event, value) => setPage(value);

    const handleEditMovieDialogOpen = (movieId) => {
        setFormType('editMovie')
        setEditedMovieId(movieId)
        setDialogOpen(true)
    }

    const handleAddMovieDialogOpen = () => {
        setFormType('addMovie')
        setDialogOpen(true)
    }


    const getMovieCard = (movieId, title, poster_path, release_date) => {
        const releaseYear = release_date.substring(0, 4)
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movieId}>
                <Card className={classes.cardContainer}>
                    <div className={classes.cardButtons}>
                        <IconButton color="primary" aria-label="edit" component="span" onClick={() => handleEditMovieDialogOpen(movieId)}>
                            <EditIcon fontSize='small' color='black' />
                        </IconButton>
                        <IconButton color="primary" aria-label="delete" component="span" onClick={() => props.onDeleteMovie(movieId)}>
                            <DeleteIcon fontSize='small' />
                        </IconButton>
                    </div>
                    <CardActionArea component={Link} to={`/movies/${movieId}`} className={classes.cardAction}>
                        <CardMedia className={classes.cardMedia} image={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "/poster-placeholder.png"} />
                        <CardContent className={classes.cardContent}>
                            <Typography display="block" variant={'h6'} color="primary" className={classes.text}>{title}</Typography>
                            <Typography display="block"  color="primary"  variant={'caption'}>{releaseYear}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    };

    return (
        <>
            <Grid container spacing={2} className={classes.moviesContainer}>
                <Grid container justify="center">
                    <Grid container item xs={1}>
                        <IconButton color="primary" aria-label="add movie" component="span" onClick={() => handleAddMovieDialogOpen()}>
                            <LibraryAddIcon/>
                        </IconButton>
                    </Grid>
                    <Grid container item xs={10} justify="center">
                        <Pagination
                            count={Math.max(1, Math.ceil(props.filteredMovies.length / 20))}
                            page={page}
                            size={'medium'}
                            onChange={handlePageChange}
                            className={classes.pagination}
                            classes={{ ul: classes.ul }}
                            color="primary"
                        />
                    </Grid>
                    <Grid container item xs={1}>
                    </Grid>

                </Grid>
                {props.filteredMovies.slice((page - 1) * 20, page * 20)
                    .map((m) => {
                        return getMovieCard(
                            m.id,
                            m.title,
                            m.poster_path,
                            m.release_date
                        );
                    })}
                <Grid container justify="center">
                    <Pagination
                        count={Math.max(1, Math.ceil(props.filteredMovies.length / 20))}
                        page={page}
                        size={'medium'}
                        onChange={(e, v) => {
                            handlePageChange(e, v);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={classes.pagination}
                        classes={{ ul: classes.ul }}
                        color="primary"
                    />
                </Grid>
            </Grid>
            <Popup dialogOpen={dialogOpen} type={formType} movieId={editedMovieId} setDialogOpen={setDialogOpen} />
        </>

    );
};

const mapStateToProps = (state) => {
    return {
        filteredMovies: selectors.selectFilteredMovies(state),
        yearFilterValues: state.movies.yearFilter.filterValues,
        sortKey: state.movies.sortParams.key,
        sortOrder: state.movies.sortParams.order,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteMovie: (movieId) => dispatch(operations.deleteMovie(movieId)),
        updateYearRangeSlider: (sliderRange) => dispatch(actions.updateYearRangeSlider(sliderRange)),
        updateYearRangeFilter: (filterValues) => dispatch(actions.updateYearRangeFilter(filterValues)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
