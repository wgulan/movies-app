import React from "react";
import { Formik, Field, FieldArray } from "formik";
import { TextField, Button, InputAdornment, Select, MenuItem, FormControl, InputLabel, makeStyles, Input, Chip, Divider, IconButton, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import selectors from "../../state/movies/selectors";
import operations from "../../state/movies/operations";
import AddCommentIcon from '@material-ui/icons/AddComment';
import DeleteIcon from '@material-ui/icons/Delete';
import { nanoid } from 'nanoid'


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

const AddMovieForm = (props) => {
    const classes = useStyles();    

    const initialValues = {
        title: '',
        tagline: '',
        overview: '',
        release_date: new Date().toISOString().split("T")[0],
        revenue: 0,
        runtime: 30,
        vote_average: 5.0,
        genres: [],
        comments: [],

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


    const getCommentSubform = (index, remove) => {
        return <div className={classes.commentForm}>
            <div>
                <Field name={`comments.${index}.author`} type="text" placeholder={'Author'} as={TextField} style={{ marginBottom: '5px', paddingRight: "9px" }} />
                <IconButton color="primary" aria-label="edit" component="span" onClick={() => remove(index)}>
                    <DeleteIcon fontSize='small' />
                </IconButton>
            </div>
            <Field name={`comments.${index}.content`} type="text"
                placeholder={'Comment'}
                as={TextField}
                multiline
                variant="outlined"
                rows={2}
                className={classes.formField} />
            <Divider variant="light" style={{ marginTop: '12px' }} />
        </div>
    }

    return (
        <div style={{ width: '100%' }}>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(data) => {
                    const id = nanoid();
                    props.addMovie(id, data)
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
                        <Divider style={{ margin: '24px 0px 12px 0px' }} />
                        <FieldArray name='comments'>
                            {({ remove, push }) => (
                                <div>
                                    <div>
                                        <Button size="small" variant="outlined" type="button" startIcon={<AddCommentIcon color="primary" />}
                                            onClick={() => push({ id: nanoid(), author: '', content: '' })}>
                                            Add comment
                                        </Button>
                                    </div>
                                    {values.comments.map((comment, index) => (
                                        getCommentSubform(index, remove, push)
                                    ))}
                                </div>
                            )}
                        </FieldArray>
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

const mapStateToProps = (state) => {
    return {
        genres: selectors.selectAllGenres(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMovie: (movieId, movieData) => dispatch(operations.addMovie(movieId, movieData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddMovieForm);
