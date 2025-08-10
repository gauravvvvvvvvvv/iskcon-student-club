"use client";
import React from 'react';
import {
  AppBar, Box, Toolbar, Typography, Container, Button, IconButton, Stack, Grid, Card, CardContent, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, useScrollTrigger, Slide
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SpaIcon from '@mui/icons-material/Spa';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';

function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const programs = [
  { icon: <MenuBookIcon color="warning" />, title: 'Bhagavad Gita Classes', description: 'Ancient wisdom for modern life.' },
  { icon: <SelfImprovementIcon color="warning" />, title: 'Meditation & Yoga', description: 'Authentic techniques for focus & peace.' },
  { icon: <MusicNoteIcon color="warning" />, title: 'Kirtan & Music', description: 'Devotional chanting & sacred sound.' },
  { icon: <RestaurantIcon color="warning" />, title: 'Prasadam Service', description: 'Sanctified, nourishing vegetarian meals.' },
  { icon: <LibraryBooksIcon color="warning" />, title: 'Spiritual Literature', description: 'Study sacred texts & discussions.' },
  { icon: <TheaterComedyIcon color="warning" />, title: 'Cultural Programs', description: 'Festivals, drama & celebrations.' },
];

const facilities = [
  { icon: <HomeIcon color="warning" />, title: 'Accommodation', description: 'Comfortable, focused student living.' },
  { icon: <LocalLibraryIcon color="warning" />, title: 'Library', description: 'Spiritual & academic study space.' },
  { icon: <LocalDiningIcon color="warning" />, title: 'Dining Hall', description: 'Nutritious daily prasadam meals.' },
  { icon: <SpaIcon color="warning" />, title: 'Meditation Hall', description: 'Quiet space for reflection & prayer.' },
];

const schedule = [
  { time: '5:00 AM', activity: 'Morning Prayer & Meditation' },
  { time: '6:00 AM', activity: 'Yoga & Exercise' },
  { time: '7:30 AM', activity: 'Breakfast Prasadam' },
  { time: '9:00 AM', activity: 'Bhagavad Gita Class' },
  { time: '12:00 PM', activity: 'Lunch & Rest' },
  { time: '4:00 PM', activity: 'Cultural Activities' },
  { time: '6:00 PM', activity: 'Evening Kirtan' },
  { time: '7:30 PM', activity: 'Dinner Prasadam' },
  { time: '9:00 PM', activity: 'Personal Study & Rest' },
];

export default function Home() {
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
      <HideOnScroll>
        <AppBar elevation={0} color="default" sx={{ backdropFilter: 'blur(16px)', bgcolor: 'rgba(255,255,255,0.85)', borderBottom: 1, borderColor: 'divider' }}>
          <Toolbar sx={{ maxWidth: 1280, mx: 'auto', width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1, letterSpacing: 0.5, color: 'warning.main' }}>
              ISKCON Student Center
            </Typography>
            <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {['Programs', 'Schedule', 'Facilities', 'Contact'].map(item => (
                <Button key={item} href={`#${item.toLowerCase()}`} color="warning" variant="text" sx={{ fontWeight: 600 }}>
                  {item}
                </Button>
              ))}
            </Stack>
            <Button href="#contact" variant="contained" color="warning" sx={{ borderRadius: '999px', px: 3, fontWeight: 700, ml: 2 }}>
              Join Now
            </Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />

      {/* Hero / Banner with two image placeholders and full form */}
      <Box id="home" sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 10, md: 14 }, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#fff,#fff7ed)', zIndex: -1 }} />
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="stretch">
            {/* Left image placeholder */}
            <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{
                position: 'relative',
                height: '100%',
                minHeight: 320,
                borderRadius: '36px 36px 12px 12px',
                overflow: 'hidden',
                background: 'linear-gradient(160deg,#fff3e0,#ffe8cc)',
                boxShadow: '0 10px 30px -10px rgba(234,88,12,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 20%,rgba(245,158,11,0.25),transparent 60%)' }} />
                <Typography sx={{ position: 'relative', fontSize: 13, letterSpacing: 2, fontWeight: 700, color: 'warning.main', textTransform: 'uppercase' }}>Add Image</Typography>
              </Box>
            </Grid>
            {/* Center heading */}
            <Grid item xs={12} md={6}>
              <Stack spacing={4} alignItems="center" textAlign="center" height="100%" justifyContent="center">
                <Stack spacing={2}>
                  <Typography variant="h3" sx={{ fontSize: { xs: '1.6rem', md: '2.2rem' }, fontWeight: 800, lineHeight: 1.15, letterSpacing: -0.5 }}>
                    INTERNATIONAL SOCIETY FOR KRISHNA CONSCIOUSNESS
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'warning.main', letterSpacing: 1 }}>
                    ISKCON STUDENT CENTER
                  </Typography>
                </Stack>
                <Typography variant="h6" sx={{ fontWeight: 400, color: 'text.secondary', lineHeight: 1.5, maxWidth: 720 }}>
                  Transform your student journey with meditation, wisdom, service, culture and nourishing prasadam rooted in the timeless Bhakti tradition.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button href="#programs" size="large" variant="contained" color="warning" sx={{ fontWeight: 700, px: 5, borderRadius: '999px', boxShadow: '0 0 0 0 rgba(245,158,11,0.5)', animation: 'pulseJoin 2.5s infinite' }}>Explore Programs</Button>
                  <Button href="#contact" size="large" variant="outlined" color="warning" sx={{ fontWeight: 700, px: 5, borderRadius: '999px' }}>Visit Center</Button>
                </Stack>
                <Stack direction="row" spacing={6} pt={2}>
                  <Stack>
                    <Typography variant="h5" fontWeight={800}>250+</Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>Active Students</Typography>
                  </Stack>
                  <Stack>
                    <Typography variant="h5" fontWeight={800}>365</Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>Days/Year</Typography>
                  </Stack>
                  <Stack>
                    <Typography variant="h5" fontWeight={800}>100%</Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>Authentic Tradition</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
            {/* Right image placeholder */}
            <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{
                position: 'relative',
                height: '100%',
                minHeight: 320,
                borderRadius: '36px 36px 12px 12px',
                overflow: 'hidden',
                background: 'linear-gradient(200deg,#fff3e0,#ffe8cc)',
                boxShadow: '0 10px 30px -10px rgba(234,88,12,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 20%,rgba(245,158,11,0.25),transparent 60%)' }} />
                <Typography sx={{ position: 'relative', fontSize: 13, letterSpacing: 2, fontWeight: 700, color: 'warning.main', textTransform: 'uppercase' }}>Add Image</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
        {/* Keyframes for pulsing button */}
        <style>{`
          @keyframes pulseJoin { 0% { box-shadow: 0 0 0 0 rgba(245,158,11,0.5);} 70% { box-shadow: 0 0 0 28px rgba(245,158,11,0); } 100% { box-shadow: 0 0 0 0 rgba(245,158,11,0);} }
        `}</style>
      </Box>

      {/* Programs */}
      <Box id="programs" py={12} sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Stack spacing={2} textAlign="center" mb={6}>
            <Typography variant="overline" fontWeight={700} color="warning.main">PROGRAMS</Typography>
            <Typography variant="h3" fontWeight={800} sx={{ letterSpacing: -1 }}>What We Offer</Typography>
            <Typography variant="subtitle1" color="text.secondary" maxWidth={720} mx="auto">Holistic spiritual formation through knowledge, devotion, culture and service.</Typography>
          </Stack>
          <Grid container spacing={4}>
            {programs.map((p, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card elevation={4} sx={{ height: '100%', borderRadius: 4, position: 'relative', overflow: 'hidden', transition: '0.4s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 8 } }}>
                  <CardContent>
                    <Stack spacing={1.5} alignItems="flex-start">
                      <IconButton size="large" color="warning" sx={{ bgcolor: 'warning.light', '&:hover': { bgcolor: 'warning.light' } }}>{p.icon}</IconButton>
                      <Typography variant="h6" fontWeight={700}>{p.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{p.description}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Schedule */}
      <Box id="schedule" py={12} sx={{ background: 'linear-gradient(135deg,#fff7ed,#fff)' }}>
        <Container maxWidth="md">
          <Stack spacing={2} textAlign="center" mb={6}>
            <Typography variant="overline" fontWeight={700} color="warning.main">DAILY FLOW</Typography>
            <Typography variant="h3" fontWeight={800} sx={{ letterSpacing: -1 }}>Daily Schedule</Typography>
            <Typography variant="subtitle1" color="text.secondary" maxWidth={640} mx="auto">Balanced routine blending meditation, study, service, culture and personal development.</Typography>
          </Stack>
          <Card elevation={6} sx={{ borderRadius: 5, p: { xs: 2, md: 4 }, backdropFilter: 'blur(8px)' }}>
            <List>
              {schedule.map((item, idx) => (
                <React.Fragment key={idx}>
                  <ListItem sx={{ px: { xs: 0, md: 1 } }}>
                    <ListItemIcon sx={{ minWidth: 48 }}><AccessTimeIcon color="warning" /></ListItemIcon>
                    <ListItemText
                      primary={<Typography fontWeight={700} color="warning.main">{item.time}</Typography>}
                      secondary={<Typography color="text.primary" fontWeight={500}>{item.activity}</Typography>}
                    />
                  </ListItem>
                  {idx < schedule.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Container>
      </Box>

      {/* Facilities */}
      <Box id="facilities" py={12}>
        <Container maxWidth="lg">
          <Stack spacing={2} textAlign="center" mb={6}>
            <Typography variant="overline" fontWeight={700} color="warning.main">FACILITIES</Typography>
            <Typography variant="h3" fontWeight={800} sx={{ letterSpacing: -1 }}>Your Spiritual Campus</Typography>
            <Typography variant="subtitle1" color="text.secondary" maxWidth={700} mx="auto">Spaces designed to nurture reflection, community, health and growth.</Typography>
          </Stack>
          <Grid container spacing={4}>
            {facilities.map((f, i) => (
              <Grid key={i} item xs={12} sm={6} md={3}>
                <Card elevation={5} sx={{ height: '100%', borderRadius: 4, p: 1.5, display: 'flex', flexDirection: 'column', transition: '0.4s', '&:hover': { boxShadow: 10 } }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Stack spacing={1.5}>
                      <IconButton color="warning" sx={{ alignSelf: 'flex-start', bgcolor: 'warning.light', '&:hover': { bgcolor: 'warning.light' } }}>{f.icon}</IconButton>
                      <Typography variant="subtitle1" fontWeight={700}>{f.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{f.description}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact */}
      <Box id="contact" py={12} sx={{ background: 'linear-gradient(135deg,#fff,#fff7ed)' }}>
        <Container maxWidth="sm">
          <Card elevation={8} sx={{ borderRadius: 5, p: { xs: 3, md: 6 }, textAlign: 'center' }}>
            <Stack spacing={3}>
              <Typography variant="overline" color="warning.main" fontWeight={700}>CONNECT</Typography>
              <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: -1 }}>Get In Touch</Typography>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                  <PhoneIcon color="warning" />
                  <Typography fontWeight={600}>+91 83183 42494</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="center">
                  <PlaceIcon color="warning" />
                  <Typography maxWidth={300}>26 Prem Niwas First Floor, Malka Ganj, New Delhi, Delhi 110007</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                  <InstagramIcon color="warning" />
                  <Button href="https://instagram.com/iskcondelhiuniversity" target="_blank" rel="noopener" color="warning">@iskcondelhiuniversity</Button>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                  <YouTubeIcon color="warning" />
                  <Button href="https://youtube.com/@ISKCONDelhiUniversity" target="_blank" rel="noopener" color="warning">@ISKCONDelhiUniversity</Button>
                </Stack>
              </Stack>
              <Button size="large" variant="contained" color="warning" href="https://instagram.com/iskcondelhiuniversity" target="_blank" sx={{ fontWeight: 700, borderRadius: '999px', mt: 2 }}>
                Join Our Community
              </Button>
            </Stack>
          </Card>
        </Container>
      </Box>
      {/* Location / Map */}
      <Box id="location" sx={{ py: 10, background: 'radial-gradient(circle at top,#fff7ed 0%,#ffffff 70%)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="stretch">
            <Grid item xs={12} md={5}>
              <Stack spacing={3} sx={{ height: '100%', justifyContent: 'center' }}>
                <Chip label="VISIT US" color="warning" variant="outlined" sx={{ fontWeight: 600, alignSelf: 'flex-start' }} />
                <Typography variant="h3" fontWeight={800} sx={{ letterSpacing: -1 }}>Find Us</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.6}>
                  We are located in the heart of North Delhi, easily reachable from Delhi University colleges. Drop in for a class, kirtan, meditation or just a peaceful study break with prasadam.
                </Typography>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <PlaceIcon color="warning" />
                    <Typography fontWeight={600}>26 Prem Niwas First Floor, Malka Ganj, New Delhi, Delhi 110007</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <PhoneIcon color="warning" />
                    <Typography fontWeight={600}>+91 83183 42494</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <InstagramIcon color="warning" />
                    <Button href="https://instagram.com/iskcondelhiuniversity" target="_blank" rel="noopener" color="warning" sx={{ fontWeight: 600, textTransform: 'none' }}>@iskcondelhiuniversity</Button>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={7}>
              <Card elevation={10} sx={{ height: '100%', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(255,247,237,0.25),rgba(255,255,255,0.25))', pointerEvents: 'none' }} />
                <Box sx={{ position: 'relative', width: '100%', pt: '65%' }}>
                  <iframe
                    title="ISKCON Student Center Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3199.5466743621614!2d77.20813749999999!3d28.678913099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfdf53b2058b5%3A0x90ba420109930cec!2sISKCON%20student%20centre%20(%20DU%20BACE)!5e1!3m2!1sen!2sin!4v1754795768086!5m2!1sen!2sin"
                    style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Footer */}
      <Box component="footer" sx={{ position: 'relative', overflow: 'hidden', pt: 10, pb: 4, background: 'linear-gradient(135deg,#fff7ed,#ffffff 60%)' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%,rgba(245,158,11,0.08),transparent 50%)' }} />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <Stack spacing={3}>
                <Typography variant="h5" fontWeight={800} sx={{ letterSpacing: -0.5, background: 'linear-gradient(90deg,#ea580c,#f59e0b)', WebkitBackgroundClip: 'text', color: 'transparent' }}>ISKCON STUDENT CENTER</Typography>
                <Typography variant="body1" color="text.secondary" maxWidth={420}>
                  A nurturing hub for students to explore devotion, character, wisdom and joyful service through authentic Bhakti Yoga practices.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <IconButton size="small" color="warning" href="https://instagram.com/iskcondelhiuniversity" target="_blank" rel="noopener" sx={{ bgcolor: 'warning.light', '&:hover': { bgcolor: 'warning.light', transform: 'translateY(-2px)' }, transition: '0.3s' }}>
                    <InstagramIcon />
                  </IconButton>
                  <IconButton size="small" color="warning" href="https://youtube.com/@ISKCONDelhiUniversity" target="_blank" rel="noopener" sx={{ bgcolor: 'warning.light', '&:hover': { bgcolor: 'warning.light', transform: 'translateY(-2px)' }, transition: '0.3s' }}>
                    <YouTubeIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={6} md={3}>
              <Stack spacing={2}>
                <Typography variant="subtitle2" fontWeight={700} color="warning.main">Explore</Typography>
                <Stack spacing={1}>
                  {['Programs','Schedule','Facilities','Contact'].map(link => (
                    <Button key={link} href={`#${link.toLowerCase()}`} variant="text" color="inherit" sx={{ justifyContent: 'flex-start', textTransform: 'none', fontWeight: 500, px: 0, '&:hover': { color: 'warning.main' } }}>{link}</Button>
                  ))}
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={6} md={4}>
              <Stack spacing={2}>
                <Typography variant="subtitle2" fontWeight={700} color="warning.main">Connect</Typography>
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <PhoneIcon fontSize="small" color="warning" />
                    <Typography variant="body2" fontWeight={600}>+91 83183 42494</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <InstagramIcon fontSize="small" color="warning" />
                    <Typography variant="body2" fontWeight={600}>@iskcondelhiuniversity</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <YouTubeIcon fontSize="small" color="warning" />
                    <Typography variant="body2" fontWeight={600}>@ISKCONDelhiUniversity</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.2} alignItems="flex-start">
                    <PlaceIcon fontSize="small" color="warning" />
                    <Typography variant="body2" fontWeight={600} maxWidth={220}>26 Prem Niwas First Floor, Malka Ganj, New Delhi</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ my: 6 }} />
          <Typography variant="caption" color="text.secondary" display="block" textAlign="center">© {new Date().getFullYear()} ISKCON Student Center. All rights reserved.</Typography>
        </Container>
      </Box>
    </Box>
  );
}
// End of page component
