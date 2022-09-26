import React from "react";
import ProfileCard from "../Components/Profile/ProfileCard";
// import EventCard from "../Components/Event/EventCard";
import { Container, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getToken, getUser } from "../Services/UserService";
import axios from "axios";

function ProfilePage() {
  const [users, setUser] = useState([""]);
  const token = getToken();

  useEffect(() => {
    getUser(token).then((response) => {
      setUser(response.data);
      console.log(response.data);
    });

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Container sx={{ maxWidth: 400 }}>
          {users?.map((user, i) => {
            return <ProfileCard key={i} user={user} />;
          })}
          <ProfileCard />
          {/* <Box>
          {
        users?.map((user, i) =>
          <li key={i}>{user.name}</li>
        )
      }
          </Box> */}
        </Container>
        <Container
          sx={{
            display: "flex",
            marginTop: 15,
            direction: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {/* <EventCard /> */}
        </Container>
      </Box>
    </>
  );
}

export default ProfilePage;
