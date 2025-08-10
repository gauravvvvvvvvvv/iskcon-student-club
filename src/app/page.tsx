"use client";
import React from 'react';
import {
  AppBar, Box, Toolbar, Typography, Container, Button, IconButton, Stack, Grid, Card, CardContent, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, useScrollTrigger, Slide, Tooltip
} from '@mui/material';
import { DarkModeIcon, LightModeIcon, MenuBookIcon, SelfImprovementIcon, MusicNoteIcon, RestaurantIcon, LibraryBooksIcon, TheaterComedyIcon, HomeIcon, LocalLibraryIcon, LocalDiningIcon, SpaIcon, AccessTimeIcon, InstagramIcon, YouTubeIcon, PhoneIcon, PlaceIcon, GroupIcon, VolunteerActivismIcon, GavelIcon, MilitaryTechIcon, HikingIcon, FavoriteBorderIcon } from '../icons/FallbackIcons';
import { useContext } from 'react';
import { ColorModeContext } from './theme/AppThemeProvider';

function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const programs = [
  { icon: <MenuBookIcon color="warning" />, title: 'Learning Gita & Vedic Wisdom', description: 'Structured deep dive into Bhagavad Gita & Vedic philosophy.' },
  { icon: <SelfImprovementIcon color="warning" />, title: 'Chanting / Mantra Meditation', description: 'Daily japa & kirtan to sharpen focus and purify mind.' },
  { icon: <MilitaryTechIcon color="warning" />, title: 'Leadership Development', description: 'Cultivating responsibility, clarity & servant-leadership.' },
  { icon: <GroupIcon color="warning" />, title: 'Spiritual Friendship', description: 'Uplifting association & accountability circles.' },
  { icon: <MusicNoteIcon color="warning" />, title: 'Kirtans / Festivals', description: 'High-energy devotional music & cultural celebrations.' },
  { icon: <VolunteerActivismIcon color="warning" />, title: 'Personal Mentorship', description: 'One-on-one guidance for growth & sadhana alignment.' },
  { icon: <HikingIcon color="warning" />, title: 'Dham Yatra', description: 'Transformative pilgrimages to sacred holy places.' },
  { icon: <SpaIcon color="warning" />, title: 'Sattvik Lifestyle', description: 'Balanced routine: purity, nutrition, discipline & seva.' },
  { icon: <LibraryBooksIcon color="warning" />, title: 'Spreading Vedic Wisdom', description: 'Outreach, seminars & distribution of sacred texts.' },
  { icon: <SupportAgentIcon color="warning" />, title: 'Spiritual Counseling', description: 'Support for life decisions & inner emotional balance.' },
  { icon: <HomeIcon color="warning" />, title: 'Accommodation', description: 'Focused spiritual student residential environment.' },
  { icon: <RestaurantIcon color="warning" />, title: 'Prasadam', description: 'Wholesome sanctified vegetarian nourishment.' },
  { icon: <FavoriteBorderIcon color="warning" />, title: 'Mental / Physical Detox', description: 'Habit reset using mantra, regulated sleep & diet.' },
  { icon: <GavelIcon color="warning" />, title: 'Debate Circles', description: 'Structured philosophical dialogue & reasoning.' },
  { icon: <TheaterComedyIcon color="warning" />, title: 'Drama', description: 'Devotional theater & expressive arts seva.' },
  { icon: <EmojiEventsIcon color="warning" />, title: 'Competitions', description: 'Quizzes, recitation & character challenges.' },
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
  const { mode, toggle } = useContext(ColorModeContext);
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
      <HideOnScroll>
        <AppBar elevation={0} color="default" sx={{ backdropFilter: 'blur(16px)', bgcolor: (theme) => theme.palette.background.paper, borderBottom: 1, borderColor: 'divider' }}>
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
      </HideOnScroll>
      <Toolbar />

      {/* Hero with Prabhupada (left), ISKCON logo (right) and full form centered */}
        <Box id="home" sx={{ pt: { xs: 18, md: 20 }, pb: { xs: 10, md: 14 }, position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ position: 'absolute', inset: 0, zIndex: -3, background: (theme) => theme.palette.mode === 'light' ? 'linear-gradient(135deg, #fffcf2, #fff3e0)' : 'linear-gradient(135deg, #111416, #181b1e)' }} />
        {/* Subtle decorative orbs */}
        <Box sx={{ position: 'absolute', width: 380, height: 380, top: -120, left: -120, borderRadius: '50%', background: 'radial-gradient(circle,#ffd9b0,transparent 60%)', filter: 'blur(40px)', opacity: 0.55 }} />
        <Box sx={{ position: 'absolute', width: 420, height: 420, bottom: -160, right: -140, borderRadius: '50%', background: 'radial-gradient(circle,#ffe4c4,transparent 70%)', filter: 'blur(50px)', opacity: 0.55 }} />
          {/* Full-width banner row (outside container to span edge-to-edge) */}
          <Box sx={{
            width: '100%',
            px: { xs: 2, sm: 4, md: 8 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 2, md: 4 },
            mb: { xs: 6, md: 8 },
            flexWrap: 'nowrap'
          }}>
            {/* Srila Prabhupada image */}
            <Box sx={{
              position: 'relative',
              width: { xs: 80, sm: 130, md: 170 },
              height: { xs: 80, sm: 130, md: 170 },
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 6px 18px -6px rgba(0,0,0,0.25)',
              flexShrink: 0
            }}>
              <img src="/prabhupada.jpg" alt="Srila Prabhupada" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            <Typography component="h1" sx={{
              flexGrow: 1,
              fontWeight: 800,
              textAlign: 'center',
              fontSize: { xs: '1rem', sm: '1.3rem', md: '2.1rem' },
              letterSpacing: { xs: 1, sm: 3, md: 6 },
              lineHeight: 1.15,
              background: 'linear-gradient(90deg,#ea580c,#f59e0b)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              whiteSpace: 'normal'
            }}>
              INTERNATIONAL SOCIETY FOR KRISHNA CONSCIOUSNESS
            </Typography>
            {/* ISKCON Logo image */}
            <Box sx={{
              position: 'relative',
              width: { xs: 80, sm: 130, md: 180 },
              height: { xs: 80, sm: 150, md: 200 },
              flexShrink: 0,
              overflow: 'hidden',
              borderRadius: '50%'
            }}>
              <img src="/iskcon-logo.png" alt="ISKCON Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Box>
          </Box>
          <Container maxWidth="lg">
            <Stack spacing={5} alignItems="center" textAlign="center">
              <Typography variant="h3" sx={{ fontSize: { xs: '1.9rem', md: '2.7rem' }, fontWeight: 800, lineHeight: 1.1, letterSpacing: -0.75, color: 'warning.main' }}>
                ISKCON STUDENT CENTER
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 400, color: 'text.secondary', lineHeight: 1.6, maxWidth: 860, fontSize: { xs: '1.05rem', md: '1.15rem' } }}>
                Meditation • Wisdom • Leadership • Friendship • Festivals • Mentorship • Lifestyle • Pilgrimage • Counseling • Service.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button href="#programs" size="large" variant="contained" color="warning" sx={{ fontWeight: 700, px: 5, borderRadius: '999px', boxShadow: '0 0 0 0 rgba(245,158,11,0.5)', animation: 'pulseJoin 2.5s infinite' }}>Explore Programs</Button>
                <Button href="#contact" size="large" variant="outlined" color="warning" sx={{ fontWeight: 700, px: 5, borderRadius: '999px' }}>Visit Center</Button>
              </Stack>
              <Stack direction="row" spacing={6} pt={2} flexWrap="wrap" justifyContent="center">
                <Stack alignItems="center" minWidth={120}>
                  <Typography variant="h5" fontWeight={800}>250+</Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>Active Students</Typography>
                </Stack>
                <Stack alignItems="center" minWidth={120}>
                  <Typography variant="h5" fontWeight={800}>365</Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>Days / Year</Typography>
                </Stack>
                <Stack alignItems="center" minWidth={120}>
                  <Typography variant="h5" fontWeight={800}>100%</Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>Authentic Tradition</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        <style>{`
          @keyframes pulseJoin { 0% { box-shadow: 0 0 0 0 rgba(245,158,11,0.5);} 70% { box-shadow: 0 0 0 28px rgba(245,158,11,0); } 100% { box-shadow: 0 0 0 0 rgba(245,158,11,0);} }
        `}</style>
      </Box>

  {/* Programs / Features */}
  <Box id="programs" py={12} sx={{ background: (theme) => theme.palette.mode === 'light' ? 'linear-gradient(135deg, #ffffff, #fff9f2)' : 'linear-gradient(135deg, #1e2124, #181b1e)', transition: 'background 0.4s' }}>
        <Container maxWidth="lg">
          <Stack spacing={2} textAlign="center" mb={6}>
    <Typography variant="overline" fontWeight={700} color="warning.main">FEATURES</Typography>
    <Typography variant="h3" fontWeight={800} sx={{ letterSpacing: -1 }}>Holistic Offerings</Typography>
    <Typography variant="subtitle1" color="text.secondary" maxWidth={780} mx="auto">Integrated spiritual ecosystem: learning, meditation, leadership, friendship, lifestyle transformation and joyful seva.</Typography>
          </Stack>
          <Grid container spacing={4}>
            {programs.map((p, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card elevation={2} sx={{
                  height: '100%',
                  borderRadius: 6,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  border: 'none',
                  background: (theme) => theme.palette.mode === 'light' ? 'linear-gradient(180deg, #ffffff, #fffaf0)' : 'linear-gradient(180deg, #1e2124, #1a1f20)',
                  boxShadow: (theme) => theme.palette.mode === 'light' ? '0 4px 8px rgba(0,0,0,0.1)' : '0 4px 8px rgba(0,0,0,0.6)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: (theme) => theme.palette.mode === 'light' ? '0 10px 20px rgba(0,0,0,0.15)' : '0 10px 20px rgba(0,0,0,0.7)',
                    transform: 'translateY(-5px)'
                  }
                }}>
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.25, pb: 3 }}>
                    <Box sx={{
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'warning.light',
                      color: 'warning.main',
                      boxShadow: '0 2px 6px rgba(234,88,12,0.35)',
                      mb: 0.5
                    }}>
                      {p.icon}
                    </Box>
                    <Tooltip title={p.title} placement="top-start"><Typography variant="subtitle1" fontWeight={700}>{p.title}</Typography></Tooltip>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.45 }}>{p.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Schedule */}
      <Box id="schedule" py={12} sx={{ position: 'relative', background: (theme) => theme.palette.mode === 'light' ? 'linear-gradient(135deg, #fef3c7, #fff)' : 'linear-gradient(135deg, #181b1e, #111416)' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: (theme) => theme.palette.mode === 'light' ? 'radial-gradient(circle at 85% 15%,rgba(245,158,11,0.08),transparent 55%)' : 'radial-gradient(circle at 85% 15%,rgba(245,158,11,0.15),transparent 60%)' }} />
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
      <Box id="facilities" py={12} sx={{ position: 'relative', background: (theme) => theme.palette.mode === 'light' ? 'linear-gradient(135deg, #fff, #fef9e7)' : 'linear-gradient(135deg, #1a1f22, #121416)' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: (theme) => theme.palette.mode === 'light' ? 'radial-gradient(circle at 15% 20%,rgba(245,158,11,0.08),transparent 55%)' : 'radial-gradient(circle at 15% 20%,rgba(245,158,11,0.15),transparent 60%)' }} />
        <Container maxWidth="lg">
          <Stack spacing={2} textAlign="center" mb={6}>
            <Typography variant="overline" fontWeight={700} color="warning.main">FACILITIES</Typography>
            <Typography variant="h3" fontWeight={800} sx={{ letterSpacing: -1 }}>Your Spiritual Campus</Typography>
            <Typography variant="subtitle1" color="text.secondary" maxWidth={700} mx="auto">Spaces designed to nurture reflection, community, health and growth.</Typography>
          </Stack>
          <Grid container spacing={4}>
            {facilities.map((f, i) => (
              <Grid key={i} item xs={12} sm={6} md={3}>
                <Card elevation={0} sx={{
                  height: '100%',
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: (theme) => theme.palette.mode === 'light' ? '#ffffff' : '#1e2124',
                  boxShadow: (theme) => theme.palette.mode === 'light' ? '0 2px 4px rgba(0,0,0,0.06)' : '0 2px 4px rgba(0,0,0,0.5)',
                  transition: 'all .25s ease',
                  '&:hover': { boxShadow: (theme) => theme.palette.mode === 'light' ? '0 6px 16px -4px rgba(0,0,0,0.15)' : '0 6px 16px -4px rgba(0,0,0,0.6)', transform: 'translateY(-4px)' }
                }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'warning.light', color: 'warning.main', boxShadow: '0 2px 5px rgba(234,88,12,0.3)' }}>{f.icon}</Box>
                    <Typography variant="subtitle1" fontWeight={700}>{f.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.45 }}>{f.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact */}
      <Box id="contact" py={12} sx={{ position: 'relative', background: (theme) => theme.palette.mode === 'light' ? 'linear-gradient(135deg, #fff, #fffbf0)' : 'linear-gradient(135deg, #181b1e, #121416)' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: (theme) => theme.palette.mode === 'light' ? 'radial-gradient(circle at 50% 0%,rgba(245,158,11,0.08),transparent 60%)' : 'radial-gradient(circle at 50% 0%,rgba(245,158,11,0.15),transparent 65%)' }} />
        <Container maxWidth="sm">
          <Card elevation={8} sx={{ borderRadius: 5, p: { xs: 3, md: 6 }, textAlign: 'center' }}>
            <Stack spacing={3}>
              <Typography variant="overline" color="warning.main" fontWeight={700}>CONNECT</Typography>
              <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: -1 }}>Get In Touch</Typography>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                  <PhoneIcon color="warning" />
                  <Button href="tel:+918318342494" color="warning" sx={{ fontWeight: 600, textTransform: 'none' }}>+91 83183 42494</Button>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="center">
                  <PlaceIcon color="warning" />
                  <Typography maxWidth={320}>ADDRESS:- ISKCON STUDENT CENTER, 1ST FLOOR, OPPOSITE HANSRAJ COLLEGE, ABOVE NATURAL'S ICE CREAM, NEAR STARBUCKS, KAMLA NAGAR, DELHI 110007</Typography>
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
  <Box id="location" sx={{ py: 10, background: (theme) => theme.palette.mode === 'light' ? 'radial-gradient(circle at top,#fff7ed 0%,#ffffff 70%)' : 'radial-gradient(circle at top,#1a1f22 0%,#111416 75%)' }}>
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
                    <Typography fontWeight={600}>ADDRESS:- ISKCON STUDENT CENTER, 1ST FLOOR, OPPOSITE HANSRAJ COLLEGE, ABOVE NATURAL'S ICE CREAM, NEAR STARBUCKS, KAMLA NAGAR, DELHI 110007</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <PhoneIcon color="warning" />
                    <Button href="tel:+918318342494" color="warning" sx={{ fontWeight: 600, textTransform: 'none', px: 0 }}>+91 83183 42494</Button>
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
      <Box component="footer" sx={{ position: 'relative', overflow: 'hidden', pt: 10, pb: 4, background: (theme) => theme.palette.mode === 'light' ? 'linear-gradient(135deg,#fff9f2,#ffffff 60%)' : 'linear-gradient(135deg,#161a1d,#111416 65%)' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: (theme) => theme.palette.mode === 'light' ? 'radial-gradient(circle at 80% 20%,rgba(245,158,11,0.08),transparent 50%), radial-gradient(circle at 15% 85%,rgba(245,158,11,0.06),transparent 55%)' : 'radial-gradient(circle at 80% 20%,rgba(245,158,11,0.12),transparent 55%), radial-gradient(circle at 15% 85%,rgba(245,158,11,0.1),transparent 60%)' }} />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <Stack spacing={3}>
                <Typography variant="h5" fontWeight={800} sx={{ letterSpacing: -0.5, background: 'linear-gradient(90deg,#ea580c,#f59e0b,#ea580c)', backgroundSize: '180% 100%', animation: 'gradient-shift 6s ease infinite', WebkitBackgroundClip: 'text', color: 'transparent' }}>ISKCON STUDENT CENTER</Typography>
                <Typography variant="body1" color="text.secondary" maxWidth={420}>
                  A nurturing hub for students to explore devotion, character, wisdom and joyful service through authentic Bhakti Yoga practices.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <IconButton size="small" color="warning" href="https://instagram.com/iskcondelhiuniversity" target="_blank" rel="noopener" sx={{ bgcolor: 'warning.light', '&:hover': { bgcolor: 'warning.light', transform: 'translateY(-3px) scale(1.05)' }, transition: '0.35s', boxShadow: '0 4px 12px -2px rgba(234,88,12,0.35)' }}>
                    <InstagramIcon />
                  </IconButton>
                  <IconButton size="small" color="warning" href="https://youtube.com/@ISKCONDelhiUniversity" target="_blank" rel="noopener" sx={{ bgcolor: 'warning.light', '&:hover': { bgcolor: 'warning.light', transform: 'translateY(-3px) scale(1.05)' }, transition: '0.35s', boxShadow: '0 4px 12px -2px rgba(234,88,12,0.35)' }}>
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
                    <Button key={link} href={`#${link.toLowerCase()}`} variant="text" color="inherit" sx={{ justifyContent: 'flex-start', textTransform: 'none', fontWeight: 500, px: 0, position: 'relative', '&:after': { content: '""', position: 'absolute', left: 0, bottom: 2, height: 2, width: 0, bgcolor: 'warning.main', transition: '0.4s' }, '&:hover': { color: 'warning.main' }, '&:hover:after': { width: '60%' } }}>{link}</Button>
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
                    <Button href="tel:+918318342494" variant="text" color="inherit" sx={{ fontWeight: 600, textTransform: 'none', px: 0, minWidth: 0, '&:hover': { color: 'warning.main', background: 'transparent' } }}>+91 83183 42494</Button>
                  </Stack>
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <InstagramIcon fontSize="small" color="warning" />
                    <Button href="https://instagram.com/iskcondelhiuniversity" target="_blank" rel="noopener" variant="text" color="inherit" sx={{ fontWeight: 600, textTransform: 'none', px: 0, minWidth: 0, position: 'relative', '&:after': { content: '""', position: 'absolute', left: 0, bottom: 0, height: 2, width: 0, bgcolor: 'warning.main', transition: '0.4s' }, '&:hover': { color: 'warning.main', background: 'transparent' }, '&:hover:after': { width: '100%' } }}>@iskcondelhiuniversity</Button>
                  </Stack>
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <YouTubeIcon fontSize="small" color="warning" />
                    <Button href="https://youtube.com/@ISKCONDelhiUniversity" target="_blank" rel="noopener" variant="text" color="inherit" sx={{ fontWeight: 600, textTransform: 'none', px: 0, minWidth: 0, position: 'relative', '&:after': { content: '""', position: 'absolute', left: 0, bottom: 0, height: 2, width: 0, bgcolor: 'warning.main', transition: '0.4s' }, '&:hover': { color: 'warning.main', background: 'transparent' }, '&:hover:after': { width: '100%' } }}>@ISKCONDelhiUniversity</Button>
                  </Stack>
                  <Stack direction="row" spacing={1.2} alignItems="flex-start">
                    <PlaceIcon fontSize="small" color="warning" />
                    <Typography variant="body2" fontWeight={600} maxWidth={260}>ADDRESS:- ISKCON STUDENT CENTER, 1ST FLOOR, OPPOSITE HANSRAJ COLLEGE, ABOVE NATURAL'S ICE CREAM, NEAR STARBUCKS, KAMLA NAGAR, DELHI 110007</Typography>
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
