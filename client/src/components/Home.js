import React from "react";
import { Grid } from "@mui/material";

export default function Home() {

  return (
    <Grid container>
      <Grid item xs={12}
        style={{
          alignSelf: 'center',
          minHeight: '400px',
          backgroundImage: "url(" + "https://i.ibb.co/3T5hs41/GLT-Tattoo-Flash-Wall.jpg" + ")",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          padding: '30px, 30px, 40px, 40px',
          textAlign: 'center',
        }}
      >
      </Grid>
      <Grid item xs={12} style={{ alignSelf: 'center', textAlign: 'center' }}>
        <h1> Tadoo</h1>
        <h3> Flash Card Tattoo Marketplace</h3>
        <h5> Sell as a Merchant or Buy as a Client!</h5>
      </Grid>
    </ Grid>
  );
};
