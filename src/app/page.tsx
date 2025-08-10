"use client";
import React from 'react';
import {
  AppBar, Box, Toolbar, Typography, Container, Button, IconButton, Stack, Grid, Card, CardContent, Chip, Paper, Avatar, List, ListItem, ListItemText
} from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext } from './theme/AppThemeProvider';

// Simple icon components to avoid import issues
const DarkModeIcon = () => <span style={{fontSize: '24px'}}>🌙</span>;
const LightModeIcon = () => <span style={{fontSize: '24px'}}>☀️</span>;

// Compact program data
const programs = [
  { icon: '📖', title: 'Gita Study', desc: 'Vedic wisdom & philosophy' },
  { icon: '🧘', title: 'Meditation', desc: 'Daily japa & mindfulness' },
  { icon: '🎖️', title: 'Leadership', desc: 'Character development' },
  { icon: '👥', title: 'Community', desc: 'Spiritual friendship' },
  { icon: '🎵', title: 'Kirtans', desc: 'Music & festivals' },
  { icon: '🤝', title: 'Mentorship', desc: 'Personal guidance' },
  { icon: '🥾', title: 'Pilgrimage', desc: 'Sacred journeys' },
  { icon: '💆', title: 'Lifestyle', desc: 'Balanced living' },
  { icon: '📚', title: 'Outreach', desc: 'Share wisdom' },
  { icon: '🎧', title: 'Counseling', desc: 'Life guidance' },
  { icon: '🏠', title: 'Housing', desc: 'Student residence' },
  { icon: '🍽️', title: 'Prasadam', desc: 'Sacred meals' }
];

const schedule = [
  { time: '5:00 AM', activity: 'Morning Prayer & Meditation' },
  { time: '6:00 AM', activity: 'Yoga & Exercise' },
  { time: '7:30 AM', activity: 'Breakfast Prasadam' },
  { time: '9:00 AM', activity: 'Bhagavad Gita Class' },
  { time: '12:00 PM', activity: 'Lunch & Rest' },
  { time: '4:00 PM', activity: 'Cultural Activities' },
  { time: '6:00 PM', activity: 'Evening Kirtan' },
  { time: '7:30 PM', activity: 'Dinner Prasadam' }
];

const facilities = [
  { icon: '🏠', title: 'Accommodation', desc: 'Comfortable student housing with spiritual atmosphere' },
  { icon: '📚', title: 'Library', desc: 'Extensive collection of spiritual and academic texts' },
  { icon: '🍽️', title: 'Dining Hall', desc: 'Fresh prasadam meals prepared with devotion' },
  { icon: '🧘', title: 'Meditation Hall', desc: 'Peaceful space for prayer and contemplation' },
  { icon: '🎵', title: 'Kirtan Hall', desc: 'Sacred space for devotional music and dance' },
  { icon: '🏃', title: 'Fitness Center', desc: 'Holistic wellness and yoga facilities' }
];

export default function Home() {
  const { mode, toggle } = useContext(ColorModeContext);
  
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar elevation={0} color="default" sx={{ backdropFilter: 'blur(16px)', bgcolor: (theme) => theme.palette.background.paper, borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ maxWidth: 1280, mx: 'auto', width: '100%' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1, letterSpacing: 0.5, color: 'warning.main' }}>
            ISKCON Student Center
          </Typography>
          <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {['Programs', 'Schedule', 'Facilities', 'Location', 'Contact'].map(item => (
              <Button key={item} href={`#${item.toLowerCase()}`} color="warning" variant="text" sx={{ fontWeight: 600 }}>
                {item}
              </Button>
            ))}
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button href="#contact" variant="contained" color="warning" sx={{ borderRadius: '999px', px: 3, fontWeight: 700 }}>
              Join Now
            </Button>
            <IconButton onClick={toggle} color="warning" aria-label="Toggle color mode" sx={{ ml: 0.5 }}>
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />

      {/* Hero Section */}
      <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 8, md: 12 }, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ 
          position: 'absolute', 
          inset: 0, 
          background: (theme) => theme.palette.mode === 'light' 
            ? 'linear-gradient(135deg, #fffcf2, #fff3e0)' 
            : 'linear-gradient(135deg, #111416, #181b1e)' 
        }} />
        
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          {/* Header with Images */}
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={4} mb={6}>
            <Avatar
              src="/prabhupada.svg"
              alt="Srila Prabhupada"
              sx={{ 
                width: { xs: 80, md: 120 }, 
                height: { xs: 80, md: 120 }, 
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)' 
              }}
            />
            <Box textAlign="center">
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 800, 
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  background: 'linear-gradient(90deg,#ea580c,#f59e0b)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  letterSpacing: 2
                }}
              >
                INTERNATIONAL SOCIETY FOR<br/>KRISHNA CONSCIOUSNESS
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'warning.main', mt: 2 }}>
                STUDENT CENTER
              </Typography>
            </Box>
            <Avatar
              src="/iskcon-logo.svg"
              alt="ISKCON Logo"
              sx={{ 
                width: { xs: 80, md: 120 }, 
                height: { xs: 80, md: 120 }, 
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)' 
              }}
            />
          </Stack>

          {/* Subtitle */}
          <Typography 
            variant="h6" 
            sx={{ 
              textAlign: 'center', 
              color: 'text.secondary', 
              maxWidth: 600, 
              mx: 'auto', 
              mb: 4,
              lineHeight: 1.6 
            }}
          >
            A nurturing hub for students to explore devotion, character, wisdom and joyful service through authentic Bhakti Yoga practices.
          </Typography>

          {/* CTA Buttons */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" mb={6}>
            <Button 
              variant="contained" 
              color="warning" 
              size="large"
              href="#programs"
              sx={{ borderRadius: '999px', px: 4, fontWeight: 700 }}
            >
              Explore Programs
            </Button>
            <Button 
              variant="outlined" 
              color="warning" 
              size="large"
              href="#contact"
              sx={{ borderRadius: '999px', px: 4, fontWeight: 700 }}
            >
              Visit Center
            </Button>
          </Stack>

          {/* Stats */}
          <Stack direction="row" spacing={6} justifyContent="center" flexWrap="wrap">
            <Box textAlign="center">
              <Typography variant="h4" fontWeight={800} color="warning.main">250+</Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>Active Students</Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h4" fontWeight={800} color="warning.main">365</Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>Days / Year</Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h4" fontWeight={800} color="warning.main">100%</Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>Authentic</Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Compact Programs Section */}
      <Box id="programs" py={8} sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={800} textAlign="center" mb={1}>
            What We Offer
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" textAlign="center" mb={6} maxWidth={600} mx="auto">
            Comprehensive spiritual development through study, practice, and community
          </Typography>
          
          <Grid container spacing={3}>
            {programs.map((program, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Paper 
                  elevation={2}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 3,
                    textAlign: 'center',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <Typography variant="h4" mb={1}>{program.icon}</Typography>
                  <Typography variant="subtitle1" fontWeight={700} mb={1}>
                    {program.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {program.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Schedule Section */}
      <Box id="schedule" py={8} sx={{ 
        background: (theme) => theme.palette.mode === 'light' 
          ? 'linear-gradient(135deg, #fff7ed, #fff)' 
          : 'linear-gradient(135deg, #161a1d, #0f1113)' 
      }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={800} textAlign="center" mb={1}>
            Daily Schedule
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" textAlign="center" mb={4}>
            Structured spiritual practice throughout the day
          </Typography>
          
          <Paper elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <List>
              {schedule.map((item, idx) => (
                <ListItem key={idx} sx={{ py: 2, borderBottom: idx < schedule.length - 1 ? 1 : 0, borderColor: 'divider' }}>
                  <Box sx={{ width: 80, flexShrink: 0 }}>
                    <Typography variant="subtitle2" fontWeight={700} color="warning.main">
                      {item.time}
                    </Typography>
                  </Box>
                  <ListItemText 
                    primary={item.activity}
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Container>
      </Box>

      {/* Facilities Section */}
      <Box id="facilities" py={8} sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={800} textAlign="center" mb={1}>
            Our Facilities
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" textAlign="center" mb={6} maxWidth={600} mx="auto">
            Modern amenities designed to support your spiritual and academic journey
          </Typography>
          
          <Grid container spacing={4}>
            {facilities.map((facility, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Paper 
                  elevation={3}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 4,
                    textAlign: 'center',
                    background: (theme) => theme.palette.mode === 'light' 
                      ? 'linear-gradient(145deg, #ffffff 0%, #fef7ed 100%)' 
                      : 'linear-gradient(145deg, #1e2124 0%, #1a1f20 100%)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: (theme) => theme.palette.mode === 'light' 
                        ? '0 12px 30px rgba(234,88,12,0.15)' 
                        : '0 12px 30px rgba(0,0,0,0.4)',
                      borderColor: 'warning.main'
                    }
                  }}
                >
                  <Box 
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      bgcolor: 'warning.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      fontSize: '2rem'
                    }}
                  >
                    {facility.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={700} mb={2}>
                    {facility.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                    {facility.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Location & Map Section */}
      <Box id="location" py={10} sx={{ 
        background: (theme) => theme.palette.mode === 'light' 
          ? 'linear-gradient(135deg, #fff7ed, #ffffff)' 
          : 'linear-gradient(135deg, #161a1d, #111416)' 
      }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={800} textAlign="center" mb={1}>
            Visit Our Center
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" textAlign="center" mb={8} maxWidth={600} mx="auto">
            Located in the heart of North Delhi, easily accessible from all DU colleges
          </Typography>
          
          <Grid container spacing={6} alignItems="stretch">
            <Grid item xs={12} md={5}>
              <Paper elevation={6} sx={{ p: 4, height: '100%', borderRadius: 4 }}>
                <Stack spacing={3} sx={{ height: '100%', justifyContent: 'center' }}>
                  <Chip 
                    label="📍 FIND US" 
                    color="warning" 
                    variant="outlined" 
                    sx={{ fontWeight: 600, alignSelf: 'flex-start', fontSize: '1rem' }} 
                  />
                  
                  <Typography variant="h5" fontWeight={700}>
                    Easy to Reach
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                    We are located in the heart of North Delhi, easily reachable from Delhi University colleges. 
                    Drop in for a class, kirtan, meditation or just a peaceful study break with prasadam.
                  </Typography>
                  
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <span style={{fontSize:'1.5rem', marginTop: '2px'}}>📍</span>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700} color="warning.main" mb={0.5}>
                          Address
                        </Typography>
                        <Typography variant="body2" lineHeight={1.5}>
                          ISKCON STUDENT CENTER, 1ST FLOOR, OPPOSITE HANSRAJ COLLEGE, 
                          ABOVE NATURAL'S ICE CREAM, NEAR STARBUCKS, KAMLA NAGAR, DELHI 110007
                        </Typography>
                      </Box>
                    </Stack>
                    
                    <Stack direction="row" spacing={2} alignItems="center">
                      <span style={{fontSize:'1.5rem'}}>📱</span>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700} color="warning.main" mb={0.5}>
                          Phone
                        </Typography>
                        <Button 
                          href="tel:+918318342494" 
                          color="warning" 
                          sx={{ fontWeight: 600, textTransform: 'none', p: 0, minWidth: 'auto' }}
                        >
                          +91 83183 42494
                        </Button>
                      </Box>
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <Paper elevation={8} sx={{ height: '100%', borderRadius: 4, overflow: 'hidden', position: 'relative', minHeight: 400 }}>
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(255,247,237,0.25),rgba(255,255,255,0.25))', pointerEvents: 'none', zIndex: 1 }} />
                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                  <iframe
                    title="ISKCON Student Center Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3199.5466743621614!2d77.20813749999999!3d28.678913099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfdf53b2058b5%3A0x90ba420109930cec!2sISKCON%20student%20centre%20(%20DU%20BACE)!5e1!3m2!1sen!2sin!4v1754795768086!5m2!1sen!2sin"
                    style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Get Involved Section */}
      <Box id="contact" py={10} sx={{ 
        background: (theme) => theme.palette.mode === 'light' 
          ? 'linear-gradient(135deg, #ea580c 0%, #ff7f3f 50%, #ffa41b 100%)' 
          : 'linear-gradient(135deg, #7c2d12 0%, #9a3412 50%, #b45309 100%)',
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ color: 'white', mb: { xs: 4, md: 0 } }}>
                <Typography variant="h3" fontWeight={900} mb={2}>
                  Ready to Begin Your Journey?
                </Typography>
                <Typography variant="h6" mb={4} sx={{ opacity: 0.95, lineHeight: 1.6 }}>
                  Join hundreds of students discovering their spiritual potential through ancient wisdom and modern learning.
                </Typography>
                
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={4}>
                  <Button 
                    variant="contained" 
                    size="large"
                    href="#programs"
                    sx={{ 
                      bgcolor: 'white', 
                      color: 'warning.main', 
                      fontWeight: 700,
                      px: 4,
                      borderRadius: '999px',
                      '&:hover': { bgcolor: 'grey.100' }
                    }}
                  >
                    Explore Programs
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    href="#location"
                    sx={{ 
                      borderColor: 'white', 
                      color: 'white', 
                      fontWeight: 700,
                      px: 4,
                      borderRadius: '999px',
                      '&:hover': { 
                        borderColor: 'white', 
                        bgcolor: 'rgba(255,255,255,0.1)' 
                      }
                    }}
                  >
                    Visit Center
                  </Button>
                </Stack>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Paper 
                  elevation={8} 
                  sx={{ 
                    p: 4, 
                    borderRadius: 4,
                    background: (theme) => theme.palette.mode === 'light' 
                      ? 'rgba(255,255,255,0.95)' 
                      : 'rgba(30,33,36,0.95)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Typography variant="h5" fontWeight={700} mb={3} textAlign="center">
                    Connect With Us
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Paper 
                        elevation={2} 
                        sx={{ 
                          p: 3, 
                          textAlign: 'center', 
                          borderRadius: 3,
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          textDecoration: 'none',
                          '&:hover': { 
                            transform: 'translateY(-4px)', 
                            boxShadow: 4 
                          }
                        }}
                        component="a"
                        href="tel:+918318342494"
                      >
                        <Box 
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            bgcolor: 'success.light',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                            fontSize: '1.5rem'
                          }}
                        >
                          �
                        </Box>
                        <Typography variant="subtitle2" fontWeight={700} color="text.secondary">
                          Call Us
                        </Typography>
                        <Typography variant="body2" fontWeight={600} color="success.main">
                          +91 83183 42494
                        </Typography>
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Paper 
                        elevation={2} 
                        sx={{ 
                          p: 3, 
                          textAlign: 'center', 
                          borderRadius: 3,
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          textDecoration: 'none',
                          '&:hover': { 
                            transform: 'translateY(-4px)', 
                            boxShadow: 4 
                          }
                        }}
                        component="a"
                        href="https://instagram.com/iskcondelhiuniversity"
                        target="_blank"
                      >
                        <Box 
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            bgcolor: 'error.light',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                            fontSize: '1.5rem'
                          }}
                        >
                          �
                        </Box>
                        <Typography variant="subtitle2" fontWeight={700} color="text.secondary">
                          Follow
                        </Typography>
                        <Typography variant="body2" fontWeight={600} color="error.main">
                          @iskcondelhiuniversity
                        </Typography>
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Paper 
                        elevation={2} 
                        sx={{ 
                          p: 3, 
                          textAlign: 'center', 
                          borderRadius: 3,
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          textDecoration: 'none',
                          '&:hover': { 
                            transform: 'translateY(-4px)', 
                            boxShadow: 4 
                          }
                        }}
                        component="a"
                        href="https://youtube.com/@ISKCONDelhiUniversity"
                        target="_blank"
                      >
                        <Box 
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            bgcolor: 'primary.light',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                            fontSize: '1.5rem'
                          }}
                        >
                          📺
                        </Box>
                        <Typography variant="subtitle2" fontWeight={700} color="text.secondary">
                          Subscribe
                        </Typography>
                        <Typography variant="body2" fontWeight={600} color="primary.main">
                          @ISKCONDelhiUniversity
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 4, borderTop: 1, borderColor: 'divider', bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" textAlign="center">
            © {new Date().getFullYear()} ISKCON Student Center. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
