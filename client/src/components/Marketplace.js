import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material';
import {
    useLocation,
    useHistory,
} from "react-router-dom";
import ProductPreview from './ProductPreview';
import productService from '../services/product.service';
import SearchBar from './SearchBar';
import useQuery from '../common/useQuery';

export default function Marketplace() {
    const [products, setProducts] = useState([]);
    const [fetched, setFetched] = useState(false)
    let query = useQuery();
    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        if (!fetched) {
            let search = query.get('search');
            if (!search) {
                search = " "
            }
            productService.searchProducts(`search=${search}`)
                .then((p) => setProducts(p))
                .then(() => setFetched(true))
        }


    }, [fetched])

    const updateSearch = (value) => {
        const params = new URLSearchParams({ search: value });
        history.replace({ pathname: location.pathname, search: params.toString() });
        setFetched(false);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs>
                <SearchBar onSearch={updateSearch} />
            </Grid>
            <Grid container item xs={12} spacing={1}>
                {
                    // query.get('search')
                    (!products || (typeof products === 'object' && !products.length)) ?
                        <Typography variant="subtitle2"> No Results Found! </Typography>
                        :
                        products.map((p) =>
                            <Grid key={p?.id} item xs={12} sm={6} md={4}>
                                <ProductPreview key={`Product-${p?.id}`} product={p} />
                            </Grid>
                        )
                }
            </Grid>
        </Grid>
    )
}
