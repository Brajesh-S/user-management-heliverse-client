import React from "react";
import { Grid } from "@mui/material";
import UserCard from "./UserCard";

const UserList = ({ users, onAddToTeam }) => {
  return (
    <Grid container spacing={2}>
      {users.map((user) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
          <UserCard user={user} onAddToTeam={onAddToTeam} />
        </Grid>
      ))}
    </Grid>
  );
};

export default UserList;
