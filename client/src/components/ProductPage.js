import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Grid, Typography, Paper, Avatar, Button, styled } from '@mui/material';
import productService from '../services/product.service';
import BaseModal from './BaseModal';
import { ParseJSON } from '../common/ParseJSON';
import ProductActionForm from './ProductActionForm';
import Toast from './Toast'

const InfoContainer = styled('div')({
    padding: '10px 5px',
})

const InfoTitle = styled('p')({
    fontWeight: '500',
    fontSize: 'large',
})

const ModalContainer = styled(Grid)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    border: '2px solid #000',
    background: "White",
    padding: '10px',
    justifyContent: 'end',
});

export default function ProductPage() {
    const { id } = useParams();
    const [isMerchant, setIsMerchant] = useState(false);
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState();
    const [fetched, setFetched] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [severity, setSeverity] = useState("success");
    const [toastMsg, setToastMsg] = useState("");
    const history = useHistory();
    let productImage = ParseJSON(product?.image);
    let merchantPic = ParseJSON(product?.user?.profile_picture);

    useEffect(() => {
        if (!fetched) {

            productService.getProduct(id)
                .then((p) => p)
                .then((p) => {
                    if (p.message) {
                        setError(true);
                        setErrorMsg("Error Loading product");
                    }
                    else {
                        setProduct(p);
                        let user = JSON.parse(localStorage.getItem("user"));
                        if (user?.id === p?.user?.id) {
                            setIsMerchant(true);
                        }

                    }
                    setFetched(true)
                })
                .catch((err) => {
                    setError(true);
                    setErrorMsg("Error Loading product");
                })
        }
    }, [fetched])

    const onUpdate = () => {
        setSeverity("success");
        setToastMsg("Tattoo Info Updated!");
        setOpenUpdate(false);
        setOpenToast(true);
        setFetched(false)
    };

    const onError = () => {
        setSeverity("error");
        setToastMsg("Error Updating Tattoo");
        setOpenUpdate(false);
        setOpenToast(true);
    };

    const handleDelete = () => {
        productService.deleteProduct(product?.id)
            .then(() => {
                history.goBack();
            })
            .catch((err) => {
                setOpenDelete(false);
                setSeverity("error");
                setToastMsg("Error Deleting Tattoo");

            })
    }

    const createCheckout = () => {
        productService.createCheckoutSession(product)
            .then((d) => window.open(d.url, "_self"))

    }

    if (error) {
        return (
            <>
                <Typography>
                    {`${errorMsg} please try again later!`}
                </Typography>
            </>
        )
    }

    return (
        <>
            <BaseModal open={openUpdate} handleClose={() => setOpenUpdate(false)}>
                <ProductActionForm onError={onError} onAction={onUpdate} tattooImage={productImage} product={product} isUpdate={true} />
            </BaseModal>
            <BaseModal open={openDelete} handleClose={() => setOpenDelete(false)}>
                <ModalContainer container>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Delete Tattoo
                        </Typography>
                        <Typography>are you sure you want to delete {product?.name}?
                            Once complete there is no way currently to retrieve the tattoo.
                            Appointments with this design will still be functional.
                        </Typography>
                    </Grid >
                    <Grid item>
                        <Button variant="contained" onClick={() => setOpenDelete(false)}>Cancel</Button>
                        <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
                    </Grid>
                </ModalContainer>

            </BaseModal>
            <Grid sx={{ paddingTop: '30px' }} container spacing={1}>
                <Grid
                    item
                    sm={12}
                    md={6}
                    sx={{ overflow: "hidden", width: '100%' }}
                >
                    <img
                        style={{ textAlign: "center" }}
                        src={productImage?.medium?.url || productImage?.url || 'https://www.medstartr.com/main/images/no-image.png'}
                        alt={product.name || "default image"}
                    />
                </Grid>
                <Grid item sm={12}
                    md={6}>
                    <Paper elevation={3} sx={{ padding: "10px" }}>
                        <Grid container item>
                            <Grid item xs={2} sx={{ paddingLeft: '10px' }}>
                                <Avatar
                                    sx={{ width: '60px', height: '60px' }}
                                    src={merchantPic?.thumb?.url || "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"}
                                />

                            </Grid>
                            <Grid item xs={10} sx={{ paddingTop: '5px', paddingBottom: '20px' }}>
                                <Typography variant="subtitle1">
                                    {`${product?.user?.first_name} ${product?.user?.last_name}`}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary">
                                    {`@${product?.user?.username}`}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="h5">{product?.available ? product.name : "UNAVAILABLE"}</Typography>
                        <Typography variant="h6" color="text.secondary">{`$${product.deposit} CAD Deposit`}</Typography>
                        <InfoContainer >
                            <Button
                                disabled={!product?.available}
                                variant="contained"
                                sx={{ width: '100%', padding: '10px 0' }}
                                onClick={isMerchant ? () => { setOpenUpdate(true) } : createCheckout}
                            >
                                {isMerchant ? "Update" : "Order"}
                            </Button>
                            {
                                isMerchant &&
                                <Button
                                    variant="contained"
                                    color="error"
                                    sx={{ width: '100%', padding: '10px 0' }}
                                    onClick={() => setOpenDelete(true)}
                                >
                                    Delete Tattoo
                                </Button>
                            }
                        </InfoContainer>

                        <InfoContainer>
                            <InfoTitle>Size</InfoTitle>
                            <Typography variant='subtitle2'>
                                {`${product?.width}cm x ${product?.height}cm`}
                            </Typography>
                        </InfoContainer>
                        <InfoContainer>
                            <InfoTitle>Total Hours</InfoTitle>
                            <Typography variant='subtitle2'>
                                {`${product?.min_hours} to ${product?.max_hours} 
                            ($${product?.min_hours * product?.rate} - $${product?.max_hours * product?.rate})`}
                            </Typography>
                        </InfoContainer>
                        <InfoContainer>
                            <InfoTitle>Suitable For</InfoTitle>
                            <Typography variant='subtitle2'>
                                {product?.suitable_text}
                            </Typography>
                        </InfoContainer>

                        <InfoContainer>
                            <InfoTitle>Location</InfoTitle>
                            <Typography variant='subtitle2'>
                                {`${product?.user?.city}, ${product?.user?.province}`}
                            </Typography>
                        </InfoContainer>
                        <InfoContainer>
                            <InfoTitle>Artist Appointment Policy</InfoTitle>
                            <Typography variant='subtitle2'>
                                {product?.user?.appointment_policy}
                            </Typography>
                        </InfoContainer>

                    </Paper>
                </Grid>
                <Toast open={openToast} setOpen={setOpenToast} severity={severity} msg={toastMsg} />

            </Grid >
        </>
    )
}
