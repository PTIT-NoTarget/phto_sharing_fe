import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import "./styles.css";
import models from "../../lib/fetchModelData";
import useUserStore from "../../store/UserStore";
import { useNavigate } from "react-router-dom";

function UserList() {
  const {auth, user, setUserList, setOtherUser} = useUserStore();
  const [userList, setUserLists] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if(auth && user) {
      models.fetchUserList().then((data) => {
        setUserLists(data.filter((u) => u._id !== user._id));
        setUserList(data);
      });
    }
  }, [auth, user]);

  return (
    <div>
      <List component="nav">
        {userList?.map((u) => (
          <React.Fragment key={u._id}>
            <ListItem sx={{ textDecoration: 'none' , fontFamily:"monospace"}}>
              <ListItemButton 
                onClick={() => {
                  setOtherUser(u);
                  navigate("/");
                }}
                sx={{ textDecoration: 'none', fontFamily:"monospace" }}
              >
                <ListItemAvatar>
                  <Avatar alt="" src={u.avatar} />
                </ListItemAvatar>
                <ListItemText 
                  primary={u.first_name + " " + u.last_name} 
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
