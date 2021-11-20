import React from 'react';
import Review from './Review';
import { Grid, Typography } from '@mui/material';

export default function Reviews({ reviews }) {

    return (
        <Grid container >
            <Grid container item xs={12} spacing={1}>
                {
                    (!reviews || (typeof products === 'object' && !reviews.length)) ?
                        <Typography variant="subtitle2"> No Tattoos Posted Yet! </Typography>
                        :
                        reviews.map((r) => {
                            if (r.description) {
                                return (
                                    <Grid item xs={12}>
                                        <Review review={r} />
                                    </Grid>
                                )

                            }
                        }


                        )
                }
            </Grid>
        </Grid>
    )
}
