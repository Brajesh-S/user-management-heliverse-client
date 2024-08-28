// //Home.js

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Button,
  Dialog,
  Box,
  Paper,
} from "@mui/material";
import UserList from "../components/UserList";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import TeamBuilder from "../components/TeamBuilder";
import TeamList from "../components/TeamList";
import { fetchUsers, selectUsers, selectTotalPages } from "../slices/userSlice";
import { addToTeam, selectTeamMembers } from "../slices/teamSlice";

const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const totalPages = useSelector(selectTotalPages);
  const teamMembers = useSelector(selectTeamMembers);

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    domains: "",
    genders: "",
    availability: "",
  });

  const [openTeamList, setOpenTeamList] = useState(false);

  const handleOpenTeamList = () => {
    setOpenTeamList(true);
  };

  const handleCloseTeamList = () => {
    setOpenTeamList(false);
  };

  useEffect(() => {
    dispatch(
      fetchUsers({
        page,
        searchTerm,
        domains: filters.domains ? [filters.domains] : [],
        genders: filters.genders ? [filters.genders] : [],
        availability: filters.availability,
      })
    );
  }, [dispatch, page, searchTerm, filters]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setPage(1);
  };

  const handleAddToTeam = (user) => {
    dispatch(addToTeam(user));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        User Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenTeamList}
        sx={{ mb: 2 }}
      >
        View Teams
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
          <Filters
            domains={[
              "IT",
              "Sales",
              "Marketing",
              "Business Development",
              "Finance",
              "UI Designing",
              "Management",
            ]}
            genders={["Male", "Female"]}
            availabilities={[true, false]}
            selectedFilters={filters}
            onFilterChange={handleFilterChange}
          />
          <UserList users={users} onAddToTeam={handleAddToTeam} />
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              position: "sticky",
              top: "20px",
              maxHeight: "calc(100vh - 40px)",
              overflowY: "auto",
            }}
          >
            <Paper elevation={0} sx={{ p: 2, mt: 2 }}>
              <TeamBuilder />
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth="md"
        open={openTeamList}
        onClose={handleCloseTeamList}
      >
        <TeamList onClose={handleCloseTeamList} />
      </Dialog>
    </Container>
  );
};

export default Home;
