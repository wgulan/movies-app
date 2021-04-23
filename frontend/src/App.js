import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Movie from "./ui/Movie";
import Movies from "./ui/Movies";
import Navbar from "./ui/Navbar";
import { connect } from "react-redux";
import { useEffect } from "react";
import actions from "./state/movies/actions";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const dark = createMuiTheme({
    typography: {
        fontFamily: [
            'Montserrat', //'Roboto'
        ].join(','),
    },
    palette: {
        primary: {
            main: '#f03252  ',
        },
        secondary: {
            main: '#1E212B',
        },
        bgColor: {
            main: "#FDFFFC"
        },
        background: {
            lightest: "#282c39",
            lighter: "#1E212B",
            darker: "#111218"
        }
    },
});

const light = createMuiTheme({
    typography: {
        fontFamily: [
            'Montserrat', //'Roboto'
        ].join(','),
    },
    palette: {
        primary: {
            main: '#111218  ',
        },
        secondary: {
            main: '#1E212B',
        },
        bgColor: {
            main: "#FDFFFC"
        },
        background: {
            lightest: "#282c39",
            lighter: "#1E212B",
            darker: "#111218"
        }
    },
});



function App(props) {
    const { allMovies, updateYearRangeSlider } = props;

    // update year slider when new movie is added the the store
    useEffect(() => {
        const minYear = Math.min(...allMovies.map(movie => Number(movie.release_date.substring(0, 4))))
        const maxYear = Math.max(...allMovies.map(movie => Number(movie.release_date.substring(0, 4))))
        updateYearRangeSlider([minYear, maxYear])
    },
    [allMovies])

    return (
        <ThemeProvider theme={dark}>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        <Movies />
                    </Route>
                    <Route exact path="/movies/:movieId" render={(props) => <Movie {...props} />}>
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

const mapStateToProps = (state) => {
    return {
        allMovies: state.movies.allMovies,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateYearRangeSlider: (sliderRange) => dispatch(actions.updateYearRangeSlider(sliderRange)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
