import React from "react";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Grid } from "@mui/material";

import UserList from "../UserList";
import TopBar from "../TopBar";
import UserPhotos from "../UserPhotos";
import Login from "../Login";
import Register from "../Register";
import Profile from "../Profile";
import ToastMessage from "../../lib/ToastMessage";
import useUserStore from "../../store/UserStore";
import { useNavigate } from "react-router-dom";
import UserDetail from "../UserDetail";
import models from "../../lib/fetchModelData";

const AppLayout = () => {
  const { auth, setAuth, setUser } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
      models.fetchUserProfile().then((data) => {
        setUser(data);
      });
    } else {
      setAuth(false);
      navigate("/login");
    }
  }, [auth]);

  return (
    <>
      <TopBar />
      <Grid container spacing={2}>
        {auth && (
          <Grid item xs={3}>
            <UserList />
          </Grid>
        )}
        <Grid item xs={auth ? 9 : 12}>
          <Routes>
            <Route path="/" element={<UserDetail />} />
            <Route path="/photos/:userId" element={<UserPhotos />} />
            <Route path="/login" element={!auth && <Login />} />
            <Route path="/register" element={!auth && <Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Grid>
      </Grid>

      <ToastMessage />
    </>
  );
};

export default AppLayout;
