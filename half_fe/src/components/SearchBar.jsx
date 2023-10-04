// src/components/SearchBar.js
import { useState } from 'react';
//import TextField from '@material-ui/core/TextField';


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
      <input 
      placeholder="Search anything you want"
      style={{ 
        width: '',
        margin: '2px',
        border: '1px solid #000',
      }}
      value={searchQuery}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
      />
      {/* <TextField
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

      /> */}
    </div>
  );
};

export default SearchBar;
