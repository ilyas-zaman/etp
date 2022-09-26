import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import {useParams} from "react-router"
import { update } from "../../Services/UserService";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();
  
  const { id } = useParams();
   

  const handleSubmit = () => {
    update(username, firstname, lastname, email, password,id)
      .then((response) => navigate("/myprofile"))
      .catch((reason) => {
        let message = "something went wrong";
        if (reason.response.status === 400) {
          message = "Bad request";
        }

        enqueueSnackbar(message, {
          variant: "error",
        });
      });
  };

  return (
    <div className="background">
      <Card
        sx={{
          maxWidth: "50%",
          marginLeft: "25%",
          marginTop: "10%",
          boxShadow: 10,
        }}
      >
       <h1>{id}</h1>
        <CardContent>
          <Typography
            sx={{
              fontSize: 24,
              marginLeft: "45%",
              fontFamily: "inherit",
            }}
            color="#03A4EA"
          >
            UPDATE
          </Typography>
          <form className="text-field">
            <TextField
              id="standard-basic"
              label="Username"
              variant="standard"
              sx={{ width: 600, marginLeft: 4, marginBottom: 4 }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Firstname"
              variant="standard"
              sx={{ width: 600, marginLeft: 4, marginBottom: 4 }}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Lastname"
              variant="standard"
              sx={{ width: 600, marginLeft: 4, marginBottom: 4 }}
              onChange={(e) => setLastname(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              sx={{ width: 600, marginLeft: 4, marginBottom: 4 }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              sx={{ width: 600, marginLeft: 4 }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
        </CardContent>
        <CardActions>
          <form className="button">
            <Button
              style={{ marginLeft: 300, marginBottom: 10 }}
              variant="outlined"
              onClick={handleSubmit}
            >
              Update
            </Button>
          </form>
        </CardActions>
      </Card>
    </div>
  );
};
export default UpdateUser;
