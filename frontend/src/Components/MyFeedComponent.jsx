import {myFeed} from "../Services/EventService";
import { useEffect, useState } from "react";
import { getToken } from "../Services/UserService";
import { Container, Grid } from "@mui/material";
import EventCard from "./Event/EventCard";



const MyFeedComponent = () => {
    const token = getToken()
    const [events, setEvent] = useState();

    useEffect(() => {
       
        myFeed(token).then((response)=>{ 
            setEvent(response.data.events)
            
            console.log(response.data.events);
        })
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

   

  return (
    <div>

     <Container>
            
            <Grid
              container
              spaching={3}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Grid
                style={{
                  width: "550px",
                  height: "300px",
                }}
              >
                  {events?.map((event, i) => {
                     return <EventCard key={i} { ...event }/>
                  })}
                
              </Grid>
            </Grid>
          </Container>
        
    </div>
    
  );
};

export default  MyFeedComponent;
