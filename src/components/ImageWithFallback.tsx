import React, { useState } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  sx?: any;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, sx }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <Box position="relative">
      {isLoading && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            ...sx,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      )}
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          ...sx,
          display: error ? 'none' : 'block',
        }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
      />
      {error && (
        <Box
          sx={{
            ...sx,
            bgcolor: 'grey.200',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography color="text.secondary">
            Image not found
          </Typography>
        </Box>
      )}
    </Box>
  );
}; 