import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import PhotoCard from "../PhotoCard";
import SendIcon from "@mui/icons-material/Send";
import { Grid, TextField } from "@mui/material";
import models from "../../lib/fetchModelData";
import CommentTree from "../CommentTree";
import useUserStore from "../../store/UserStore";

const MyGrid = styled(Grid)({
  padding: "10px",
  justifyContent: "center",
  alignContent: "center",
});

export default function PhotoPopup({ open, setOpen, photo }) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    if (photo) {
      models.fetchCommentList(photo._id).then((data) => {
        console.log(data);
        setCommentList(data);
      });
    }
  }, [photo]);

  useEffect(() => {
    setCommentList(commentList);
  }, [commentList]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleComment = () => {
    const request = {
      content: comment,
      parent_id: null,
      level: 0,
    };
    models.fetchCommentAdd(photo._id, request).then((data) => {
      let newCommentList = [...commentList];
      newCommentList.push(data);

      setComment("");
      setCommentList(newCommentList);
    });
  };

  return (
    <React.Fragment>
      <Dialog onClose={handleClose} maxWidth="lg" scroll="paper" open={open}>
        <DialogContent>
          <PhotoCard photo={photo} popup={open} setPopup={setOpen} />
          <Typography variant="h6">Comments</Typography>
          <CommentTree comments={commentList} setCommentList={setCommentList} />
        </DialogContent>
        <DialogActions>
          <MyGrid container spacing={2}>
            <MyGrid item xs={10}>
              <TextField
                id="comment"
                label="Comment"
                variant="outlined"
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </MyGrid>
            <MyGrid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                onClick={() => handleComment()}
              >
                Comment
              </Button>
            </MyGrid>
          </MyGrid>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
