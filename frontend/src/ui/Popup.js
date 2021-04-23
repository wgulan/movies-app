import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useEffect } from "react";
import { connect } from 'react-redux';
import selectors from '../state/movies/selectors';
import EditMovieForm from './forms/EditMovieForm';
import AddCommentForm from './forms/AddCommentForm';
import AddMovieForm from './forms/AddMovieForm';
import EditCommentForm from './forms/EditCommentForm';



const Popup = (props) => {
  const [open, setOpen] = useState(props.dialogOpen);

  useEffect(() => {
    setOpen(props.dialogOpen)
    console.log(props.type)
  }, [props.dialogOpen])

  const handleClose = () => {
    props.setDialogOpen(false)
  };


  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'}>
        <DialogTitle id="form-dialog-title">
          {(() => {
            switch (props.type) {
              case 'addMovie':
                return "Add new movie";
              case 'editMovie':
                return "Edit movie";
              case 'addComment':
                return "Add new comment";
              case 'editComment':
                return "Edit comment";
              default:
                return null;
            }
          })()}
        </DialogTitle>
        <DialogContent>
          {(() => {
            switch (props.type) {
              case 'addMovie':
                return <AddMovieForm closePopup={handleClose} />;
              case 'editMovie':
                return <EditMovieForm movieId={props.movieId} closePopup={handleClose} />;
              case 'addComment':
                return <AddCommentForm movieId={props.movieId} closePopup={handleClose} />;
              case 'editComment':
                return <EditCommentForm movieId={props.movieId} commentId={props.commentId} closePopup={handleClose} />;
              default:
                return null;
            }
          })()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const movieId = ownProps.movieId;
  const selectMovie = selectors.makeSelectMovieWithId(movieId)
  return {
    movieData: selectMovie(state),
  };
};

export default connect(mapStateToProps)(Popup);