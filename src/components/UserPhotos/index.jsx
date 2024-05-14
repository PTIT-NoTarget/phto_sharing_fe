import React, { useEffect } from "react";
import { useState } from "react";
import {
  ImageList,
  Container,
} from "@mui/material";
import { useParams } from "react-router-dom";
import PhotoCard from "../PhotoCard";
import PhotoPopup from "../PhotoPopup";

import models from "../../lib/fetchModelData";
import "./styles.css";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const [userImg, setUserImg] = useState([]);
  const [popup, setPopup] = React.useState(false);
  const [selectedImg, setSelectedImg] = React.useState(null);
  useEffect(() => {
    models.fetchPostListByUser(userId).then((data) => {
      setUserImg(data);
    });
  }, [userId]);

  return (
    <Container>
      <ImageList variant="masonry" cols={1} gap={50}>
        {userImg?.map((item) => (
          <>
            <PhotoCard
              photo={item}
              popup={popup}
              setPopup={setPopup}
              setSelectedImg={setSelectedImg}
              key={item._id}
            />
          </>
        ))}
      </ImageList>
      <PhotoPopup open={popup} setOpen={setPopup} photo={selectedImg} />
    </Container>
  );
}

export default UserPhotos;
