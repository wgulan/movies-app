import React from "react";
import { Formik, Field } from "formik";
import { TextField, Button, makeStyles, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import operations from "../../state/movies/operations";
import selectors from "../../state/movies/selectors";

const useStyles = makeStyles((theme) => ({
    formField: {
        width: "500px",
        marginTop: '8px',
        [theme.breakpoints.down("xs")]: {
            maxWidth: "350px",
        },
    },
    formError: {
        fontSize: '12px',
        color: '#c00000',
    }
}));

const EditCommentForm = (props) => {
    const classes = useStyles();

    const initialValues = {
        author: props.commentData.author,
        content: props.commentData.content,
    };

    const validateAuthor = value => {
        let error;
        if (!value) {
            error = "Required"
            return error
        } else if (value.length < 2 || value.length > 20) {
            error = "Author name length must be between 2-20"
        }
        return error;
    }

    const validateContent = value => {
        let error;
        if (!value) {
            error = "Required"
        } else if (value.length < 5 || value.length > 500) {
            error = "Comment's content length must be between 5-500"
        }
        return error
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(data) => {
                    props.editComment(data)
                    props.closePopup()
                }}
            >
                {({ values, errors, touched, handleSubmit, validateForm, resetForm }) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="author"
                            type="input"
                            label="Author"
                            validate={validateAuthor}
                            as={TextField}
                            style={{ width: '250px' }}
                        />
                        {errors.author && touched.author && <div><Typography variant={'caption'} className={classes.formError}>{errors.author}</Typography></div>}

                        <div>
                            <Field
                                name="content"
                                type="input"
                                label="Content"
                                variant="outlined"
                                validate={validateContent}
                                multiline
                                rows={3}
                                as={TextField}
                                className={classes.formField}
                            />
                            {errors.content && touched.content && <div><Typography variant={'caption'} className={classes.formError}>{errors.content}</Typography></div>}

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
    const commentId = ownProps.commentId;
    const selectComment = selectors.makeSelectCommentWithId(movieId, commentId)
    return {
        commentData: selectComment(state),
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const movieId = ownProps.movieId;
    const commentId = ownProps.commentId;
    return {
        editComment: (commentData) => dispatch(operations.editComment(movieId, commentId, commentData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCommentForm);
