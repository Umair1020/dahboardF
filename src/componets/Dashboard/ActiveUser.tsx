import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import PinnedChatUsers from "./PinnedChatUsers";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


export default function PinnedChatCards(props: any, { chatData }: any) {
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    return (
        <>
            <div style={{ minWidth: "290px", maxWidth: "320px", height: "235px" }}>
                <Box
                    sx={{
                        width: "100%",
                        height: 280,
                        // backgroundColor: "primary.light",
                        borderRadius: "0.4rem",
                        boxShadow: 1,
                        py: 0.5,
                        ":hover": {
                            border: "2px solid",
                            borderColor: "primary.light",
                        },
                    }}
                    maxHeight={280}
                    overflow={"clip"}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            p: 1,
                            m: 1,

                            borderRadius: 1,
                        }}
                    >
                        <Box sx={{ color: "#007EF2" }}>{props.mainIcon}</Box>{" "}
                        <Typography
                            variant="h5"
                            fontSize={16}
                            fontWeight={500}
                            px={3}
                            lineHeight={1.5}
                            fontStyle={"medium"}
                            alignItems={"center"}
                            component="h2"
                        >
                            {props.mainTitle}
                        </Typography>
                    </Box>

                    <List
                        sx={{ width: "100%", maxWidth: 360, marginLeft: "20px" }}
                    >

                        <Stack direction="row" spacing={4}>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar alt="Remy Sharp" src="/Ellipse.png" />
                            </StyledBadge>
                            <p style={{
                                marginTop: "10px", fontFamily: "Poppins"}}>Linda Maxwell</p>
                        </Stack>
                        <br />
                        <Stack direction="row" spacing={4}>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar alt="Remy Sharp" src="/Ellipse2.png" />
                            </StyledBadge>
                            <p style={{
                                marginTop: "10px", fontFamily:  "Poppins" , }}>Amjan Khan</p>
                        </Stack> <br />
                        <Stack direction="row" spacing={4}>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar alt="Remy Sharp" src="/Ellipse3.png" />
                            </StyledBadge>
                            <p style={{
                                marginTop: "10px", fontFamily:
                                    "Poppins"
                            }}>Siri Johnson</p>
                        </Stack>



                        {/* {chatData !== undefined ? (
                            chatData.map((e: any) => <PinnedChatUsers />)
                        ) : (
                            <Typography>No Active Users</Typography>
                        )} */}
                    </List>
                </Box>
            </div>
        </>
    );
}
