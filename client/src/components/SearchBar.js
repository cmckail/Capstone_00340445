import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

//SearchBar component based on MUI Example
//https://material.io/design/navigation/search.html#persistent-search
// https://smartdevpreneur.com/the-easiest-way-to-implement-material-ui-table-search/
export default function SearchBar({ onSearch }) {
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(value);
    }

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Marketplace"
                inputProps={{ 'aria-label': 'Search Tattoos' }}
                value={value}
                onChange={(e) => setValue(e.target.value)}

            />
            <IconButton sx={{ p: '10px' }}
                aria-label="search"
                onClick={handleSubmit}
            >
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>
    )
}
