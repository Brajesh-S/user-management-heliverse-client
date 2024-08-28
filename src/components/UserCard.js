import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';

const UserCard = ({ user, onAddToTeam }) => {
  return (
    <Card sx={{ maxWidth: 345,  display: 'flex', flexDirection: 'column', height: 390,padding:'1%' }}>
      <CardMedia
        component="img"
        height="140"
        image={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
      />
      <CardContent sx={{ flex: 1, overflow: 'auto' ,display: 'flex', flexDirection: 'column',justifyContent:'center', marginPadding:'3px'}}>
        <Typography gutterBottom variant="h5" component="div">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography  sx={{display:'flex',  textWrap: 'pretty', flexDirection: 'row', padding:'2%',textOverflow: 'ellipsis', }} variant="body2" color="text.secondary">
          {user.email}
        </Typography>
        <Chip label={user.domain} color="primary" sx={{ mt: 1, padding:'1%' }} />
        <Chip label={user.gender} color="secondary" sx={{ mt: 1, ml: 1 }} />
        <Chip label={user.available ? "Available" : "Unavailable"} color={user.available ? "success" : "error"} sx={{ mt: 1, ml: 1 }} />
        <IconButton sx={{bottom:'-3%'}}onClick={() => onAddToTeam(user)} color="primary" disabled={!user.available}>
          <Add />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default UserCard;
