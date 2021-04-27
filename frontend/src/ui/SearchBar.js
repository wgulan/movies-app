import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import actions from '../state/movies/actions'
import TextField from '@material-ui/core/TextField'
import { Select, FormControl, makeStyles, Typography, Slider, IconButton, InputAdornment, MenuItem, Grid } from '@material-ui/core'
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        paddingLeft: '15px',
        display: "flex",
        flexDirection: "row",
    },
    yearRange: {
        width: 150,
        color: 'black',
        marginTop: "8px",
        textAlign: 'center',
        padding: '0px 8px'
    },
    input: {
        background: theme.palette.background.lighter,
        padding: '8px 14px',
        color: theme.palette.primary.main,
        fontWeight: "bold"
    },
    sliderText: {
        color: theme.palette.primary.main,
        padding: '8px 1px',
        fontWeight: "bold",
        fontSize: '16px'
    },
    arrowIcon: {
        color: theme.palette.primary.main,
        padding: '8px 1px',
        fontWeight: "bold",
        fontSize: '24px'
    }
}));


const SearchBar = (props) => {
    const classes = useStyles(props.theme);
    const [years, setYears] = useState(props.yearSliderRange)

    useEffect(() => props.updateSearchKey(''), [])
    // update year state when sliderRange in store changes (e.g when new movie with oldest release date is added to the store)
    useEffect(() => setYears(props.yearSliderRange), [props.yearSliderRange]);

    const handleSearchKeyChange = (e) => props.updateSearchKey(e.target.value);

    // update years filter state when slider's value is changed
    const handleYearsChange = (event, newYears) => setYears(newYears);
    // update years filter values in store on mouse release
    const handleYearFilterValuesChange = () => props.updateYearFilterValues(years);

    return (
        <Grid container>
            <Grid container item xs={12}>
                <TextField onChange={handleSearchKeyChange} value={props.searchKey} placeholder={"Search movie title..."}
                    style={{ width: '230px', marginTop: "8px" }}
                    color="primary"
                    InputProps={{
                        className: classes.input,
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }} />
                <FormControl className={classes.formControl}>
                    <Select
                        displayEmpty
                        value={props.genreFilter}
                        onChange={(e) => props.updateGenreFilter(e.target.value)}
                        style={{ width: '140px' }}
                        className={classes.input}
                    >
                        <MenuItem value="" disabled>Genre</MenuItem>
                        <MenuItem value="all">All</MenuItem>
                        {props.genres.map(genre =>
                            <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <div className={classes.yearRange}>
                    <Typography id="year-range" variant="caption" className={classes.sliderText}>
                        Production year
                </Typography>
                    <Slider
                        value={years}
                        valueLabelDisplay="auto"
                        min={props.yearSliderRange[0]}
                        max={props.yearSliderRange[1]}
                        aria-labelledby="year-range"
                        onChange={handleYearsChange}
                        onChangeCommitted={handleYearFilterValuesChange}
                        style={{ padding: '0px 5px 8px 5px' }}
                    />
                </div>
                <div style={{display: "flex"}}>
                    <FormControl className={classes.formControl} style={{ marginRight: -8 }}>
                        <Select
                            displayEmpty
                            value={props.sortKey}
                            onChange={(e) => props.updateSortKey(e.target.value)}
                            className={classes.input}
                        >
                            <MenuItem value="" disabled>Sort by</MenuItem>
                            <MenuItem key={'title'} value={'title'}>Title</MenuItem>
                            <MenuItem key={'release'} value={'release'}>Release</MenuItem>
                            <MenuItem key={'rating'} value={'rating'}>Rating</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton onClick={() => props.updateSortOrder()} >
                        {props.sortOrder === 'asc' ?
                            (
                                <ArrowUpwardIcon className={classes.arrowIcon} />
                            ) : (<ArrowDownwardIcon className={classes.arrowIcon} />)}

                    </IconButton>
                </div>
            </Grid>

        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        searchKey: state.movies.searchKey,
        genreFilter: state.movies.genreFilter,
        genres: state.movies.genres,
        movies: state.movies.allMovies,
        yearFilterValues: state.movies.yearFilter.filterValues,
        yearSliderRange: state.movies.yearFilter.sliderRange,
        sortKey: state.movies.sortParams.key,
        sortOrder: state.movies.sortParams.order,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSearchKey: (query) => dispatch(actions.updateSearchKey(query)),
        updateGenreFilter: (genre) => dispatch(actions.updateGenreFilter(genre)),
        updateYearFilterValues: (filterValues) => dispatch(actions.updateYearRangeFilter(filterValues)),
        updateSortKey: (key) => dispatch(actions.updateSortKey(key)),
        updateSortOrder: () => dispatch(actions.updateSortOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
