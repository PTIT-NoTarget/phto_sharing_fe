import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import { Grid, TextField } from "@mui/material";
import models from "../../lib/fetchModelData";
import useUserStore from "../../store/UserStore";
import { Box, DialogTitle } from "@mui/material";
import useToastStore from "../../store/ToastStore";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function UploadPhotoPopup({ open, setOpen, api, photo }) {
  const [data, setData] = useState({});
  const { setToast } = useToastStore();
  const handleSubmit = (event) => {
    event.preventDefault();
    let request = {
      image: data.image,
      caption: data.caption,
    }
    if (photo) {
      api(photo, request).then((data) => {
        if (data) {
          if (data.message) {
            setToast({
              show: true,
              content: data.message,
              type: "error",
            });
          } else {
            setToast({
              show: true,
              content: "Photo updated successfully",
              type: "success",
            });
            setOpen(false);
          }
        }
      });
    } else {
      api(request).then((data) => {
        if (data) {
          if (data.message) {
            setToast({
              show: true,
              content: data.message,
              type: "error",
            });
          } else {
            setToast({
              show: true,
              content: "Photo uploaded successfully",
              type: "success",
            });
            setOpen(false);
          }
        }
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog onClose={handleClose} maxWidth="md" scroll="paper" open={open}>
        <DialogTitle sx={{ textAlign: "center" }}>Update Profile</DialogTitle>
        <DialogContent>
          <Box noValidate sx={{ mt: 3, textAlign: "start" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Image</Typography>
                <TextField
                  type="file"
                  required
                  fullWidth
                  name="image"
                  onChange={(e) =>
                    setData({ ...data, image: e.target.files[0] })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="caption"
                  required
                  fullWidth
                  label="Caption"
                  value={data.caption}
                  onChange={(e) =>
                    setData({ ...data, caption: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ marginRight: 2, marginBottom: 2 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ marginRight: 2, marginBottom: 2 }}
            onClick={handleSubmit}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
