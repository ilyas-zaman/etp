import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { getToken } from "../../Services/UserService";
import { postEvent } from "../../Services/EventService";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

/*const bull = (
    <Box
        component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
        •
    </Box>
);
*/
const CreateEvent = () => {
  const [name, setName] = useState("");
  const [beginingDate, setBeginingDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [adress, setAdress] = useState("");
  const [confidentiality, setConfidentiality] = useState("");
  const [tag, setTag] = useState("");
  const [minimalAge, setMinimalAge] = useState("");
  const [seats, setSeats] = useState();
  const token = getToken();
  const { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();

  const handleSubmit = () => {
    postEvent(
      name,
      beginingDate,
      endDate,
      adress,
      confidentiality,
      tag,
      minimalAge,
      seats,
      token
    )
    console.log("hello")
      .then(
        (response) =>
          enqueueSnackbar("Your event is created", {
            variant: "success",
          }),
        navigate("/myprofile")
      )
      .catch((reason) => {
        let message = "something went wrong";
        if (reason.response.status === 401) {
          message = "You must be logged in to create";
        }

        enqueueSnackbar(message, {
          variant: "error",
        });
      });
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Create an event
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="Name"
              required
              id="Name"
              label="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name=""
              required
              type="date"
              id="BeginningDate"
              label="BeginingDate"
              autoFocus
              onChange={(e) => setBeginingDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name=""
              type="date"
              required
              id="EndDate"
              label="EndDate"
              autoFocus
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name=""
              required
              id="Adress"
              label="Adress"
              autoFocus
              onChange={(e) => setAdress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name=""
              required
              id="Confidentiality"
              label="Confidentiality"
              autoFocus
              onChange={(e) => setConfidentiality(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name=""
              required
              id="Tag"
              label="Tag"
              autoFocus
              onChange={(e) => setTag(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name=""
              required
              id="Minimal Age"
              label="Minimal Age"
              autoFocus
              onChange={(e) => setMinimalAge(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name=""
              type="number"
              required
              id="Seats"
              label="Seats"
              autoFocus
              onChange={(e) => setSeats(e.target.value)}
            />
          </Grid>
          <Button
            href = "/myprofile"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Create
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};
export default CreateEvent;
