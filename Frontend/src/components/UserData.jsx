import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import Stories from "./Stories";
import { Divider, unstable_createMuiStrictModeTheme } from "@material-ui/core";

import { connect } from "react-redux";
import { fetchUsers } from "../redux/dataStore";

function UserData({ userData, fetchUsers }) {
  const [open, setOpen] = useState(false);
  const [userIndex, setUserIndex] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleClickOpen = (event) => {
    setUserIndex(event.currentTarget.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(userData);
  return (
    <div className="center">
      <div className="box">
        <h2 className="story">STATUS</h2>
        <div>
          <ListItem>
            <ListItemAvatar>
              <Avatar src="/broken-image.jpg" />
            </ListItemAvatar>
            <ListItemText primary="MY STATUS" />
          </ListItem>
        </div>
        <Divider />
        <List>
          {!userData ? (
            <h2>Loading...</h2>
          ) : (
            userData.map((user, index) => {
              return (
                <ListItem key={index} id={index} onClick={handleClickOpen}>
                  <ListItemAvatar>
                    <Avatar src={user.story[0]} />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                </ListItem>
              );
            })
          )}
        </List>
        <Stories
          open={open}
          handleClose={handleClose}
          user={userData}
          userIndex={userIndex}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.story,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserData);
