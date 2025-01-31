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
} from '@mui/icons-material';
import Login from './Login';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { images } from '../assets/images';
import { ImageWithFallback } from '../components/ImageWithFallback';
import DashboardPreview from '../components/DashboardPreview';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppDispatch';

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

const Landing: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [visibleSection, setVisibleSection] = useState('');
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
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const scaleVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Update testimonials section with motion components
  const renderTestimonials = () => (
    <Box
      component="section"
      id="testimonials"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.default',
      }}
    >
      <MotionContainer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            What Our Clients Say
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
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
      </MotionContainer>
    </Box>
  );

  // Update FAQ section with motion components
  const renderFAQ = () => (
    <Box
      component="section"
      id="faq"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.paper',
      }}
    >
      <MotionContainer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Frequently Asked Questions
          </Typography>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              style={{ marginBottom: 16 }}
            >
              <Accordion>
                <AccordionSummary 
                  expandIcon={<ExpandMore />}
                  sx={{
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.03)',
                    },
                  }}
                >
                  <Typography variant="h6">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Container>
      </MotionContainer>
    </Box>
  );

  // Update hero section with image
  const renderHero = () => (
    <Box
      component="section"
      id="hero"
      sx={{
        background: 'linear-gradient(135deg, #2D3436 0%, #636E72 100%)',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <MotionContainer
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <AnimatedBox variants={itemVariants}>
                <Typography
                  variant="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    marginBottom: 2,
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #55EFC4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Transform Your Marketing
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
              <AnimatedBox
                variants={scaleVariants}
                sx={{
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  perspective: 1000,
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    transform: 'rotateY(-10deg) rotateX(5deg)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'rotateY(0deg) rotateX(0deg)',
                    },
                  }}
                >
                  <DashboardPreview />
                  {/* Decorative elements */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      right: -20,
                      bottom: 20,
                      left: 20,
                      background: 'linear-gradient(135deg, #00B894 0%, #55EFC4 100%)',
                      borderRadius: '24px',
                      zIndex: -1,
                    }}
                  />
                </Box>
              </AnimatedBox>
            </Grid>
          </Grid>
        </Container>
      </MotionContainer>
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

  return (
    <Box>
      {renderHero()}
      {/* Platform Integration Section with improved animations */}
      <Box
        component="section"
        id="platforms"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'background.default',
        }}
      >
        <MotionContainer
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              align="center"
              gutterBottom
              sx={{ mb: 6 }}
            >
              All Your Platforms in One Place
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {platforms.map((platform, index) => (
                <Grid item xs={6} sm={4} md={2} key={index}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: (theme) => theme.shadows[8],
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={platform.image}
                        alt={platform.name}
                        sx={{
                          width: 48,
                          height: 48,
                          mb: 1,
                          color: 'primary.main',
                        }}
                      />
                      <Typography variant="subtitle1">
                        {platform.name}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </MotionContainer>
      </Box>

      {/* Pricing Section with hover animations */}
      <Box
        component="section"
        id="pricing"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'background.paper',
        }}
      >
        <MotionContainer
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              align="center"
              gutterBottom
              sx={{ mb: 6 }}
            >
              Simple, Transparent Pricing
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {pricingTiers.map((tier, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.03,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <Paper
                      elevation={tier.recommended ? 8 : 2}
                      sx={{
                        p: 4,
                        position: 'relative',
                        border: tier.recommended ? `2px solid ${theme.palette.primary.main}` : 'none',
                        height: '100%',
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
        </MotionContainer>
      </Box>

      {renderTestimonials()}
      {renderFAQ()}

      {/* CTA Section */}
      <Box
        component="section"
        id="cta"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'primary.main',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom>
            Ready to Transform Your Marketing?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of successful businesses using DCampaigner
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => setIsLoginOpen(true)}
            sx={{ py: 2, px: 6 }}
          >
            Start Your Free Trial
          </Button>
        </Container>
      </Box>

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