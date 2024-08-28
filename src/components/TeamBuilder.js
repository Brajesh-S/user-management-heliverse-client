//TeamBuilder.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  TextField,
  Snackbar,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  createTeam,
  selectTeamMembers,
  selectTeamError,
  clearTeamError,
  selectCurrentTeam,
} from "../slices/teamSlice";
import { removeFromTeam } from "../slices/teamSlice";

const TeamBuilder = () => {
  const dispatch = useDispatch();
  const teamMembers = useSelector(selectTeamMembers);
  const error = useSelector(selectTeamError);
  const currentTeam = useSelector(selectCurrentTeam);

  const [teamName, setTeamName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (currentTeam) {
      setTeamName("");
    }
  }, [currentTeam]);

  const handleRemoveFromTeam = (userId) => {
    dispatch(removeFromTeam(userId));
  };

  const handleCreateTeam = () => {
    if (teamName.trim() === "") {
      setSnackbarOpen(true);
      return;
    }

    dispatch(
      createTeam({
        name: teamName,
        userIds: teamMembers.map((member) => member.id),
      })
    );
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    dispatch(clearTeamError());
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Team Builder
      </Typography>
      <List>
        {teamMembers.map((member) => (
          <ListItem key={member.id}>
            <ListItemText
              primary={`${member.first_name} ${member.last_name}`}
              secondary={member.domain}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveFromTeam(member.id)}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <TextField
        fullWidth
        label="Team Name"
        variant="outlined"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        sx={{ mt: 2, mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateTeam}
        disabled={teamMembers.length === 0 || teamName.trim() === ""}
        fullWidth
      >
        Create Team
      </Button>
      <Snackbar
        open={snackbarOpen || !!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error || "Please enter a team name"}
      />
    </Paper>
  );
};

export default TeamBuilder;
