import { Divider, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import operations from '../state/movies/operations';
import { connect } from 'react-redux';
import selectors from '../state/movies/selectors';
import Popup from './Popup';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles((theme) => ({
    comment: {
        width: "860px",
        margin: "auto",
        padding: "30px 20px",
        display: "flex",
        flexDirection: "row",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            marginBottom: "18px",
            maxWidth: 360,
        },
        [theme.breakpoints.down("xs")]: {
            maxWidth: 310,
        },
        position: "relative",
        backgroundColor: theme.palette.background.lightest
    },
    user: {
        paddingBottom: "8px",
        display: 'flex', 
        justifyContent: 'space-between',
        color: "#ffffff"
    },
    userIcon: {
        margin: 0,
        textAlign: "left",
        marginRight: "auto",
        marginLeft: "10px",
    },
    commentContent: {
        marginLeft: '8px',
        textAlign: "left", 
        marginBottom: '20px', 
        wordBreak: 'break-all', 
        wordWrap: 'break-word',
        color: "#ffffff"
    }
}))

const Comment = (props) => {
    const classes = useStyles();

    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <Grid item xs={12}>
            <div className={classes.comment}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className={classes.user}>
                                <AccountCircleIcon fontSize="large" />
                                <Typography variant={'h6'} className={classes.userIcon}>{props.commentData.author}</Typography>
                            </div>
                            <div>
                                <IconButton color="primary" aria-label="edit" component="span" style={{ padding: '0 6px', marginRight: '16px' }}
                                    onClick={() => setDialogOpen(true)}>
                                    <EditIcon fontSize='small' />
                                </IconButton>
                                <IconButton color="primary" aria-label="edit" component="span" style={{ padding: '0 6px' }} onClick={() => props.onDeleteComment(props.commentId)}>
                                    <DeleteIcon fontSize='small' />
                                </IconButton>
                            </div>
                        </div>
                        <Typography variant={'body1'} className={classes.commentContent}>
                            {props.commentData.content}
                        </Typography>
                        <Popup dialogOpen={dialogOpen} type={'editComment'} movieId={props.movieId} commentId={props.commentId} setDialogOpen={setDialogOpen} />
                        <Divider variant="fullWidth" style={{ marginTop: '20px' }} />
                    </Grid>
                </Grid>
            </div>
        </Grid>
    )
}

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
    return {
        onDeleteComment: (commentId) => dispatch(operations.deleteComment(movieId, commentId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
