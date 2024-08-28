import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Paper, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { fetchTeam, selectAllTeams } from '../slices/teamSlice';

const CreatedTeams = () => {
  const dispatch = useDispatch();
  const teams = useSelector(selectAllTeams);

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Created Teams
      </Typography>
      <List>
        {teams.map((team) => (
          <ListItem key={team.id}>
            <ListItemText primary={team.name} />
            <Button component={Link} to={`/team/${team.id}`} color="primary">
              View
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CreatedTeams;