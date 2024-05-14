import React, { useState, useEffect } from "react";
import { Button, Typography, Avatar, Container } from "@mui/material";
import models from "../../lib/fetchModelData";
import "./styles.css";
import { Link } from "react-router-dom";
import useUserStore from "../../store/UserStore";

/**
 * Define UserDetail, a React component of Project 4.
 */

function UserDetail() {
  const [userInfo, setUserInfo] = useState(null);
  const { auth, otherUser } = useUserStore();
  useEffect(() => {
    if (auth) {
      models.fetchUser(otherUser._id).then((data) => {
        setUserInfo(data);
      });
    }
  }, [otherUser, auth]);

  return (
    <>
      {userInfo && (
        <Container sx={{ margin: 5 }}>
          <Avatar
            src={userInfo?.avatar}
            alt="avatar"
            sx={{ width: 200, height: 200 }}
          />
          <Typography variant="h4">
            Name: {userInfo?.first_name} {userInfo?.last_name}
          </Typography>
          <Typography variant="h6"> Location: {userInfo?.location} </Typography>
          <Typography variant="h6">
            Description: {userInfo?.description}
          </Typography>
          <Typography variant="h6">
            Occupation: {userInfo?.occupation}
          </Typography>
          <Link to={`/photos/${userInfo?._id}`} key={userInfo?._id}>
            <Button variant="contained" color="primary">
              View Photos
            </Button>
          </Link>
        </Container>
      )}
    </>
  );
}

export default UserDetail;
