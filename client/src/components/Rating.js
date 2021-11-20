import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Rating, Box } from '@mui/material';
// Ratings Code from Material UI 
// https://mui.com/components/rating/
const labels = {
    0.5: 'Bad',
    1: 'Bad+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

export default function HoverRating({ setValue, value, readOnly = false }) {
    const [hover, setHover] = useState(-1);

    return (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Rating
                readOnly={readOnly}
                name="hover-feedback"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </Box>
    );
}