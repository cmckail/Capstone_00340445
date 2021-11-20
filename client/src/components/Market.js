import React from 'react';
import ProductPreview from './ProductPreview';
import { Grid, Typography } from '@mui/material';

export function SearchBar({ handleSearch }) {
    return (
        <></>
    );
}

export default function ProfileMarket({ products }) {

    return (
        <Grid container >
            <Grid container item xs={12} spacing={1}>
                {
                    (!products || (typeof products === 'object' && !products.length)) ?
                        <Typography variant="subtitle2"> No Tattoos Posted Yet! </Typography>
                        :
                        products.map((p) => {
                            if (p?.available) {
                                return (
                                    <Grid item xs={12} sm={6} md={4}>
                                        <ProductPreview product={p} />
                                    </Grid>
                                )

                            } else {
                                return null
                            }
                        }

                        )
                }
            </Grid>
        </Grid>
    )
}
