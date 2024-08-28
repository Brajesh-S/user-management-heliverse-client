
// TeamSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createTeam = createAsyncThunk(
  'team/createTeam',
  async ({ name, userIds }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/team', { name, userIds });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch all teams
export const fetchTeams = createAsyncThunk(
  'team/fetchTeams',
  async () => {
    const response = await axios.get('http://localhost:3000/api/team'); // Make sure this endpoint returns all teams
    return response.data;
  }
);

// Fetch a specific team by ID
export const fetchTeam = createAsyncThunk(
  'team/fetchTeam',
  async (teamId) => {
    const response = await axios.get(`http://localhost:3000/api/team/${teamId}`);
    return response.data;
  }
);

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    teamMembers: [],
    currentTeam: null,
    allTeams: [],  // Added to store all teams
    status: 'idle',
    error: null
  },
  reducers: {
    addToTeam: (state, action) => {
      if (!state.teamMembers.find(member => member.id === action.payload.id)) {
        state.teamMembers.push(action.payload);
      }
    },
    removeFromTeam: (state, action) => {
      state.teamMembers = state.teamMembers.filter(member => member.id !== action.payload);
    },
    clearTeamError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentTeam = action.payload;
        state.teamMembers = [];
        state.error = null;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
      .addCase(fetchTeams.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allTeams = action.payload;  // Set all teams in state
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTeam.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentTeam = action.payload;
      })
      .addCase(fetchTeam.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addToTeam, removeFromTeam, clearTeamError } = teamSlice.actions;
export const selectTeamMembers = (state) => state.team.teamMembers;
export const selectCurrentTeam = (state) => state.team.currentTeam;
export const selectTeamError = (state) => state.team.error;
export const selectAllTeams = (state) => state.team.allTeams;
export const selectTeamStatus = (state) => state.team.status;
export default teamSlice.reducer;
