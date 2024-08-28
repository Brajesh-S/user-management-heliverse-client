// import React from 'react';
// import { FormControl, InputLabel, Select, MenuItem, Chip, Box } from '@mui/material';

// const Filters = ({ domains, genders, availabilities, selectedFilters, onFilterChange }) => {
//   return (
//     <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
//       <FormControl fullWidth>
//         <InputLabel>Domain</InputLabel>
//         <Select
//           multiple
//           value={selectedFilters.domains}
//           onChange={(e) => onFilterChange('domains', e.target.value)}
//           renderValue={(selected) => (
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//               {selected.map((value) => (
//                 <Chip key={value} label={value} />
//               ))}
//             </Box>
//           )}
//         >
//           {domains.map((domain) => (
//             <MenuItem key={domain} value={domain}>
//               {domain}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth>
//         <InputLabel>Gender</InputLabel>
//         <Select
//           multiple
//           value={selectedFilters.genders}
//           onChange={(e) => onFilterChange('genders', e.target.value)}
//           renderValue={(selected) => (
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//               {selected.map((value) => (
//                 <Chip key={value} label={value} />
//               ))}
//             </Box>
//           )}
//         >
//           {genders.map((gender) => (
//             <MenuItem key={gender} value={gender}>
//               {gender}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth>
//         <InputLabel>Availability</InputLabel>
//         <Select
//           value={selectedFilters.availability}
//           onChange={(e) => onFilterChange('availability', e.target.value)}
//         >
//           <MenuItem value="">All</MenuItem>
//           <MenuItem value="true">Available</MenuItem>
//           <MenuItem value="false">Unavailable</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// };

// export default Filters;
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Chip, Box } from '@mui/material';

const Filters = ({ domains, genders, availabilities, selectedFilters, onFilterChange }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Domain</InputLabel>
        <Select
          multiple
          value={selectedFilters.domains}
          onChange={(e) => onFilterChange('domains', e.target.value)}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
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
          multiple
          value={selectedFilters.genders}
          onChange={(e) => onFilterChange('genders', e.target.value)}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
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
          onChange={(e) => onFilterChange('availability', e.target.value)}
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


