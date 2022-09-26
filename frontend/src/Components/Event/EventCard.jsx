import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";


export default function EventCard({id, name, beginingDate, endDate, seats, minimalAge, tag, confidentiality, adress}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        sx={{ marginLeft: 5 }}
        title={name}
        
      />
      <Typography>Start: {endDate}</Typography>
        <Typography>End: {beginingDate}</Typography>
      <CardContent sx={{ marginLeft: 5 }}>
        <Typography>Adresse: {adress}</Typography>
        <Typography sx={{ marginTop: 2 }}>Age:{minimalAge}</Typography>
        <Typography sx={{ marginTop: 2 }}>Confidentiality: {confidentiality}</Typography>
        <Typography sx={{ marginTop: 2 }}>Tag:{tag}</Typography>
        <Typography sx={{ marginTop: 2 }}>number of seats: {seats}</Typography>
      </CardContent>
      <CardActions sx={{ marginLeft: 5 }} disableSpacing>
        <IconButton aria-label="add to favorites">
        </IconButton>
        <IconButton sx={{ marginLeft: 6 }} aria-label="share">
          
        </IconButton>
      </CardActions>
    </Card>
  );
}
