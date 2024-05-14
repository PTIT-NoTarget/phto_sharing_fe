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

export default function UpdateProfilePopup({ open, setOpen }) {
  const [data, setData] = useState({});
  const {user, setUser } = useUserStore();
  const { setToast } = useToastStore();
  const handleSubmit = (event) => {
    event.preventDefault();
    const UpdateData = {
      first_name: data.first_name.trim(),
      last_name: data.last_name.trim(),
      location: data.location.trim(),
      occupation: data.occupation.trim(),
      description: data.description.trim(),
      avatar: data.avatar,
    };
    models.fetchUserUpdate(UpdateData).then((data) => {
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
            content: "Profile updated successfully",
            type: "success",
          });
          setOpen(false);
          setUser(data);
          setData(data);
        }
      }
    }).catch((error) => {
      setToast({
        show: true,
        content: error.message,
        type: "error",
      });
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      setData({...user});
    }
  }, [open]);

  return (
    <React.Fragment>
      <Dialog onClose={handleClose} maxWidth="xs" scroll="paper" open={open}>
      <DialogTitle sx={{ textAlign: "center" }}>Update Profile</DialogTitle>
        <DialogContent>
          <Box noValidate sx={{ mt: 3, textAlign: "start" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Avatar</Typography>
                <TextField
                  type="file"
                  required
                  fullWidth
                  name="avatar"
                  onChange={(e) =>
                    setData({ ...data, avatar: e.target.files[0] })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  label="First Name"
                  autoFocus
                  value={data.first_name}
                  onChange={(e) =>
                    setData({ ...data, first_name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={data.last_name}
                  onChange={(e) => setData({ ...data, last_name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Location"
                  name="location"
                  value={data.location}
                  onChange={(e) => setData({ ...data, location: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Occupation"
                  name="occupation"
                  value={data.occupation}
                  onChange={(e) =>
                    setData({ ...data, occupation: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Description"
                  name="description"
                  value={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
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
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
