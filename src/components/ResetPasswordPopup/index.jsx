import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Grid, TextField, Box, DialogTitle } from "@mui/material";
import models from "../../lib/fetchModelData";
import useToastStore from "../../store/ToastStore";

export default function ResetPasswordPopup({ open, setOpen }) {
  const [data, setData] = useState({});
  const handleClose = () => {
    setOpen(false);
  };
  const { setToast } = useToastStore();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.new_password !== data.confirm_password) {
      alert("Password and Confirm Password must be the same");
      return;
    }
    models.fetchResetPassword(data).then((data) => {
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
            content: "Password updated successfully",
            type: "success",
          });
          setOpen(false);
        }
      }
    });
  };

  return (
    <React.Fragment>
      <Dialog onClose={handleClose} maxWidth="xs" scroll="paper" open={open}>
        <DialogTitle sx={{ textAlign: "center" }}>Reset Password</DialogTitle>
        <DialogContent>
          <Box noValidate sx={{ mt: 3, textAlign: "start" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={data.old_password}
                  onChange={(e) =>
                    setData({ ...data, old_password: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={data.new_password}
                  onChange={(e) =>
                    setData({ ...data, new_password: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={data.confirm_password}
                  onChange={(e) =>
                    setData({ ...data, confirm_password: e.target.value })
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
