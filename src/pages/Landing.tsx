import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Dialog,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Avatar,
  Tabs,
  Tab,
  Fade,
  Chip,
  Rating,
  AppBar,
  Toolbar,
  Link,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  Campaign,
  Analytics,
  Group,
  ExpandMore,
  CheckCircle,
  Facebook,
  Instagram,
  YouTube,
  Email,
  Sms,
  Google,
  Copyright,
  Menu,
  Phone,
  LocationOn,
} from '@mui/icons-material';
import Login from './Login';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { images } from '../assets/images';
import { ImageWithFallback } from '../components/ImageWithFallback';
import DashboardPreview from '../components/DashboardPreview';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppDispatch';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

interface PricingTier {
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  comment: string;
  rating: number;
}

// Styled components for animations
const AnimatedBox = styled(motion.div)({
  width: '100%',
});

const MotionContainer = styled(motion.div)({
  width: '100%',
  height: '100%',
});

// Add this with other animation variants at the top of the component
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

// Add this common style to all section Boxes
const sectionStyle = {
  py: { xs: 8, md: 12 },
  scrollMarginTop: '80px', // Increased to ensure content is visible
};

const Landing: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [visibleSection, setVisibleSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Pricing tiers
  const pricingTiers: PricingTier[] = [
    {
      name: 'Starter',
      price: 49,
      features: [
        'Up to 5 campaigns',
        'Basic analytics',
        '2 social platforms',
        'Email support',
      ],
    },
    {
      name: 'Professional',
      price: 99,
      features: [
        'Up to 20 campaigns',
        'Advanced analytics',
        'All social platforms',
        'Priority support',
        'Campaign automation',
      ],
      recommended: true,
    },
    {
      name: 'Enterprise',
      price: 199,
      features: [
        'Unlimited campaigns',
        'Custom analytics',
        'All platforms + API access',
        '24/7 dedicated support',
        'Advanced automation',
        'Custom integrations',
      ],
    },
  ];

  // Testimonials
  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechCorp',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      comment: "DCampaigner has revolutionized how we manage our marketing campaigns. The analytics are incredible!",
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Digital Marketing Manager',
      company: 'Growth Solutions',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      comment: "The multi-platform integration saves us hours of work every week. Highly recommended!",
      rating: 5,
    },
    {
      name: 'Emma Davis',
      role: 'CEO',
      company: 'Startup Hub',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      comment: "Best investment we've made for our marketing team. The ROI tracking is phenomenal.",
      rating: 4,
    },
  ];

  // FAQs
  const faqs = [
    {
      question: 'How does DCampaigner work?',
      answer: 'DCampaigner provides a unified platform to create, manage, and analyze marketing campaigns across multiple platforms. Simply connect your accounts, create campaigns, and track results in real-time.',
    },
    {
      question: 'Which platforms are supported?',
      answer: 'We support all major social media platforms including Facebook, Instagram, YouTube, Google Ads, as well as Email and SMS marketing campaigns.',
    },
    {
      question: 'Can I try before subscribing?',
      answer: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required.',
    },
    {
      question: 'Is there a long-term contract?',
      answer: 'No, all our plans are month-to-month with no long-term commitment required.',
    },
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Hero Section
  const renderHero = () => (
    <Box
      component="section"
      id="hero"
      sx={{
        minHeight: '100vh',
        pt: { xs: 8, md: 12 },
        pb: { xs: 6, md: 8 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <AnimatedBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  background: 'linear-gradient(45deg, #2D3436 30%, #636E72 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Manage All Your Marketing Campaigns in One Place
              </Typography>
              <Typography
                variant="h5"
                sx={{ mb: 4, opacity: 0.9 }}
              >
                One platform to manage all your marketing campaigns across social media, email, and SMS.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => setIsLoginOpen(true)}
                  sx={{ py: 1.5, px: 4 }}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  sx={{ py: 1.5, px: 4 }}
                  href="#features"
                >
                  Learn More
                </Button>
              </Box>
            </AnimatedBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <AnimatedBox variants={scaleVariants}>
              <DashboardPreview />
            </AnimatedBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  // Features Section
  const renderFeatures = () => (
    <Box
      component="section"
      id="features"
      sx={{
        ...sectionStyle,
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom>
          Powerful Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {[
            {
              icon: <Campaign sx={{ fontSize: 40 }} />,
              title: 'Multi-Platform Integration',
              description: 'Connect and manage all your marketing platforms in one dashboard.'
            },
            {
              icon: <Analytics sx={{ fontSize: 40 }} />,
              title: 'Advanced Analytics',
              description: 'Get detailed insights and performance metrics for all your campaigns.'
            },
            {
              icon: <Group sx={{ fontSize: 40 }} />,
              title: 'Team Collaboration',
              description: 'Work seamlessly with your team members and clients.'
            }
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                {feature.icon}
                <Typography variant="h5" sx={{ my: 2 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );

  // FAQ Section
  const renderFAQ = () => (
    <Box
      component="section"
      id="faq"
      sx={{
        ...sectionStyle,
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" align="center" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Box sx={{ mt: 4 }}>
          {faqs.map((faq, index) => (
            <Accordion 
              key={index}
              sx={{
                mb: 2,
                borderRadius: '8px !important',
                '&:before': { display: 'none' },
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    display: 'flex',
                    alignItems: 'center',
                  },
                }}
              >
                <Typography variant="h6" sx={{ color: 'primary.main' }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );

  const platforms = [
    { name: 'Facebook', image: images.platforms.facebook },
    { name: 'Instagram', image: images.platforms.instagram },
    { name: 'YouTube', image: images.platforms.youtube },
    { name: 'Google Ads', image: images.platforms.google },
    { name: 'Email', image: images.platforms.email },
    { name: 'SMS', image: images.platforms.sms },
  ];

  // Add header section
  const renderHeader = () => (
    <AppBar 
      position="fixed" 
      color="transparent" 
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar 
          sx={{ 
            justifyContent: 'space-between',
            px: { xs: 1, sm: 2 },
            py: 1,
          }}
        >
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              '&:hover': {
                color: 'primary.dark',
              },
            }}
          >
            DCampaigner
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Stack 
              direction="row" 
              spacing={3} 
              sx={{ 
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
              }}
            >
              {['About Us', 'Choose Your Plan', 'Contact Us'].map((item) => (
                <Button
                  key={item}
                  color="inherit"
                  onClick={() => {
                    const targetId = item.toLowerCase().replace(/\s+/g, '');
                    const element = document.getElementById(targetId);
                    element?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                  sx={{ 
                    textTransform: 'none',
                    color: 'text.primary',
                    fontWeight: 500,
                    fontSize: '1rem',
                    '&:hover': {
                      color: 'primary.main',
                      background: 'transparent',
                    },
                  }}
                >
                  {item}
                </Button>
              ))}
            </Stack>

            <Button
              variant="contained"
              onClick={() => setIsLoginOpen(true)}
              sx={{
                display: { xs: 'none', md: 'flex' },
                borderRadius: '50px',
                px: 3,
                py: 1,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                '&:hover': {
                  background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Sign In
            </Button>

            <IconButton
              sx={{ 
                display: { xs: 'flex', md: 'none' },
                color: 'primary.main',
              }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );

  // Add footer section
  const renderFooter = () => (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        px: 2,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              DCampaigner
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Transform your digital marketing with our comprehensive campaign management platform.
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {['About Us', 'Features', 'Choose Your Plan', 'Contact Us'].map((item) => (
                <Button
                  key={item}
                  color="inherit"
                  onClick={() => {
                    const targetId = item.toLowerCase().replace(/\s+/g, '');
                    const element = document.getElementById(targetId);
                    element?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                  sx={{ 
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    padding: 0
                  }}
                >
                  {item}
                </Button>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Stack spacing={1}>
              <Link component={RouterLink} to="/privacy" color="inherit">Privacy Policy</Link>
              <Link component={RouterLink} to="/terms" color="inherit">Terms of Service</Link>
              <Link component={RouterLink} to="/cookies" color="inherit">Cookie Policy</Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" paragraph>
              Email: support@dcampaigner.com
            </Typography>
            <Typography variant="body2" paragraph>
              Phone: +1 (555) 123-4567
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 5, pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            <Copyright sx={{ mr: 1, fontSize: 'inherit' }} />
            {new Date().getFullYear()} DCampaigner. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );

  // Add this new section renderer before the return statement
  const renderTestimonials = () => (
    <Box
      component="section"
      id="testimonials"
      sx={{
        ...sectionStyle,
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom>
          What Our Clients Say
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src={testimonial.avatar}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h6">{testimonial.name}</Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          {testimonial.role} at {testimonial.company}
                        </Typography>
                      </Box>
                    </Box>
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      "{testimonial.comment}"
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );

  // About Us section
  const renderAbout = () => (
    <Box
      component="section"
      id="aboutus"
      sx={{
        ...sectionStyle,
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom>
          About Us
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Your Digital Marketing Partner
            </Typography>
            <Typography paragraph>
              DCampaigner is a comprehensive digital marketing platform designed to help businesses 
              streamline their marketing efforts across multiple channels.
            </Typography>
            <Typography paragraph>
              Our mission is to simplify campaign management while maximizing your marketing ROI 
              through advanced analytics and automation.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={images.features.analytics}
              alt="About DCampaigner"
              sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  // Plans section
  const renderPlans = () => (
    <Box
      component="section"
      id="chooseyourplan"
      sx={{
        ...sectionStyle,
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom>
          Choose Your Plan
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {pricingTiers.map((tier, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Paper
                  elevation={tier.recommended ? 8 : 1}
                  sx={{
                    p: 3,
                    position: 'relative',
                    height: '100%',
                    borderRadius: 2,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  {tier.recommended && (
                    <Chip
                      label="Recommended"
                      color="primary"
                      sx={{
                        position: 'absolute',
                        top: -16,
                        right: 24,
                      }}
                    />
                  )}
                  <Typography variant="h4" component="h3" gutterBottom>
                    {tier.name}
                  </Typography>
                  <Typography variant="h3" component="div" sx={{ mb: 3 }}>
                    ${tier.price}
                    <Typography variant="subtitle1" component="span" color="text.secondary">
                      /month
                    </Typography>
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    {tier.features.map((feature, featureIndex) => (
                      <Box
                        key={featureIndex}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1,
                        }}
                      >
                        <CheckCircle sx={{ mr: 1, color: 'success.main' }} fontSize="small" />
                        <Typography>{feature}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Button
                    variant={tier.recommended ? 'contained' : 'outlined'}
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={() => setIsLoginOpen(true)}
                  >
                    Get Started
                  </Button>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );

  // Contact section
  const renderContact = () => (
    <Box
      component="section"
      id="contactus"
      sx={{
        ...sectionStyle,
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Have questions? We're here to help!
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Email sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Email
              </Typography>
              <Typography color="text.secondary">
                support@dcampaigner.com
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Phone sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Phone
              </Typography>
              <Typography color="text.secondary">
                +1 (555) 123-4567
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <LocationOn sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Office
              </Typography>
              <Typography color="text.secondary">
                123 Marketing Street
                <br />
                San Francisco, CA 94105
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  return (
    <Box>
      {renderHeader()}
      {renderHero()}
      {renderAbout()}
      {renderFeatures()}
      {renderPlans()}
      {renderTestimonials()}
      {renderFAQ()}
      {renderContact()}
      {renderFooter()}

      {/* Login Dialog */}
      <Dialog
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        maxWidth="xs"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 2,
            m: isMobile ? 0 : 2,
          },
        }}
      >
        <Login onClose={() => setIsLoginOpen(false)} />
      </Dialog>
    </Box>
  );
};

export default Landing; 