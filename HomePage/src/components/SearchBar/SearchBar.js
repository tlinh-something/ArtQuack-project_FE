// src/components/SearchBar.js
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <TextField
        label="Search anything you want"
        variant="outlined"
        size="medium"
        fullWidth
        style={{ 
          width: '400px',
          
        }}
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        // InputProps={{
        //   endAdornment: (
        //     <IconButton onClick={handleSearch}>
        //       <SearchIcon />
        //     </IconButton>
        //   ),
        // }}
      />
    </div>
  );
};

export default SearchBar;
