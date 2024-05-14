import React from "react";
import { Box, Button, Typography, Container, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import models from "../../lib/fetchModelData";
import { useState } from "react";
import useToastStore from "../../store/ToastStore";
import { useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({});
  const { setToast } = useToastStore();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.password !== data.confirmPassword) {
      setToast({
        show: true,
        content: "Passwords do not match",
        type: "error",
      });
      return;
    }
    const SignUpData = {
      first_name: data.firstName.trim(),
      last_name: data.lastName.trim(),
      location: data.location.trim(),
      occupation: data.occupation.trim(),
      description: data.description.trim(),
      username: data.username.trim(),
      password: data.password.trim(),
      avatar: data.avatar,
    };
    if (data.checked) {
      models.fetchRegister(SignUpData)
      .then((data) => {
        if (data) {
          if(data.message){
            setToast({
              show: true,
              content: data.message,
              type: "error",
            });
          }else{
            setToast({
              show: true,
              content: "Account created successfully",
              type: "success",
            });
            navigate("/login");
          }
        }
      })
      .catch((error) => {
        setToast({
          show: true,
          content: error.message,
          type: "error",
        });
      });
    }else{
      setToast({
        show: true,
        content: "Please agree to the terms and conditions",
        type: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: 3,
          borderRadius: 5,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom fontSize={30}>
          Create an account
        </Typography>
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
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Username"
                name="username"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
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
                value={data.confirmPassword}
                onChange={(e) =>
                  setData({ ...data, confirmPassword: e.target.value })
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
                value={data.firstName}
                onChange={(e) =>
                  setData({ ...data, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={data.lastName}
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
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
            <Grid item xs={12}>
              <FormControlLabel
                checked={data.checked}
                onChange={(e) =>
                  setData({ ...data, checked: e.target.checked })
                }
                control={<Checkbox value="checkRobot" color="primary" />}
                label="I agree to the terms and conditions"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
export default Register;
