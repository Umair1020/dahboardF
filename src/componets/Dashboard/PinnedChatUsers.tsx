import React from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

export default function PinnedChatUsers() {
  return (
    <>
      <ListItem alignItems="center" sx={{ gap: "10px" }}>
        <Avatar alt="Remy Sharp" src="" />
        <ListItemText
          sx={{ fontWeight: "bolder" }}
          primary="Brunch this weekend?"
        />
      </ListItem>
    </>
  );
}
