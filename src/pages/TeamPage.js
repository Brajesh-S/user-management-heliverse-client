import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  fetchTeam,
  selectCurrentTeam,
  selectTeamStatus,
} from "../slices/teamSlice";

const TeamPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const team = useSelector(selectCurrentTeam);
  const status = useSelector(selectTeamStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchTeam(id));
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return (
      <Container
        maxWidth="md"
        sx={{ display: "flex", justifyContent: "center", mt: 4 }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!team) {
    return (
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          Team not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Team Details:
        <span style={{ fontWeight: "300", fontSize: "28px" }}>
          {" "}
          {team.name}{" "}
        </span>
      </Typography>
      <Grid container spacing={2}>
        {team.users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginTop: 2,
                }}
                image={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
              />
              <CardContent
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  maxHeight: 150,
                  textAlign: "center",
                  width: "100%",
                  padding: "16px",
                  "&::-webkit-scrollbar": { width: "0.4em" },

                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb:hover": { background: "#555" },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {user.first_name} {user.last_name}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  <span style={{ fontWeight: "600" }}>Email: </span>
                  {user.email}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  <span style={{ fontWeight: "600" }}>Gender: </span>
                  {user.gender}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  <span style={{ fontWeight: "600" }}>Domain: </span>
                  {user.domain}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  <span style={{ fontWeight: "600" }}>Available: </span>
                  {user.available ? "Yes" : "No"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TeamPage;
