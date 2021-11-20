import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { styled, Typography, Box, Button, Paper } from '@mui/material';
import { capitalize } from "../common/capitalize"
import BaseModal from './BaseModal';
import ReviewForm from './ReviewForm';
import { ParseJSON } from '../common/ParseJSON';

const Container = styled(Box)({
    display: 'flex',
    marginBottom: "5px",
    border: '1px solid black',
});

const InfoContainer = styled(Box)({
    backgroundColor: 'white',
    padding: '10px',
    width: '100%',
    alignSelf: 'center'
});

const ButtonContainer = styled(Box)({
    padding: '10px',
    width: 'fit-content',
    textAlign: 'right',
    border: '1px solid black'
});

const ButtonRight = styled(Button)({
    display: 'block',
    textAlign: 'center',
    width: '100%',
    marginBottom: '5px'
});

const Invoice = styled(Paper)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    backgroundColor: 'white',
    border: '2px solid #000',
    padding: '10px',
    boxShadow: 24,
    p: 4,
});

const Img = styled('img')({
    margin: 'auto',
    width: '100%',
    height: '300px',
    objectFit: 'contain',
});

export default function AppointmentInfo({ appointment, updateToast }) {

    const [openReview, setOpenReview] = useState(false);
    const [openInvoice, setOpenInvoice] = useState(false);
    const history = useHistory();
    const status = appointment?.booked ? "Booked" : "Not Booked";
    const product = appointment?.transaction?.product;
    const productImage = ParseJSON(product?.image);
    const merchant = product?.user;
    const review = appointment?.appointmentReview
    const handleCloseReviewForm = (sev, msg) => {
        updateToast(sev, msg);
        setOpenReview(false);
    }

    const onClickContact = () => history.push(`/profile/${merchant?.username}`);
    return (
        <Container>
            <BaseModal open={openReview} handleClose={() => setOpenReview(false)}>
                <ReviewForm review={review?.id ? review : null} appointment={appointment} handleResult={handleCloseReviewForm} setOpen={setOpenReview} />
            </BaseModal>
            <BaseModal open={openInvoice} handleClose={() => setOpenInvoice(false)}>
                <Invoice >
                    <Img src={productImage?.url} />
                    <Typography><strong>Tattoo:</strong>{` ${appointment?.transaction?.product?.name}`}</Typography>
                    <Typography><strong>Deposit:</strong>{` $${appointment?.transaction?.amount / 100} CAD`}</Typography>
                    <Typography><strong>Purchase Date:</strong>{` ${Date(appointment?.transaction?.createdAt)}`}</Typography>
                    <Typography><strong>Rate:</strong>{` $${appointment?.transaction?.product?.rate} per Hour`}</Typography>
                    <Typography><strong>Rate Last Updated:</strong>{` ${Date(appointment?.transaction?.product?.updatedAt)}`}</Typography>
                </Invoice>
            </BaseModal>
            <InfoContainer>
                {/* {JSON.stringify(appointment)} */}
                <Typography>
                    <strong>Status:</strong> {status}
                </Typography>
                <Typography>
                    <strong>Tattoo:</strong> {product?.name}
                </Typography>
                <Typography>
                    <strong> Artist:</strong> {`${capitalize(merchant?.first_name)} ${capitalize(merchant?.last_name)}`}
                </Typography>
                <Typography>
                    <strong>Location:</strong> {`${capitalize(merchant?.city)}, ${merchant?.province}`}
                </Typography>

            </InfoContainer>
            <ButtonContainer>
                <ButtonRight variant={'contained'} onClick={() => setOpenInvoice(true)}>
                    View Order
                </ButtonRight>
                <ButtonRight variant={'contained'} onClick={onClickContact}>
                    Contact Arist
                </ButtonRight>
                {
                    (review?.id || appointment?.booked) &&

                    < ButtonRight variant={'contained'}
                        onClick={() => setOpenReview(true)}
                    >

                        {review?.id ? 'Update Review' : 'Create Review'}

                    </ButtonRight>
                }
            </ButtonContainer>
        </Container >
    )
}
