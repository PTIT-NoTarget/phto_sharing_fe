import { styled } from "@mui/material/styles";
import { Avatar, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useUserStore from "../../store/UserStore";
import ReplyIcon from "@mui/icons-material/Reply";
import SendIcon from "@mui/icons-material/Send";
import { Grid, TextField } from "@mui/material";
import models from "../../lib/fetchModelData";

const MyComment = styled("div")({
  display: "flex",
  justifyContent: "start",
  alignContent: "start",
  padding: "5px",
});

const MyContent = styled("div")({
  display: "flex",
  border: "1px solid #ccc",
  width: "100%",
  borderRadius: "5px",
  justifyContent: "space-between",
  alignContent: "end",
  padding: "5px",
  marginLeft: "10px",
});

const MyGrid = styled(Grid)({
  padding: "10px",
  justifyContent: "center",
  alignContent: "center",
});

export default function Comment({ comment }) {
  const { userList, setAuth } = useUserStore();
  const [user, setUser] = useState({});
  const [content, setContent] = useState("");
  const [reply, setReply] = useState(false);
  useEffect(() => {
    const user = userList.find((user) => user._id === comment.user_id);
    setUser(user);
  }, []);

  const handleComment = () => {
    const request = {
      content: content,
      parent_id: comment._id,
      level: comment.level + 1,
    };
    models.fetchCommentAdd(comment.post_id, request).then((data) => {
      comment.children.push(data);
      setAuth(true);
      setContent("");
      setReply(false);
    });
  };

  return (
    <MyComment style={{ marginLeft: 50 * comment.level + "px" }}>
      <Avatar src={user.avatar} style={{ marginRight: "10px" }} />
      <div style={{ width: "100%" }}>
        <MyContent>
          <div>
            <Typography style={{ fontWeight: "bold" }} component="div">
              {user.first_name + " " + user.last_name}
            </Typography>
            <Typography variant="body1">{comment.content}</Typography>
          </div>
          <IconButton
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => setReply(!reply)}
          >
            <ReplyIcon />
          </IconButton>
        </MyContent>
        <MyGrid
          container
          spacing={2}
          style={{ display: reply ? "flex" : "none" }}
        >
          <MyGrid item xs={11}>
            <TextField
              size="small"
              label="Comment"
              variant="outlined"
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </MyGrid>
          <MyGrid item xs={1}>
            <IconButton onClick={handleComment}>
              <SendIcon />
            </IconButton>
          </MyGrid>
        </MyGrid>
      </div>
    </MyComment>
  );
}
