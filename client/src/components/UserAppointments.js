import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import appointmentService from '../services/appointment.service';
import AppointmentInfo from './AppointmentInfo';
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
        appointmentService.getUserAppointments()
            .then(data => {
                setAppointments(data);
            }).catch((err) => { console.log(err?.response?.data) })
    };

    useEffect(() => {
        appointmentService.getUserAppointments()
            .then(data => {
                ;
                setAppointments(data);
            }
            ).catch((err) => { console.log(err?.response?.data) })
    }, []);
    return (
        <Container>
            <h1> My Tattoo Appointments </h1>
            {
                appointments.length >= 1 ?
                    (
                        <>
                            {appointments.map((a) => {
                                return <AppointmentInfo updateToast={updateToast} key={a?.id} appointment={a} />
                            })}
                        </>) :
                    (<p> No appointments </p>)
            }
            <Toast open={openToast} setOpen={setOpenToast} severity={severity} msg={toastMsg} />

        </Container>
    )

}
