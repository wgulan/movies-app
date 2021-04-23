import types from "./types";

const updateSearchKey = (searchKey) => ({
    type: types.UPDATE_SEARCH_KEY,
    payload: {
        searchKey,
    },
});

const updateGenreFilter = (genreFilter) => ({
    type: types.UPDATE_GENRE_FILTER,
    payload: {
        genreFilter,
    },
});

const updateYearRangeSlider = (sliderRange) => ({
    type: types.UPDATE_YEAR_SLIDER_RANGE,
    payload: {
        sliderRange,
    },
});

const updateYearRangeFilter = (filterValues) => ({
    type: types.UPDATE_YEAR_FILTER,
    payload: {
        filterValues,
    },
});

const updateSortKey = (key) => ({
    type: types.UPDATE_SORT_KEY,
    payload: {
        key
    }
})

const updateSortOrder = () => ({
    type: types.UPDATE_SORT_ORDER,
});


const actions = {
    updateSearchKey,
    updateGenreFilter,
    updateYearRangeSlider,
    updateYearRangeFilter,
    updateSortKey,
    updateSortOrder,
};

export default actions;
