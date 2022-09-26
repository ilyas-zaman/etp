import { Button, Box, InputBase } from "@mui/material";
import { getToken, logout } from "../../Services/UserService";
import { useNavigate } from "react-router-dom";
import { AppBar } from "@mui/material";

const NavBar = () => {
let navigate=useNavigate();
const token = getToken();
const handleLogout = (e) => {
  e.preventDefault();
  logout().then(navigate('/login'))
}
const handleNavigate = () =>{
  return navigate('/')
}
  return (
  <AppBar>
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "black",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: 60, 
      }}
    >
      
      <Button sx={{ 
        fontFamily: "Rockwell", 
        fontSize: 25, 
        fontWeight: "bolder", 
        color:"white", 
        marginTop: 1 }} 
        onClick={handleNavigate}  
        >
        CONCERT
      </Button>
      <InputBase
        
        placeholder="Discover..." 
        inputProps={{ "aria-label": "search" }}
        sx={{ border: "1px solid", 
        width: 500, 
        height: 37, 
        borderRadius: 5, 
        color:"white", 
         }}
      />
      {token ? (
        <>
          <Button 
          href="/createvent" 
          variant="outlined"
          sx={{borderRadius: 5}}
          >
            ADD event
          </Button>
          <Button 
          href="/myfeed" 
          variant="outlined" 
          sx={{borderRadius: 5}}
          >
            My Feed
          </Button>
          <Button 
          href="/myprofile" 
          variant="outlined" 
          sx={{borderRadius: 5}}
          >
            My Profile
          </Button>
          <Button 
          onClick={handleLogout} 
          variant="contained" 
          sx={{borderRadius: 5}}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button 
          href="/login" 
          variant="contained" 
          sx={{borderRadius: 5}}
          >
            Login
          </Button>
          <Button 
          href="/register" 
          variant="contained" 
          sx={{borderRadius: 5}}
          >
            Register
          </Button>
        </>
      )}
      
    </Box>
    </AppBar>
  );
};

export default NavBar;
