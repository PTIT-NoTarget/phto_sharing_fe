import React, { useState, useEffect } from "react";
import { Button, Typography, Avatar, Container } from "@mui/material";
import { Link } from "react-router-dom";
import useUserStore from "../../store/UserStore";
import ResetPasswordPopup from "../ResetPasswordPopup";
import UpdateProfilePopup from "../UpdateProfilePopup";
import UploadPhotoPopup from "../UploadPhotoPopup";
import models from "../../lib/fetchModelData";

export default function Profile() {
  const { user, setOtherUser } = useUserStore();
  const [resetPasswordPopup, setResetPasswordPopup] = useState(false);
  const [updateProfilePopup, setUpdateProfilePopup] = useState(false);
  const [uploadPhotoPopup, setUploadPhotoPopup] = useState(false);

  useEffect(() => {
    setOtherUser(user);
  }, []);

  return (
    <Container sx={{ margin: 5 }}>
      <Avatar
        src={user?.avatar}
        alt="avatar"
        sx={{ width: 200, height: 200 }}
      />
      <Typography variant="h4">
        Name: {user?.first_name} {user?.last_name}
      </Typography>
      <Typography variant="h6"> Location: {user?.location} </Typography>
      <Typography variant="h6">Description: {user?.description}</Typography>
      <Typography variant="h6">Occupation: {user?.occupation}</Typography>
      <Link to={`/photos/${user?._id}`} key={user?._id}>
        <Button variant="contained" color="primary" sx={{ margin: 1 }}>
          View Photos
        </Button>
      </Link>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setUploadPhotoPopup(true)}
        sx={{ margin: 1 }}
      >
        Upload Photo
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setResetPasswordPopup(true)}
        sx={{ margin: 1 }}
      >
        Reset Password
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setUpdateProfilePopup(true)}
        sx={{ margin: 1 }}
      >
        Update Profile
      </Button>
      <ResetPasswordPopup
        open={resetPasswordPopup}
        setOpen={setResetPasswordPopup}
      />
      <UpdateProfilePopup
        open={updateProfilePopup}
        setOpen={setUpdateProfilePopup}
      />
      <UploadPhotoPopup
        open={uploadPhotoPopup}
        setOpen={setUploadPhotoPopup}
        api={models.fetchPostAdd}
      />
    </Container>
  );
}
