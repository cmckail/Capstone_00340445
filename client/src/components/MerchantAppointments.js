import React, { useEffect, useState } from 'react';
import { styled, Container, Modal, Box, Button } from '@mui/material';
import appointmentService from '../services/appointment.service';
import AppointmentInfo from './MerchantAppointmentInfo';
import Toast from "./Toast";

export default function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [severity, setSeverity] = useState("success");
    const [toastMsg, setToastMsg] = useState("default msg");
    const updateToast = (sev, msg) => {
        setSeverity(sev);
        setToastMsg(msg);
        setOpenToast(true);
        appointmentService.getMerchantAppointments()
            .then(data => {
                setAppointments(data);
            })
    };

    useEffect(() => {
        appointmentService.getMerchantAppointments()
            .then(data => {
                setAppointments(data);
            }

            ).catch((err) => console.log(err))
    }, []);
    return (
        <Container>
            <h1>Merchant Appointment Manager</h1>
            {
                appointments.length >= 1 ?
                    (
                        <>
                            {appointments.map((a) => {
                                return <AppointmentInfo key={a.id} appointment={a} updateToast={updateToast} />
                            })}
                        </>) :
                    (<p> No appointments </p>)
            }

            <Toast open={openToast} setOpen={setOpenToast} severity={severity} msg={toastMsg} />

        </Container>
    )

}
