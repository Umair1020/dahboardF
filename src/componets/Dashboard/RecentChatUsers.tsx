import React from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

export default function RecentChatUsers(data: any) {
  let time = data.message[0].receiveTime;
  time = new Date(time);
  time = `${time.getHours()} : ${time.getMinutes()}`;
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar sx={{ height: "26px" }}>
          <Avatar alt="Remy Sharp" src="" />
        </ListItemAvatar>
        <ListItemText
          sx={{ fontWeight: "500", maxWidth: "64%" }}
          primary={
            data !== undefined && data.message[0] !== undefined
              ? `${
                  data.message[0].contact.name ?? data.message[0].contact.from
                }`.length > 16
                ? `${
                    data.message[0].contact.name ?? data.message[0].contact.from
                  }`.substring(0, 16) + "..."
                : `${
                    data.message[0].contact.name ?? data.message[0].contact.from
                  }`
              : "Loading"
          }
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="#000000"
                fontSize={"13px"}
              >
                {((data.message[0] !== undefined &&
                  data.message[data.message.length - 1].media.message) ??
                data.message[data.message.length - 1].media.emailMsg.subject
                  .length > 16
                  ? data.message[data.message.length - 1].media.emailMsg.subject
                  : "Loading"
                ).length > 22
                  ? `${
                      data.message[data.message.length - 1].media.emailMsg
                        .subject
                    }`.substring(0, 22) + "...."
                  : `${
                      data.message[data.message.length - 1].media.emailMsg
                        .subject
                    }`}
              </Typography>
            </>
          }
        />
        <Typography component={"span"} sx={{ fontSize: "13px" }} mt={"5px"}>
          {time}
        </Typography>
      </ListItem>
    </>
  );
}
