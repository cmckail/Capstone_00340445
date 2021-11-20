import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { ParseJSON } from '../common/ParseJSON';



const Img = styled('img')({
  margin: 'auto',
  width: '100%',
  height: '300px',
  objectFit: 'contain',
});

export default function Review({ review }) {

  const userAvatars = ParseJSON(review?.user?.profile_picture);
  const productImages = ParseJSON(review?.product?.image);
  const date = new Date(review.createdAt);
  return (
    <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1, marginBottom: '5px' }}>
      <Grid container spacing={2} >
        <Grid item xs={8} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs style={{ textAlign: 'left' }}>
              <Avatar src={userAvatars?.thumb?.url || "//ssl.gstatic.com/accounts/ui/avatar_2x.png"} />
              <Typography variant="subtitle1" component="div">
                Jane Doe
              </Typography>

              {review.rating &&
                (
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {"⭐".repeat(Math.floor(review?.rating))}
                  </Typography>)
              }
              <Typography variant="body2" color="text.secondary">
                Reviewed On: {date.getDate()}\{date.getMonth()}\{date.getFullYear()}
              </Typography>

              <Typography variant="body2">
                {review?.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} style={{ alignSelf: 'center', textAlign: 'center' }}>
          <Img alt="complex" src={productImages?.thumb?.url || "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2018_10/428981/140508-tattoo-jsw-1019a.jpg"} />
        </Grid>
      </Grid>
    </Paper>
  );
}