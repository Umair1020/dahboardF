import {
  Avatar,
  Badge,
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography,
  Menu,
  Checkbox,
  Collapse,
  Paper,
  InputBase,
} from "@mui/material";
import { useEffect, useState } from "react";
import ChatScreen from "./ChatScreen";
import "../../App.css";
import FilterListIcon from "@mui/icons-material/FilterList";
import ChatLabel from "./ChatLabel";
import MenuItem from "@mui/material/MenuItem";
import RestorePageIcon from "@mui/icons-material/RestorePage";
import ChatSearch from "./ChatSearch";
import logo from "../../assets/Images/logo4.svg";
import { socket } from "../../App";
import { useDispatch } from "react-redux";
import { readChat } from "../../features/get_messagesSlice";
import ChatListBody from "./ChatListBody";
import SearchIcon from "@mui/icons-material/Search";
import { CircularLoading } from "../utils/CircularBar";
import ChatBotUi from "./ChatBotUi";

const ConversationsList = ({ data, sendSkipBack, isEnd }: any) => {
  const [chatCount, setChatCount] = useState(-1);
  const [chatData, setChatData] = useState(data);
  const [tagCollapse, settagCollapse] = useState(false);
  const [mediumCollapse, setmediumCollapse] = useState(false);
  const [activated, setActivated] = useState(false);
  // const [isRead, setIsRead] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<any>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setChatData(data);
  }, [data]);

  const FilterMenu = () => {
    const lables = JSON.parse(localStorage.getItem("label") ?? "");

    const HandleFilterMedium: any = (medium: string) => {
      const filterChat = chatData.filter(
        (e: any) => e.recievingMedium === medium
      );

      setChatData(filterChat);
    };

    const HandleFilterLabel: any = (label: string) => {
      const filterChat = chatData.filter((e: any) => e.labels === label);

      setChatData(filterChat);
    };

    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Divider /> */}
        <MenuItem onClick={() => settagCollapse(!tagCollapse)}>
          <ListItemText>Tags</ListItemText>
          <Collapse in={tagCollapse} timeout="auto" unmountOnExit>
            {lables.map((e: string) => (
              <MenuItem key={e}>
                <Checkbox
                  onChange={() => {
                    HandleFilterLabel(e);
                  }}
                />
                <ListItemText>{e}</ListItemText>
              </MenuItem>
            ))}
          </Collapse>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setmediumCollapse(!mediumCollapse)}>
          <ListItemText>Medium</ListItemText>
        </MenuItem>
        <Collapse in={mediumCollapse} timeout="auto" unmountOnExit>
          <MenuItem>
            <Checkbox
              onChange={() => {
                HandleFilterMedium("facebook");
              }}
            />
            <ListItemText>Facebook</ListItemText>
          </MenuItem>
          <MenuItem>
            <Checkbox
              onChange={() => {
                HandleFilterMedium("gmail");
              }}
            />
            <ListItemText>Gmail</ListItemText>
          </MenuItem>
          <MenuItem>
            <Checkbox
              onChange={() => {
                HandleFilterMedium("Iinstagram");
              }}
            />
            <ListItemText>Instagram</ListItemText>
          </MenuItem>
          <MenuItem>
            <Checkbox
              onChange={() => {
                HandleFilterMedium("outlook");
              }}
            />
            <ListItemText>Outlook</ListItemText>
          </MenuItem>
          <MenuItem>
            <Checkbox
              onChange={() => {
                HandleFilterMedium("whatsapp");
              }}
            />
            <ListItemText>WhatsApp</ListItemText>
          </MenuItem>
        </Collapse>
        <MenuItem
          onClick={() => {
            setChatData(data);
          }}
        >
          <RestorePageIcon /> Clear
        </MenuItem>
      </Menu>
    );
  };

  const handleScroll = (e: any) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop >= scrollHeight * 0.9) {
      sendSkipBack(chatData?.length);
    }
  };

  const handleRead: any = (chatId: String, isRead: any) => {
    if (!isRead) {
      dispatch(
        readChat({
          chatId,
        })
      ).then((onResolved: any) => {
        if (onResolved.payload === "true") {
        }
      });
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        // gap={"10px"}
        columnSpacing={2}
        sx={{
          width: "100%",
          maxHeight: "85vh",
          height: "100vh",
          zIndex: 1,
          borderRadius: "0.5rem",
          boxShadow: 3,
          overflowX: "clip",
          background: "#F0F2F5",
          marginTop: 1,
        }}
      >
           {/* ////////////////// */}
           <ChatBotUi />
             {/* ////////////////// */}
        <Grid
          item
          xs={3.5}

          sx={{
            height: "100%",
            position : "relative",
            backgroundColor: "white",
            overflowY: "scroll",
            // display: "flex",
            "&::-webkit-scrollbar": {
              width: "0px",
              visibility: "hidden",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
            },
            borderRight: "8px solid #F0F2F5",
            overflowX: "clip",
          }}
          onScroll={handleScroll}
        >
       
          <Box
            sx={{
              display: "flex",
              // flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              height: "60px",
              p: 1,
            }}
          >
            {/* <Typography
              variant="h5"
              gutterBottom
              sx={{ textDecoration: "underline", border : "1px solid black" }}
              color="text.primary"
            >
              Messages
            </Typography> */}
            <Typography
              gutterBottom
              fontSize={"20px"}
              fontWeight={"bolder"}
              color={"#1E2D4C"}
              sx={{ textDecoration: "underline" }}
            >
              Messages
            </Typography>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <FilterListIcon />
            </IconButton>

            <FilterMenu />
          </Box>
          {/* <ChatSearch chatData={chatData} /> */}

          <Box p={" 0px 20px 0px 8px"}>
            <Paper
              component="form"
              sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
            }}
          >
            {chatData.map((e: any, index: number) => (
              <div key={e._id}>
                {e.message[0] !== undefined && e !== undefined && (
                  <Box
                    onClick={() => {
                      setChatCount(index);
                      socket.emit("addUser", e.userSpecificId);
                      handleRead(e._id, e.isRead);
                      setActivated(true);
                    }}
                  >
                    <ChatListBody e={e} />
                  </Box>
                )}
              </div>
            ))}
          </List>
          
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularLoading />
          </Box>
          
        </Grid>
        
        <Grid
          item
          xs={8.5}
          sx={{
            maxHeight: "100vh",
            backgroundColor: "white",
            borderLeft: "8px solid #F0F2F5",
          }}
        >
          {chatCount !== -1 ? (
            <ChatScreen
              Chatdata={chatData[chatCount]}
              chatNumber={chatCount}
              currentUserID={
                chatData.length !== 0 && chatData[chatCount].userSpecificId
              }
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                my: "auto",
                maxHeight: "85vh",
                height: "100vh",
              }}
            >
              <img src={logo} alt="Convo Portal" />
            </Box>
          
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ConversationsList;
