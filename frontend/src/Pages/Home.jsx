import HomePicture from "../Images/HomePicture.jpg"
import {Box} from "@mui/material"


const Home = () => {

  return (
    <Box sx={{
      marginLeft: -1, 
      marginRight: "-10px",
      
      
    }}>
     <img
     width="100%" 
     src={HomePicture} alt="" 
     />
    </Box>
  );
};

export default Home;
