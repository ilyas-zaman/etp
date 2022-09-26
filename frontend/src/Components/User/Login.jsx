import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { login } from "../../Services/UserService";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();

  const handleSubmit = () => {
    login(username, password)
      .then((response) => navigate("/myprofile"))
      .catch((reason) => {
        let message = "something went wrong";
        if (reason.response.status === 404) {
          message = "Invalid username";
        } else if (reason.response.status === 401) {
          message = "Invalid password";
        }

        enqueueSnackbar(message, {
          variant: "error",
        });
      });
  };

  return (
    <Card
      sx={{
        maxWidth: "50%",
        marginLeft: "25%",
        marginTop: "10%",
        boxShadow: 10,
      }}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: 24,
            marginLeft: "45%",
            fontFamily: "inherit",
          }}
          color="#03A4EA"
        >
          Login
        </Typography>
        <form className="text-field">
          <TextField
            label="Username"
            variant="standard"
            sx={{ width: 600, marginLeft: 4, marginBottom: 4 }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="standard"
            // type="password"
            sx={{ width: 600, marginLeft: 4 }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
      </CardContent>
      <CardActions>
        <form className="button">
          <Button
            style={{ marginLeft: 5 }}
            variant="outlined"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </form>
      </CardActions>
    </Card>
  );
};

export default Login;
