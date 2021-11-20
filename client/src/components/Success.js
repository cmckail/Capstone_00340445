import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material';
// import React, { useEffect, useState } from 'react';
import transactionService from '../services/transaction.service';
import useQuery from '../common/useQuery';

export default function Success() {
    const search = useQuery();
    const [error, setError] = useState("")
    const [checkedSession, setCheckedSession] = useState(false);
    useEffect(() => {
        let session_id = search.get('session_id');
        if (session_id) {
            transactionService.checkSessionResult(session_id).then(
                setCheckedSession(true)
            ).catch((err) => {
                setCheckedSession(true)
                setError("Error processing transaction please contact support")
            })
        } else {
            setError("Error No Session ID Pass. If this is a mistake please contact support")
        }

    }, [])

    if (!checkedSession && !error) {
        return (
            <Container>
                <div style={{ margin: "auto", paddingTop: '20px', textAlign: 'center' }}>
                    <h1>Processing...</h1>
                </div>
            </Container>
        )

    }
    else {
        return (
            <Container>
                {!error ?

                    (<div style={{ margin: "auto", paddingTop: '20px', textAlign: 'center' }}>
                        <h1>Success</h1>
                        <p>Please give the Artist 48 hours to respond.</p>
                        <p>Navigate to appointments to see your invoice and appointment status!</p>
                    </div>) :
                    (<div style={{ margin: "auto", paddingTop: '20px', textAlign: 'center' }}>
                        <h1>Error</h1>
                        <p>{error}</p>
                    </div>)
                }
            </Container>
        )
    }
}
