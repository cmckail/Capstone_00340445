import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { useHistory } from "react-router-dom";


const lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

const ImgCardMedia = styled(CardMedia)({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Text = styled(Typography)({
  textAlign: 'center'
})

export default function ProductPreview({ product }) {
  const history = useHistory();

  const parseImage = () => {
    try {
      return JSON.parse(product.image)
    } catch (error) {
      return {}
    }
  }
  const image = parseImage();

  const handleClick = () => history.push(`/market/${product?.id}`);
  return (
    <Card sx={{ width: '100%' }}>
      <CardActionArea onClick={handleClick}>
        <ImgCardMedia
          component="img"
          height="200"
          image={image?.thumb?.url || 'https://www.medstartr.com/main/images/no-image.png'}
          alt={product.name}
        />
        <CardContent>
          <Text gutterBottom variant="h5" component="div">
            {product?.name}
          </Text>
          <Text variant="body2" color="text.secondary">
            {`$${product.deposit} CAD Deposit`}
          </Text>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}