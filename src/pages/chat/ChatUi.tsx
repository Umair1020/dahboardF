// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ConversationsList from "../../componets/chat/ConversationsList";
import {
  getConverstaions,
  gmailChat,
  outlookChat,
} from "../../features/get_messagesSlice";
import ChatSearch from "../../componets/chat/ChatSearch";
import InternetError from "../../componets/InternetError";
import { socket } from "../../App";
import ChatLoader from "../../componets/chat/ChatLoader";
import { Box } from "@mui/material";

const Chatui = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { isLoading } = useSelector((state: any) => state.chat);
  const dispatch = useDispatch<any>();
  const [conversations, setConversations] = useState<any>();
  const [skip, setSkip] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [recvingSocketMeiumn, setRecvingSocketMeiumn] =
    useState<String>("undefined");
  useEffect(() => {
    getConversation(skip);

    // dispatch(metaChat({ msgPlatform: "messenger" }));
  }, [skip]);

  const getConversation = async (skip: number) => {
    await dispatch(getConverstaions({ skip })).then((onResolved: any) => {
      console.log(onResolved.payload);

      if (onResolved.payload !== "error") {
        if (onResolved.payload?.length === 0) {
          setIsEnd(true);
          return;
        }
        if (conversations !== undefined) {
          setConversations([...conversations, ...onResolved.payload]);
        } else {
          setConversations(onResolved.payload);
        }
      }
    });
  };

  const getMessage = async (recievingMedium: String) => {
    switch (recievingMedium) {
      case "datanm mnmnm":
        dispatch(gmailChat({})).then((onResolved: any) => {
          console.log(onResolved.payload);

          if (onResolved.payload !== "error") {
            getConversation(0);
          }
        });
        break;
      case "outlook":
        dispatch(outlookChat({})).then((onResolved: any) => {
          if (onResolved.payload !== "error") {
            getConversation(0);
          }
        });
        break;
    }
  };
  // useEffect(() => {
  //   getConversation();
  // }, [user !== null && user._id]);
  socket.on("ConvListWebhook", (notificationData: any) => {
    console.log(notificationData);
    // setConversations([...conversations, notificationData]);
    // setTimeout(() => {
    // }, 5000);

    setRecvingSocketMeiumn(notificationData.toString());
  });

  useEffect(() => {
    getMessage(recvingSocketMeiumn ?? "outlook");
    setRecvingSocketMeiumn("undefined");
  }, [recvingSocketMeiumn !== "undefined"]);

  const sendSkipBack = (message: number) => {
    setSkip(message);
  };
  return (
    <>
      {conversations !== undefined ? (
        <ConversationsList
          data={conversations}
          sendSkipBack={sendSkipBack}
          isEnd={isEnd}
        />
      ) : isLoading ? (
        <ChatLoader />
      ) : (
        <InternetError />
      )}
    </>
  );
};

export default Chatui;
