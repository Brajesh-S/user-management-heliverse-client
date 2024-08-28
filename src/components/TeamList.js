// TeamList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';  // Change useHistory to useNavigate
import { Grid, Card, CardContent, Typography, Button, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { fetchTeams, selectAllTeams } from '../slices/teamSlice';

const TeamList = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Change useHistory to useNavigate
  const teams = useSelector(selectAllTeams) || [];

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleViewDetails = (teamId) => {
    navigate(`/team/${teamId}`);  // Change history.push to navigate
    onClose();
  };

  return (
    <>
      <DialogTitle>
        All Teams
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {teams.map((team) => (
            <Grid item xs={12} sm={6} md={4} key={team.id}>
              <Card sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <CardContent>
                  <Typography variant="h6">{team.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Members: {team.users.length}
                  </Typography>
                  <Button onClick={() => handleViewDetails(team.id)} sx={{marginLeft: '-8px'}}>View Details</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </>
  );
};

export default TeamList;
