import React, { useState, useRef, useEffect } from 'react';
import Input from "react-validation/build/input";
import { Modal, Button, Box, Grid } from '@mui/material';
import Form from "react-validation/build/form";
import VButton from "react-validation/build/button";
import Textarea from "react-validation/build/textarea";
import {
    isRequired,
} from '../common/Validators';
import productService from '../services/product.service';
import CategorySelect from './CategorySelect';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll',
};

export default function ProductModal({ updateToast }) {

    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [isPhotoPicked, setIsPhotoPicked] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [photoValid, setPhotoValid] = useState(false);
    const [photoValidText, setPhotoValidText] = useState("");
    const [name, setName] = useState("");
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [category_id, setCategory] = useState(null);
    const [suitable_text, setSuitableText] = useState("");
    const [rate, setRate] = useState("");
    const [min_hours, setMinHours] = useState("");
    const [max_hours, setMaxHours] = useState("");
    const [deposit, setDeposit] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const form = useRef();
    const checkBtn = useRef();

    useEffect(() => {
        if (!open) {
            setPhotoPreview(null)
            setIsPhotoPicked(false)
            setPhotoValid(false)
            setName("")
            setHeight("")
            setWidth("")
            setSuitableText("")
            setRate("")
            setMinHours("")
            setMaxHours("")
            setDeposit("")

        }
    }, [open])
    const handleCreateTattoo = (e) => {
        e.preventDefault();


        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0 && (photoValid || !isPhotoPicked)) {
            productService.createProduct({
                selectedFile, name, height, width, category_id, suitable_text,
                rate, min_hours, max_hours, deposit
            })
                .then(() => {
                    updateToast("success", "Successfully Added Tattoo!");
                    setOpen(false);
                })
                .catch(() => {
                    updateToast('error', 'Error in Creating Tattoo. Please Try Again Later!');
                });
        }
    };

    const onChangePhoto = (event) => {
        const photo = event.target.files[0];
        if (Boolean(!photo.type.includes("image/"))) {
            setPhotoValid(false);
            setPhotoValidText('File must be an Image');
        } else if (photo.size > 31457280) {
            setPhotoValid(false);
            setPhotoValidText('Photo must be less then 30MB.');
        } else {
            setPhotoValid(true);
            setSelectedFile(photo);
            setPhotoPreview(URL.createObjectURL(event.target.files[0]))
            setIsPhotoPicked(true);
        }

    };

    return (
        <div>
            <Button onClick={handleOpen}>Create Tattoo +</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style} container spacing={1}>
                    <Form onSubmit={handleCreateTattoo} ref={form}>
                        <Grid container spacing={1}>
                            <Grid item sm={12}>
                                <div style={{ margin: 'auto', textAlign: 'center' }}>
                                    <img alt="tattoo preview" style={{ width: '50%' }} src={photoPreview || "https://www.medstartr.com/main/images/no-image.png"} />
                                </div>
                                <label htmlFor="file">image</label>
                                <input className="form-control" type="file" name="file" accept="image/*" onChange={onChangePhoto} />
                                {isPhotoPicked && !photoValid && (
                                    (
                                        <div className="alert alert-danger" role="alert">
                                            {photoValidText}
                                        </div>
                                    )
                                )}

                            </Grid>
                            <Grid item sm={12}>
                                <label htmlFor="name">Name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    validations={[isRequired]}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <label htmlFor="suitable_for">Recommended Placement</label>
                                <Textarea
                                    type="text"
                                    placeholder="Arm or Thigh....."
                                    className="form-control"
                                    name="suitable_for"
                                    value={suitable_text}
                                    onChange={(e) => setSuitableText(e.target.value)}
                                    validations={[isRequired]}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <CategorySelect handleChange={setCategory} />
                            </Grid>
                            <Grid item sm={12} md={4}>
                                <label htmlFor="height">Height (cm)</label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    name="Height"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    validations={[isRequired]}
                                />
                            </Grid>
                            <Grid item sm={12} md={4}>
                                <label htmlFor="width">Width (cm)</label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    name="width"
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                    validations={[isRequired]}
                                />
                            </Grid>
                            <Grid item sm={12} md={4}>
                                <label htmlFor="min_hours">Min Hours</label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    name="min_hours"
                                    value={min_hours}
                                    onChange={(e) => setMinHours(e.target.value)}
                                    validations={[isRequired]}
                                />
                            </Grid>
                            <Grid item sm={12} md={4}>
                                <label htmlFor="max_hours">Max Hours</label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    name="max_hours"
                                    value={max_hours}
                                    onChange={(e) => setMaxHours(e.target.value)}
                                    validations={[isRequired]}
                                />
                            </Grid>
                            <Grid item sm={12} md={4}>
                                <label htmlFor="desposit">Deposit ($)</label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    name="deposit"
                                    value={deposit}
                                    onChange={(e) => setDeposit(e.target.value)}
                                    validations={[isRequired]}
                                />
                            </Grid>
                            <Grid item sm={12} md={4}>
                                <label htmlFor="rate">Hourly Rate ($)</label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    name="rate"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    validations={[isRequired]}
                                />
                            </Grid>

                            <Grid item xs={12} style={{ textAlign: 'right' }}>
                                <div className="form-group">
                                    <VButton className="btn btn-primary btn-block" ref={checkBtn}>Create +</VButton>
                                </div>
                            </Grid>
                        </Grid>
                    </Form>
                </Box>
            </Modal>
        </div >
    );
}