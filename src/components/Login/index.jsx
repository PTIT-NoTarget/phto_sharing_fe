import { Box, Button, Typography, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import models from "../../lib/fetchModelData";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToastStore from "../../store/ToastStore";
import useUserStore from "../../store/UserStore";

function Login() {
  const navigate = useNavigate();
  const { setToast } = useToastStore();
  const { setAuth } = useUserStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginData = {
      username: username.trim(),
      password: password.trim(),
    };
    models.fetchLogin(loginData).then((data) => {
      if (data) {
        setToast({
          show: true,
          content: "Login successful",
          type: "success",
        });
        localStorage.setItem("token", data.token);
        setAuth(true);
        navigate("/");
      }
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
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
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          fontFamily={"cursive"}
          fontSize={30}
        >
          Photos sharing
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1, textAlign: "start" }}>
          <TextField
            required
            type="text"
            name="username"
            label="Username"
            fullWidth
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            required
            type="password"
            name="password"
            label="Password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign in
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
export default Login;
