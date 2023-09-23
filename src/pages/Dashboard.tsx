import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DashboardCard from "../componets/DashboardCard";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import PushPinIcon from "@mui/icons-material/PushPin";
import ArchiveIcon from "@mui/icons-material/Archive";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { PinnedChats, getRecentChats } from "../features/get_messagesSlice";
import { useEffect, useState } from "react";
import PinnedChatCards from "../componets/Dashboard/PinnedChatCards";
import ActiveUser from "../componets/Dashboard/ActiveUser"
import ArchiveChat from "../componets/Dashboard/ArchiveChat"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [recentChats, setRecentChats] = useState([]);
  const [pinnedChats, setPinnedChats] = useState([]);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    getRecentChat();
    getPinChat();
  }, []);

  const getRecentChat = async () => {
    await dispatch(getRecentChats({})).then((onResolved: any) => {
      if (onResolved.payload !== "error") {
        setRecentChats(onResolved.payload);
        // console.log(recentChats);
      }
    });
  };
  const getPinChat = async () => {
    await dispatch(PinnedChats({})).then((onResolved: any) => {
      if (onResolved.payload !== "error") {
        setPinnedChats(onResolved.payload);
        console.log('hello', onResolved.payload);
      }
    });
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            gap={"20px"}
            py={"20px"}
          >
            <DashboardCard
              mainTitle="Active Users"
              chatData={recentChats}
              mainIcon={<RecentActorsIcon />}
            />

            <ActiveUser
              mainTitle="Active Users"
              chatData={pinnedChats}
              mainIcon={<AirplanemodeActiveIcon />}
            />

            <PinnedChatCards
              mainTitle="Pinned Chats"
              chatData={pinnedChats}
              mainIcon={<PushPinIcon />}
            />

            <ArchiveChat
              mainTitle="Archive Chats"
              chatData={pinnedChats}
              mainIcon={<ArchiveIcon />}
            />
          </Box>
          <Grid container mt={2} spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: 280,
                  height: 400,
                  // backgroundColor: "primary.light",
                  borderRadius: "0.8rem",
                }}
              >
                <Doughnut data={data} />;
              </Box>
            </Grid>
            <Grid item xs={6} p={5.5}>
              <Box
                sx={{
                  height: 400,
                  // backgroundColor: "primary.light",
                  borderRadius: "0.8rem",
                  // border: "2px solid",
                }}
              >
                <Line data={lineData} />
              </Box>
            </Grid>
          </Grid>
        </Grid>{" "}
      </Grid>
    </>
  );
};

export default Dashboard;
