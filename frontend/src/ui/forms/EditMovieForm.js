import React from "react";
import { Formik, Field } from "formik";
import { TextField, Button, makeStyles, InputAdornment, Typography, MenuItem, Chip, FormControl, InputLabel, Select, Input } from "@material-ui/core";
import { connect } from "react-redux";
import selectors from "../../state/movies/selectors";
import operations from "../../state/movies/operations";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
        maxWidth: 450
    },
    chips: {
        display: "flex",
        flexWrap: "wrap"
    },
    chip: {
        margin: 2
    },
    commentForm: {
        marginTop: "24px"
    },
    formField: {
        width: "500px",
        marginTop: '8px',
        [theme.breakpoints.down("xs")]: {
            maxWidth: "350px",
            marginLeft: '-10px'
        },
    },
    formError: {
        fontSize: '12px',
        color: '#c00000',
    }
}));

const EditMovieForm = (props) => {
    const classes = useStyles();

    const initialValues = {
        title: props.movieData.title,
        tagline: props.movieData.tagline,
        overview: props.movieData.overview,
        release_date: props.movieData.release_date,
        revenue: props.movieData.revenue,
        runtime: props.movieData.runtime,
        vote_average: props.movieData.vote_average,
        genres: props.movieData.genres,
    };

    const validateTitle = value => {
        let error;
        if (!value) {
            error = "Required"
            return error
        }
    }

    const validateTagline = value => {
        let error;
        if (!value) {
            error = "Required"
        } else if (value.length < 3 || value.length > 100) {
            error = "Author name length must be between 3-100"
        }
        return error
    }

    const validateOverview = value => {
        let error;
        if (!value) {
            error = "Required"
        } else if (value.length < 20 || value.length > 600) {
            error = "Author name length must be between 20-600"
        }
        return error
    }

    const validateDate = (value) => {
        let error;
        const todaysDate = new Date().toISOString().split("T")[0];
        if (value > todaysDate) {
            error = "Release date cannot be later than today";
        }
        return error;
    };

    const validateRevenue = (value) => {
        let error;
        if (value < 10000) {
            error = "Movies which earned less than 10000$ are not accepted";
        }
        return error;
    };

    const validateRuntime = (value) => {
        let error;
        if (value < 20) {
            error = "Movie length should be at least 20 minutes";
        }
        return error;
    };

    const validateVoteAverage = (value) => {
        let error;
        if (value < 1 || value > 10) {
            error = "Vote average must be between 1-10";
        }
        return error;
    };

    const validateGenres = (value) => {
        let error;
        if (!value || value.length < 1) {
            error = "You must choose at least one movie genre";
        }
        return error;
    };

    return (
        <div style={{ width: '100%' }}>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(data) => {
                    props.editMovie(data)
                    props.closePopup()
                }}
            >
                {({ values, errors, touched, handleSubmit, handleChange, validateForm, resetForm }) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="title"
                            type="input"
                            label="Title"
                            placeholder="Title"
                            validate={validateTitle}
                            as={TextField}
                            className={classes.formField}
                        />
                        {errors.title && touched.title && <div><Typography variant={'caption'} className={classes.formError}>{errors.title}</Typography></div>}
                        <div>
                            <Field
                                name="tagline"
                                type="input"
                                label="Tagline"
                                placeholder="Tagline"
                                validate={validateTagline}
                                as={TextField}
                                className={classes.formField}
                            />
                            {errors.tagline && touched.tagline && <div><Typography variant={'caption'} className={classes.formError}>{errors.tagline}</Typography></div>}
                        </div>
                        <div>
                            <Field
                                name="overview"
                                type="input"
                                label="Overview"
                                placeholder="Overview"
                                variant="outlined"
                                validate={validateOverview}
                                multiline
                                rows={9}
                                as={TextField}
                                className={classes.formField}
                            />
                            {errors.overview && touched.overview && <div><Typography variant={'caption'} className={classes.formError}>{errors.overview}</Typography></div>}
                        </div>
                        <div>
                            <Field
                                name="release_date"
                                type="date"
                                label="Release date"
                                validate={validateDate}
                                as={TextField}
                            />
                            {errors.release_date && touched.release_date && <div><Typography variant={'caption'} className={classes.formError}>{errors.release_date}</Typography></div>}
                        </div>
                        <div>
                            <Field
                                name="revenue"
                                type="number"
                                label="Box office"
                                validate={validateRevenue}
                                as={TextField}
                                style={{ width: '130px', marginRight: '8px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                            />
                            {errors.revenue && touched.revenue && <div><Typography variant={'caption'} className={classes.formError}>{errors.revenue}</Typography></div>}
                            <Field
                                name="runtime"
                                type="number"
                                label="Runtime"
                                validate={validateRuntime}
                                as={TextField}
                                style={{ width: '90px', marginRight: '8px' }}
                                InputProps={{
                                    inputProps: { min: 20, max: 300 },
                                    endAdornment: <InputAdornment position="end">min</InputAdornment>,
                                }}
                            />
                            {errors.runtime && touched.runtime && <div><Typography variant={'caption'} className={classes.formError}>{errors.runtime}</Typography></div>}
                            <Field
                                name="vote_average"
                                type="number"
                                label="Rating"
                                validate={validateVoteAverage}
                                as={TextField}
                                InputProps={{ inputProps: { min: 1, max: 10, step: 0.1 } }}
                                style={{ width: '60px', marginRight: '8px' }}
                            />
                            {errors.vote_average && touched.vote_average && <div><Typography variant={'caption'} className={classes.formError}>{errors.vote_average}</Typography></div>}
                        </div>
                        <div>
                            <Field
                                name="genres"
                                validate={validateGenres}
                                render={() => (
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="select-genres">Genres</InputLabel>
                                        <Select
                                            id='select-genres'
                                            name="genres"
                                            validate={validateGenres}
                                            multiple
                                            value={values.genres}
                                            onChange={handleChange}
                                            input={<Input id="select-multiple-genres" />}
                                            renderValue={(selected) => (
                                                <div className={classes.chips}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} className={classes.chip} />
                                                    ))}
                                                </div>
                                            )}
                                        >
                                            {props.genres.map((genre) => (
                                                <MenuItem
                                                    key={genre}
                                                    value={genre}
                                                >
                                                    {genre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )} />
                            {errors.genres && touched.genres && <div><Typography variant={'caption'} className={classes.formError}>{errors.genres}</Typography></div>}
                        </div>
                        <div style={{ marginTop: '8px', marginBottom: '8px' }}>
                            <Button variant="outlined" type="submit" onClick={() => validateForm()} style={{ margin: '12px 16px 12px 0' }}>Submit</Button>
                            <Button variant="outlined" type="reset" onClick={() => resetForm()}>Reset</Button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};


const mapStateToProps = (state, ownProps) => {
    const movieId = ownProps.movieId;
    const selectMovie = selectors.makeSelectMovieWithId(movieId)
    return {
        genres: selectors.selectAllGenres(state),
        movieData: selectMovie(state),
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const movieId = ownProps.movieId;
    return {
        editMovie: (movieData) => dispatch(operations.editMovie(movieId, movieData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditMovieForm);
