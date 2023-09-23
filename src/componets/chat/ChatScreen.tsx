import {
  Avatar,
  IconButton,
  Input,
  InputBase,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SendIcon from "@mui/icons-material/Send";
import Message from "./ChatMessage";
import {
  sendgmail,
  sendMeta,
  sendOutlook,
} from "../../features/send_messageSlice";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EmailMessge from "./EmailMessge";

import { socket } from "../../App";
import {
  PinnedChats,
  getConverstaions,
  gmailChat,
  metaChat,
  outlookChat,
} from "../../features/get_messagesSlice";
import getCookieValue from "../utils/getCookie";
import MoreModel from "./MoreModel";
import { TbPinnedFilled } from "react-icons/tb";
import notification from "../../Toast";
const { DateTime } = require('luxon');

const ChatScreen = ({ Chatdata, chatNumber, currentUserID }: any) => {
  // socket.on("getWebhook", (notificationData: any) => {
  //   // console.log("johnny ");
  // });
  const [data, setData] = useState(Chatdata);
  const [media, setMedia] = useState<any | null>(null);
  const [input, setInput] = useState("");
  const [showBottomSheet, setshowBottomSheet] = useState(false);
  const [pinnedChats, setPinnedChats] = useState("");
  // let ischage: number = 0;
  const dispatch = useDispatch<any>();
  let recievingMediumCheck: string;

  useEffect(() => {
    setData(Chatdata);
    PinChat();
  }, [chatNumber]);

  const handleClickPinned = async () => {
    await dispatch(PinnedChats({ chatid: Chatdata._id })).then(
      (onResolved: any) => {
        if (onResolved.payload !== "error") {
          if (onResolved.payload.errors) {
            notification("error", onResolved.payload.errors[0].message);
          } else {
            setPinnedChats(onResolved.payload);
          }
        }
      }
    );
  };

  // useEffect(() => {
  //   console.log(data);
  //   setData(data);
  //   ischage--;
  // }, [ischage === 1, data]);
  async function PinChat() {
    await dispatch(PinnedChats({ chatid: Chatdata._id })).then(
      (onResolved: any) => {
        if (onResolved.payload !== "error") {
          if (onResolved.payload.errors) {
          } else {
            setPinnedChats(onResolved.payload);
          }
        }
      }
    );
  }
  // console.log("hello", pinnedChats);

  socket.on("getWebhook", async (notificationData: any) => {
    // console.log(`Received notification: ${JSON.stringify(notificationData)}`);
    // console.log(notificationData);
    if (currentUserID.toString() === notificationData.convid.toString()) {
      const updatedData = {
        ...data,
        message: [
          ...data.message,
          {
            media: {
              emailMsg: {
                body: notificationData.media.emailMsg.body,
                subject: "",
              },
            },
            contact: { from: "" },
            receiveTime: notificationData.contact.receiveTime,
          },
        ],
      };

      setData(updatedData);
    }
  });

  recievingMediumCheck =
    Chatdata !== undefined ? Chatdata.recievingMedium : null;

  const handleSubmit = (recievingMedium: string) => async (e: any) => {
    e.preventDefault();

    await data.message.push({
      cmpId: "am001",
      contact: {
        name: "deep_._2000",
        from: "5757916874329391",
        to: Array(1),
        cc: Array(0),
      },
      conversationsId: "641063123f27faf8b03ee9e2",
      isRead: false,
      media: {
        document: [],
        image: null,
        message: input,
        msgId:
          "aWdfZAG1faXRlbToxOklHTWVzc2FnZAUlEOjE3ODQxNDU2OTg2ODUxOTE3OjM0MDI4MjM2Njg0MTcxMDMwMDk0OTEyODE3MDY0MTIzNzk2ODQ4OTozMDg1MDY0MTAyNTQ5OTgyNDM5MDgyMTgyOTU5MTE3MTA3MgZDZD",
        video: null,
      },
      receiveTime: new Date(Date.now()).toString(),
      recievingMedium: recievingMedium,
    });
    try {
      switch (recievingMedium) {
        case "gmail":
          const to = (
            data !== undefined && data.message[0].contact.from.toString()
          ).match(/<(.*?)>/);
          await dispatch(
            sendgmail({
              to: to[1],
              subject:
                data !== undefined && data.message[0].media.emailMsg.subject,
              body: input,
              replyTo: to[1],
              mediaPath: media,
            })
          ).then(async (onResolved: any) => {
            if (onResolved.payload === 200) {
            }
            setData(data);
          });
          break;
        case "messenger":
          const sameRecipient: any = () => {
            let index: number = 0;
            if (
              data.message[index].contact.from === getCookieValue("facebookid")
            ) {
              index++;
              sameRecipient(data.message[index].contact.from);
            }
            return data.message[index].contact.from;
          };
          const recipientId: string =
            data !== undefined && sameRecipient(data.message[0].contact.from);

          await dispatch(sendMeta({ messageInp: input, recipientId })).then(
            (onResolved: any) => {
              setData(data);
            },
            (onRejected: any) => {
              // console.log(onRejected);
            }
          );
          break;
        case "outlook":
          await dispatch(
            sendOutlook({
              to: data !== undefined && data.message[0].contact.from.toString(),
              subject:
                data !== undefined && data.message[0].media.emailMsg.subject,
              body: input,
              replyTo:
                data !== undefined && data.message[0].contact.from.toString(),
              mediaPath: media,
            })
          ).then((onResolved: any) => {
            if (onResolved.payload === 200) {
              setData(data);
            }
            // setData([...data]);
          });
          break;
      }

      setInput("");
    } catch (err) {
      // console.log(err);
    }

    // await setData(Chatdata);
  };

  const handleRefesh = () => {
    switch (recievingMediumCheck) {
      case "gmail":
        dispatch(gmailChat({})).then((onResolved: any) => {
          if (onResolved.payload !== "error") {
            dispatch(getConverstaions({})).then((onResolved: any) => {
              if (onResolved.payload !== "error") {
                setData(onResolved.payload[chatNumber]);
              }
            });
          }
        });
        break;
      case "messenger":
        dispatch(metaChat({ msgPlatform: "messenger" })).then(
          (onResolved: any) => {
            if (onResolved.payload !== "error") {
              dispatch(getConverstaions({})).then((onResolved: any) => {
                if (onResolved.payload !== "error") {
                  setData(onResolved.payload[chatNumber]);
                }
              });
            }
          }
        );
        break;
      case "outlook":
        dispatch(outlookChat({})).then((onResolved: any) => {
          if (onResolved.payload !== "error") {
            dispatch(getConverstaions({})).then((onResolved: any) => {
              if (onResolved.payload !== "error") {
                setData(onResolved.payload[chatNumber]);
              }
            });
          }
        });
        break;
    }
  };

//   const specificDate = DateTime.fromISO(data?.message[0]?.receiveTime);
//   const now = DateTime.now();
// const diff = now.diff(specificDate, ['days', 'hours', 'minutes', 'seconds', "years"]).toObject();
// const daysSince = Math.floor(diff.days);
// const hoursSince = Math.floor(diff.hours);
// const minutesSince = Math.floor(diff.minutes);
// const secondsSince = Math.floor(diff.seconds);
const receivedDate = DateTime.fromISO(data?.message[0]?.receiveTime);
const now = DateTime.now().toUTC();
const diff = now.diff(receivedDate, ['years', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject();

// Format the difference as a human-readable string
let timeAgo = '';
if (diff.years) {
  timeAgo = `${diff.years} year${diff.years > 1 ? 's' : ''}`;
} else if (diff.months) {
  timeAgo = `${diff.months} month${diff.months > 1 ? 's' : ''}`;
} else if (diff.days) {
  timeAgo = `${diff.days} day${diff.days > 1 ? 's' : ''}`;
} else if (diff.hours) {
  timeAgo = `${diff.hours} hour${diff.hours > 1 ? 's' : ''}`;
} else if (diff.minutes) {
  timeAgo = `${diff.minutes} minute${diff.minutes > 1 ? 's' : ''}`;
} else {
  timeAgo = `${diff.seconds} second${diff.seconds > 1 ? 's' : ''}`;
}


  return (
    <Box
      key={data._id}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 1,
        marginRight: 2,
      }}
      // border={"1px solid black"}
    >
      <Box
        sx={{
          flexGrow: 0.3,
          minHeight: 70,
          maxHeight: 70,
          backgroundColor: "background.paper",
          marginBottom: 1,
        }}
        // borderBottom={"1px solid gray"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          sx={{
            display: "flex",
            p: 1,
            borderRadius: 1,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          width={"100%"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar sx={{ height: "26px" }}>
                <Avatar alt="Remy Sharp" src="" />
              </ListItemAvatar>
              <ListItemText
                sx={{ fontWeight: "500" }}
                primary={
                  data !== undefined && data.message[0] !== undefined
                    ? data.message[0].contact.name ??
                      data.message[0].contact.from
                    : "Loading"
                }
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.gray"
                      fontSize={"13px"}
                    >
                      {timeAgo} ago
                    </Typography>
                  </>
                }
              />
            </ListItem>

            {/* <Typography variant="h5" gutterBottom mb={3} color="text.primary">
            {data !== undefined && data.message[0] !== undefined
              ? data.message[0].contact.name ?? data.message[0].contact.from
              : "Loading"}
          </Typography> */}
          </Box>
          <hr />
          {/* secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="#000000"
                    fontSize={"13px"}
                  >
                   Pls Approve this design its tou...
                  </Typography>
                </React.Fragment>
              } */}

          <Box
            sx={{
              flexGrow: 1,
            }}
          />
          {/* ////////////////////////////////////////////////////////////////////////////////// */}
          {pinnedChats === "Chat Pinned" ? (
            <IconButton sx={{ mt: 2 }} onClick={handleClickPinned}>
              <TbPinnedFilled />
            </IconButton>
          ) : (
            ""
          )}

          <IconButton
            aria-label="refresh"
            sx={{ mt: 2 }}
            onClick={handleRefesh}
          >
            <RefreshIcon />
          </IconButton>
          {/* ///////////////////////// */}
          {/* <IconButton aria-label="menu" sx={{ mt: 2 }}>
            <MoreVertIcon />
          </IconButton> */}
          <MoreModel />
          {/* ///////////////////////// */}
        </Box>
      </Box>
      <Box
        sx={{
          borderTop: "1px solid gray",
          paddingTop: "10px",
          flexGrow: 8,
          backgroundColor: "background.paper",
          minHeight: showBottomSheet ? "55vh" : "60vh",
          maxHeight: showBottomSheet ? "55vh" : "60vh",
          overflowY: "auto",
        }}
      >
        {data !== undefined ? (
          data.message.map((e: any, index: number) => {
            // // console.log(
            //   getCookieValue("facebookname"),
            //   data.message[index].contact.name
            // );

            const isOwn: Boolean =
              e.recievingMedium === "whatsapp"
                ? false
                : e.recievingMedium === "messenger"
                ? getCookieValue("facebookname") ===
                  data.message[index].contact.name
                : e.recievingMedium === "instagram"
                ? false
                : e.recievingMedium === "gmail"
                ? getCookieValue("gmailname") ===
                  (Array.isArray(
                    data.message[index].contact.from.toString().match(/<(.*?)>/)
                  )
                    ? data.message[index].contact.from
                        .toString()
                        .match(/<(.*?)>/)[1]
                        .toString()
                    : data.message[index].contact.from
                        .toString()
                        .match(/<(.*?)>/))
                : getCookieValue("outlookname") ===
                  data.message[index].contact.from;

            return e.recievingMedium === "whatsapp" ||
              e.recievingMedium === "messenger" ? (
              <Message
                key={index}
                message={e.media.message ?? null}
                own={isOwn}
                image={e.media.image}
                video={e.media.video}
                document={e.media.document}
              />
            ) : (
              <EmailMessge
                key={index}
                message={e.media.emailMsg}
                own={isOwn}
                image={null}
                video={null}
                document={null}
              />
            );
          })
        ) : (
          <></>
        )}
      </Box>

      {/* <Box
        sx={{
          // flexGrow: 0.3,
          minHeight: 40,
          maxHeight: 40,
          backgroundColor: "background.paper",
          display: showBottomSheet ? "flex" : "none",
          // marginBottom: 1,
        }}
      >
        <Typography variant="subtitle2" gutterBottom color="text.primary">
          to:{" "}
          {data !== undefined && data.recievingMedium === "gmail"
            ? Array.isArray(
                data.message[0].contact.from.toString().match(/<(.*?)>/)
              )
              ? data.message[0].contact.from.toString().match(/<(.*?)>/)[1]
              : data.message[0].contact.from.toString().match(/<(.*?)>/)
            : data.message[0].contact.from.toString()}{" "}
        </Typography>
        <Typography variant="subtitle2" gutterBottom color="text.primary">
          subject:{" "}
          {data !== undefined && data.message[0].media.emailMsg.subject}
        </Typography>
      </Box> */}

      <Box mt={2} px={"20px"}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            // mt: 2,
            display: "flex",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#F4F5F7",
            // border : "1px solid black",
            // marginRight : "20px"
          }}
        >
          <InputLabel
            htmlFor="file-input"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AttachFileIcon sx={{ cursor: "pointer", color: "#90A0B7" }} />
          </InputLabel>
          <Input
            id="file-input"
            type="file"
            sx={{ display: "none" }}
            inputProps={{ multiple: true }}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              const file: File = (target.files as FileList)[0];
              // console.log(file);

              setMedia(file);
            }}
          />

          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Message"
            inputProps={{ "aria-label": "search google maps" }}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            value={input}
          />
          <IconButton
            type="submit"
            sx={{ p: "10px", color: "#007EF2", position : "relative", zIndex : 1 }}
            aria-label="search"
            onClick={handleSubmit(recievingMediumCheck)}
          >
            <SendIcon />
          </IconButton>
          {/* <IconButton
          size="small"
          onClick={() => {
            setshowBottomSheet(!showBottomSheet);
          }}
        >
          <KeyboardArrowDownIcon />
        </IconButton> */}
        </Paper>
      </Box>
    </Box>
  );
};

export default ChatScreen;
