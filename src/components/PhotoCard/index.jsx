import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useUserStore from "../../store/UserStore";
import CommentIcon from "@mui/icons-material/Comment";
import CardActions from "@mui/material/CardActions";
import models from "../../lib/fetchModelData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadPhotoPopup from "../UploadPhotoPopup";

export default function PhotoCard({ popup, setPopup, photo, setSelectedImg }) {
  const [fullName, setFullName] = React.useState("");
  const { otherUser, user, userList } = useUserStore();
  const [favorite, setFavorite] = React.useState(false);
  const [favoriteCount, setFavoriteCount] = React.useState(0);
  const [commentCount, setCommentCount] = React.useState(0);
  const [updatePopup, setUpdatePopup] = React.useState(false);
  React.useEffect(() => {
    if (userList) {
      const user = userList.find((user) => user._id === photo.user_id);
      if (user) {
        setFullName(user.first_name + " " + user.last_name);
      }
    }
    models.fetchFavoriteCheck(photo._id).then((data) => {
      setFavorite(data.isFavorite);
    });
    models.fetchFavoriteCount(photo._id).then((data) => {
      setFavoriteCount(data.count);
    });
    models.fetchCommentCount(photo._id).then((data) => {
      setCommentCount(data.count);
    });
  }, [popup]);

  const handleFavorite = (event) => {
    event.stopPropagation();
    models.fetchFavoriteReact(photo._id).then((data) => {
      models.fetchFavoriteCount(photo._id).then((data) => {
        setFavoriteCount(data.count);
      });
      models.fetchFavoriteCheck(photo._id).then((data) => {
        setFavorite(data.isFavorite);
      });
    });
  };

  const handleComment = () => {
    setPopup(true);
    setSelectedImg(photo);
  };

  const convertDateTimetoString = (date_time) => {
    // hh:mm:ss dd/MM/yyyy
    const date = new Date(date_time);
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();

    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    models.fetchPostDelete(photo._id).then((data) => {
      
    });
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    setUpdatePopup(true);
  };

  return (
    <>
      <Card onClick={handleComment}>
        <CardHeader
          avatar={<Avatar src={otherUser.avatar} />}
          action={
            <>
              {user?._id === photo?.user_id && (
                <>
                  <IconButton aria-label="edit" onClick={handleEdit}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </>
          }
          title={fullName}
          subheader={convertDateTimetoString(photo?.time)}
        />
        <CardMedia component="img" image={photo?.image} alt="Paella dish" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {photo?.caption}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites" onClick={handleFavorite}>
            {favorite ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
            {" " + favoriteCount + " "}
          </IconButton>
          <IconButton aria-label="comment" onClick={handleComment}>
            {<CommentIcon />}
            {" " + commentCount + " "}
          </IconButton>
        </CardActions>
      </Card>
      <UploadPhotoPopup
        open={updatePopup}
        setOpen={setUpdatePopup}
        api={models.fetchPostUpdate}
        photo={photo._id}
      />
    </>
  );
}
