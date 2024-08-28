import React from 'react';
import { Pagination as MUIPagination } from '@mui/material';

const Pagination = ({ count, page, onChange }) => {
  return (
    <MUIPagination 
      count={count} 
      page={page} 
      onChange={onChange}
      color="primary"
      size="large"
      sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}
    />
  );
};

export default Pagination;