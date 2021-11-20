import React, { useState } from 'react'
import { styled, Typography, Box, Button, Paper } from '@mui/material';
import { capitalize } from "../common/capitalize"
import BaseModal from './BaseModal';
import { ParseJSON } from '../common/ParseJSON';
import appointmentService from '../services/appointment.service';

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

const ModalChild = styled(Paper)({
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

export default function MerchantAppointmentInfo({ appointment, updateToast }) {

    const [openInvoice, setOpenInvoice] = useState(false);
    const [openContact, setOpenContact] = useState(false);
    const status = appointment?.booked ? "Booked" : "Not Booked";
    const product = appointment?.transaction?.product;
    const productImage = ParseJSON(product?.image);
    const client = appointment?.transaction?.user;

    const handleBooking = () => {
        let booked = false;
        if (!appointment.booked) {
            booked = true

        }
        appointmentService.bookAppointment(booked, appointment.id)
            .then(() => updateToast("success", "Succesffully update appointment")
            ).catch(
                (err) => {
                    if (err.response) {
                        updateToast("error", "error updating appointment status");
                    }

                }
            )
    }
    return (
        <Container>
            <BaseModal open={openInvoice} handleClose={() => setOpenInvoice(false)}>
                <ModalChild >
                    <Img src={productImage?.url} />
                    <Typography><strong>Tattoo:</strong>{` ${appointment?.transaction?.product?.name}`}</Typography>
                    <Typography><strong>Deposit:</strong>{` $${appointment?.transaction?.amount / 100} CAD`}</Typography>
                    <Typography><strong>Purchase Date:</strong>{` ${Date(appointment?.transaction?.createdAt)}`}</Typography>
                    <Typography><strong>Rate:</strong>{` $${appointment?.transaction?.product?.rate} per Hour`}</Typography>
                    <Typography><strong>Rate Last Updated:</strong>{` ${Date(appointment?.transaction?.product?.updatedAt)}`}</Typography>
                </ModalChild>
            </BaseModal>
            <BaseModal open={openContact} handleClose={() => setOpenContact(false)}>
                <ModalChild >
                    <Typography><strong>Username:</strong>{` ${client?.username}`}</Typography>
                    <Typography><strong>Email:</strong>{` ${client?.email}`}</Typography>
                    <Typography><strong>Phone:</strong>{` ${client?.phone_number}`}</Typography>
                    <Typography><strong>Location:</strong>{` ${client?.city},${client?.province}`}</Typography>
                </ModalChild>
            </BaseModal>
            <InfoContainer>
                <Typography>
                    <strong>Status:</strong> {status}
                </Typography>
                <Typography>
                    <strong>Tattoo:</strong> {product?.name}
                </Typography>
                <Typography>
                    <strong>Client:</strong> {`${capitalize(client?.first_name)} ${capitalize(client?.last_name)}`}
                </Typography>

            </InfoContainer>
            <ButtonContainer>
                <ButtonRight variant={'contained'} onClick={() => setOpenInvoice(true)}>
                    View Order
                </ButtonRight>
                <ButtonRight variant={'contained'} onClick={() => setOpenContact(true)}>
                    Contact Customer
                </ButtonRight>

                <ButtonRight variant={'contained'}
                    onClick={() => handleBooking()}
                >
                    {appointment?.booked ? "UnBook" : "Book"}
                </ButtonRight>
            </ButtonContainer>
        </Container >
    )
}
