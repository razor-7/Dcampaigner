import React, { useState, useEffect } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
  StepContent,
  Paper,
  IconButton,
  ImageList,
  ImageListItem,
} from '@mui/material';
import FacebookCampaignForm from './FacebookCampaignForm';
import InstagramCampaignForm from './InstagramCampaignForm';
import YouTubeCampaignForm from './YouTubeCampaignForm';
import GoogleAdsCampaignForm from './GoogleAdsCampaignForm';
import EmailCampaignForm from './EmailCampaignForm';
import SMSCampaignForm from './SMSCampaignForm';
import { useA11y } from '../../hooks/useA11y';
import { platformService } from '../../services/platformService';
import { authenticatePlatform } from '../../auth/authHelpers';
import { logger } from '../../utils/logger';
import { PLATFORM_TYPES } from '../../config/constants';
import { getPlaceholderImage } from '../../utils/imageHelpers';
import { AddPhotoAlternate as AddPhotoIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface PlatformIntegrationProps {
  platform: string;
  campaignId: number;
  clientId: number;
  onComplete: (platformData: any) => void;
}

const PLATFORM_IMAGES = {
  Facebook: 'https://placehold.co/400x400/2D88FF/FFFFFF?text=Facebook',
  Instagram: 'https://placehold.co/400x400/E4405F/FFFFFF?text=Instagram',
  YouTube: 'https://placehold.co/400x400/FF0000/FFFFFF?text=YouTube',
  'Google Ads': 'https://placehold.co/400x400/4285F4/FFFFFF?text=Google+Ads',
  Email: 'https://placehold.co/400x400/34A853/FFFFFF?text=Email',
  SMS: 'https://placehold.co/400x400/9B59B6/FFFFFF?text=SMS'
};

const PlatformIntegration: React.FC<PlatformIntegrationProps> = ({
  platform,
  campaignId,
  clientId,
  onComplete,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [platformData, setPlatformData] = useState({});
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { handleKeyPress, getAriaLabel } = useA11y();

  const steps = [
    {
      label: 'Platform Authentication',
      description: `Connect your ${platform} account to proceed`,
    },
    {
      label: 'Campaign Setup',
      description: 'Configure your campaign settings',
    },
    {
      label: 'Review & Launch',
      description: 'Review and launch your campaign',
    },
  ];

  const handlePlatformAuth = async () => {
    setIsConnecting(true);
    try {
      const isAuthenticated = await authenticatePlatform(platform);
      if (isAuthenticated) {
        setActiveStep(1);
      }
    } catch (error) {
      logger.error('Platform authentication failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
      
      // Create preview URLs for the new files
      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => {
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const renderPlatformForm = () => {
    switch (platform) {
      case 'Facebook':
        return <FacebookCampaignForm onSubmit={handleFormSubmit} />;
      case 'Instagram':
        return <InstagramCampaignForm onSubmit={handleFormSubmit} />;
      case 'YouTube':
        return <YouTubeCampaignForm onSubmit={handleFormSubmit} />;
      case 'Google Ads':
        return <GoogleAdsCampaignForm onSubmit={handleFormSubmit} />;
      case 'Email':
        return <EmailCampaignForm onSubmit={handleFormSubmit} />;
      case 'SMS':
        return <SMSCampaignForm onSubmit={handleFormSubmit} />;
      default:
        return null;
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      const success = await platformService.createCampaign({
        ...data,
        campaignId,
        clientId,
        platform
      });
      if (success) {
        setPlatformData(data);
        setActiveStep(2);
      }
    } catch (error) {
      logger.error('Form submission failed:', error);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderPlatformImage = () => {
    return (
      <Box
        component="img"
        src={PLATFORM_IMAGES[platform as keyof typeof PLATFORM_IMAGES]}
        alt={`${platform} platform`}
        sx={{
          width: 100,
          height: 100,
          objectFit: 'contain',
          mb: 2
        }}
      />
    );
  };

  const renderCreativeMedia = () => {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Creative Media
        </Typography>
        <Paper sx={{ p: 2 }}>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="image-upload-input"
          />
          <Box sx={{ mb: 2 }}>
            <label htmlFor="image-upload-input">
              <Button
                variant="outlined"
                component="span"
                startIcon={<AddPhotoIcon />}
                fullWidth
              >
                Add Images
              </Button>
            </label>
          </Box>
          
          <ImageList sx={{ width: '100%', height: 'auto' }} cols={3} rowHeight={200}>
            {previewUrls.map((url, index) => (
              <ImageListItem key={index} sx={{ position: 'relative' }}>
                <img
                  src={url}
                  alt={`Creative ${index + 1}`}
                  loading="lazy"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                  onClick={() => handleRemoveImage(index)}
                >
                  <DeleteIcon sx={{ color: 'white' }} />
                </IconButton>
              </ImageListItem>
            ))}
          </ImageList>

          {previewUrls.length === 0 && (
            <Box 
              sx={{ 
                height: 200, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '2px dashed',
                borderColor: 'grey.300',
                borderRadius: 1,
                bgcolor: 'grey.50'
              }}
            >
              <Typography color="text.secondary">
                No images selected. Click "Add Images" to upload.
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {isMobile ? (
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <Typography variant="subtitle1">{step.label}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {step.description}
                </Typography>
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 2 }}>
                  {index === 0 && (
                    <Box sx={{ textAlign: 'center' }}>
                      {renderPlatformImage()}
                      <Button
                        variant="contained"
                        onClick={handlePlatformAuth}
                        disabled={isConnecting}
                        fullWidth
                      >
                        {isConnecting ? (
                          <CircularProgress size={24} />
                        ) : (
                          `Connect to ${platform}`
                        )}
                      </Button>
                    </Box>
                  )}
                  {index === 1 && renderPlatformForm()}
                  {index === 2 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Review Campaign Details
                      </Typography>
                      <Paper sx={{ p: 2, mb: 2 }}>
                        {/* Add review details here */}
                      </Paper>
                      <Button
                        variant="contained"
                        onClick={() => onComplete(platformData)}
                        fullWidth
                      >
                        Launch Campaign
                      </Button>
                    </Box>
                  )}
                  {index > 0 && (
                    <Button
                      onClick={handleBack}
                      sx={{ mt: 1 }}
                      fullWidth
                    >
                      Back
                    </Button>
                  )}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      ) : (
        <>
          <Stepper activeStep={activeStep}>
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel>
                  <Typography variant="subtitle1">{step.label}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <Box sx={{ mt: 4 }}>
            {activeStep === 0 && (
              <Box sx={{ textAlign: 'center' }}>
                {renderPlatformImage()}
                <Typography gutterBottom>{steps[0].description}</Typography>
                <Button
                  variant="contained"
                  onClick={handlePlatformAuth}
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <CircularProgress size={24} />
                  ) : (
                    `Connect to ${platform}`
                  )}
                </Button>
              </Box>
            )}
            
            {activeStep === 1 && renderPlatformForm()}
            
            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Review Campaign Details
                </Typography>
                <Paper sx={{ p: 3, mb: 3 }}>
                  {/* Add review details here */}
                </Paper>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => onComplete(platformData)}
                  >
                    Launch Campaign
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default PlatformIntegration; 