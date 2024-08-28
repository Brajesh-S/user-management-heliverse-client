//Filters.js
import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

const Filters = ({
  domains,
  genders,
  availabilities,
  selectedFilters,
  onFilterChange,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Domain</InputLabel>
        <Select
          value={selectedFilters.domains}
          onChange={(e) => onFilterChange("domains", e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {domains.map((domain) => (
            <MenuItem key={domain} value={domain}>
              {domain}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Gender</InputLabel>
        <Select
          value={selectedFilters.genders}
          onChange={(e) => onFilterChange("genders", e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {genders.map((gender) => (
            <MenuItem key={gender} value={gender}>
              {gender}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Availability</InputLabel>
        <Select
          value={selectedFilters.availability}
          onChange={(e) => onFilterChange("availability", e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">Available</MenuItem>
          <MenuItem value="false">Unavailable</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;
