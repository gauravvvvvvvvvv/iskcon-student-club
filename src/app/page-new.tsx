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
            {['Programs', 'Schedule', 'Contact'].map(item => (
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

      {/* Contact Section */}
      <Box id="contact" py={8} sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="sm">
          <Paper elevation={4} sx={{ borderRadius: 4, p: 4, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={800} mb={3}>
              Get In Touch
            </Typography>
            
            <Stack spacing={3}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <span style={{fontSize:'1.5rem'}}>📱</span>
                <Button href="tel:+918318342494" color="warning" sx={{ fontWeight: 600, textTransform: 'none' }}>
                  +91 83183 42494
                </Button>
              </Stack>
              
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <span style={{fontSize:'1.5rem'}}>📸</span>
                <Button href="https://instagram.com/iskcondelhiuniversity" target="_blank" color="warning">
                  @iskcondelhiuniversity
                </Button>
              </Stack>
              
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <span style={{fontSize:'1.5rem'}}>📺</span>
                <Button href="https://youtube.com/@ISKCONDelhiUniversity" target="_blank" color="warning">
                  @ISKCONDelhiUniversity
                </Button>
              </Stack>
              
              <Box>
                <Stack direction="row" spacing={1} alignItems="flex-start" justifyContent="center">
                  <span style={{fontSize:'1.5rem'}}>📍</span>
                  <Typography variant="body2" sx={{ maxWidth: 400 }}>
                    ISKCON STUDENT CENTER, 1ST FLOOR, OPPOSITE HANSRAJ COLLEGE, ABOVE NATURAL'S ICE CREAM, NEAR STARBUCKS, KAMLA NAGAR, DELHI 110007
                  </Typography>
                </Stack>
              </Box>
              
              <Button 
                variant="contained" 
                color="warning" 
                size="large"
                href="https://instagram.com/iskcondelhiuniversity"
                target="_blank"
                sx={{ borderRadius: '999px', mt: 3, fontWeight: 700 }}
              >
                Join Our Community
              </Button>
            </Stack>
          </Paper>
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
