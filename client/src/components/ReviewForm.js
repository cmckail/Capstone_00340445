import React, { useState, useRef, useEffect } from 'react';
import { Box, Grid, Checkbox, FormControlLabel } from '@mui/material';
import Form from "react-validation/build/form";
import Button from "react-validation/build/button";
import Textarea from "react-validation/build/textarea";
import reviewService from '../services/review.service';
import { Favorite, FavoriteOutlined } from '@mui/icons-material';
import Rating from './Rating';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: 'fit-content',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll',
};

export default function ReviewForm({ handleResult, setOpen, appointment, review = null }) {
    const [favouriteArtist, setFavouriteArtist] = useState(false)
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const form = useRef();
    const checkBtn = useRef();

    useEffect(() => {
        if (review) {
            setRating(review?.rating);
            setDescription(review?.description);
        }
    }, [])


    const handleUpdateReview = (e) => {
        e.preventDefault();
        form.current.validateAll();

        if (description.length > 0 || rating > 0) {
            setMessage("")
            reviewService.updateReview({
                rating, description, id: review.id
            }).then(() => {
                handleResult("success", "Successfully Updated Reviewed!");
            })
                .catch((err) => {
                    handleResult('error', 'Error Updating Review. Please Try Again Later!');

                });
        }
    }

    const handleCreateReview = (e) => {
        e.preventDefault();
        form.current.validateAll();

        if (description.length > 0 || rating > 0) {
            setMessage("")
            reviewService.createReview({
                favourite_artist: favouriteArtist, rating, description, product_id: appointment?.transaction?.product?.id, appointment_id: appointment.id, merchant_id: appointment?.transaction?.product?.merchant_id
            })
                .then(() => {
                    handleResult("success", "Successfully Reviewed!");
                })
                .catch(() => {
                    handleResult('error', 'Error Posting Review. Please Try Again Later!');

                });
        }
        else {
            setMessage("Description or rating must be completed")
        }
    };

    return (
        <Box sx={style} container spacing={1}>
            <h5>Leave a Review</h5>
            <Form onSubmit={review?.id ? handleUpdateReview : handleCreateReview} ref={form}>
                <Grid container>
                    <Grid item sm={12}>
                        <label htmlFor="rating">Description</label>
                        <Rating setValue={setRating} value={rating} />
                    </Grid>
                    <Grid item sm={12}>
                        <FormControlLabel
                            control=
                            {
                                <Checkbox icon={<FavoriteOutlined />} checkedIcon={<Favorite />} onClick={() => setFavouriteArtist(!favouriteArtist)} />
                            }
                            label="Favourite Artist?" />
                    </Grid>
                    <Grid item sm={12}>
                        <label htmlFor="description">Description</label>
                        <Textarea
                            type="text"
                            placeholder="Let Tadoo know how the experience was!"
                            className="form-control"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} style={{ textAlign: 'right' }}>
                        <Button className="btn btn-primary btn-block" ref={checkBtn}>Post</Button>
                        {message && (
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Form>
        </Box >
    );
}