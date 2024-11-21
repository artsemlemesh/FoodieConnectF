import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const MyCard = ({ title, description, image, onButtonClick }) => {
  return (
    <Card className="rounded-lg shadow-lg transition transform hover:scale-105">
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
        className="rounded-t-lg"
      />
      <CardContent>
        <Typography variant="h6" component="div" className="font-bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mt-2">
          {description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={onButtonClick}
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

export default MyCard;