import { Card} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Box, Grid, CardActions } from "@mui/material";
import {Link} from 'react-router-dom'

const ProfileCard = (user) => {

  return (
    <Box sx={{ marginLeft: 8 }}>
      <Grid sx={{ marginTop: 3, marginLeft: 80 }}>My PROFIL</Grid>
      <Card sx={{ minHeight: 400, maxWidth: 300, marginTop: 8 }}>
        <CardContent sx={{ marginLeft: 5 }}>
          <Typography sx={{ marginTop: 4 }} gutterBottom variant="h5">
            Gokhane {user._id}
          </Typography>
          <Typography sx={{ marginTop: 6 }}></Typography>
          <Typography sx={{ marginTop: 4 }}>Lastname</Typography>
          <Typography sx={{ marginTop: 4 }}>Email</Typography>
        </CardContent>

        <CardActions sx={{ marginLeft: 5, marginTop: 5 }}>
          <Link to={"/userupdate" + user.id}>
          <Button size="small" color="success">
            Update
          </Button>
          </Link>
          <Box sx={{ marginLeft: 8 }}>
            <Button size="small" color="error">
              Delete
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
export default ProfileCard;
