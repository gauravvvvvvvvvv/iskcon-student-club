"use client";
import React from 'react';
import {
  AppBar, Box, Toolbar, Typography, Container, Button, IconButton, Stack, Grid, Card, CardContent, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, useScrollTrigger, Slide, Tooltip
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useContext } from 'react';
import { ColorModeContext } from './theme/AppThemeProvider';
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
import GroupIcon from '@mui/icons-material/Group';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import GavelIcon from '@mui/icons-material/Gavel';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import HikingIcon from '@mui/icons-material/Hiking';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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

      {/* Hero with top-corner images */}
      <Box id="home" sx={{ pt: { xs: 18, md: 20 }, pb: { xs: 10, md: 14 }, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg,#ffffff,#fff9f1 55%,#fff3e0)', zIndex: -3 }} />
        {/* Subtle decorative orbs */}
        <Box sx={{ position: 'absolute', width: 380, height: 380, top: -120, left: -120, borderRadius: '50%', background: 'radial-gradient(circle,#ffd9b0,transparent 60%)', filter: 'blur(40px)', opacity: 0.55 }} />
        <Box sx={{ position: 'absolute', width: 420, height: 420, bottom: -160, right: -140, borderRadius: '50%', background: 'radial-gradient(circle,#ffe4c4,transparent 70%)', filter: 'blur(50px)', opacity: 0.55 }} />
        {/* Top corner image placeholders */}
  <Box sx={{ position: 'absolute', top: 24, left: 24, width: { xs: 110, md: 190 }, height: { xs: 130, md: 230 }, borderRadius: 6, background: 'linear-gradient(160deg,#fff3e0 0%,#ffe1bc 60%)', boxShadow: '0 10px 26px -12px rgba(234,88,12,0.25)', overflow: 'hidden', display: { xs: 'none', sm: 'block' }, border: '1px solid rgba(234,88,12,0.2)' }}>
          <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 25%,rgba(245,158,11,0.35),transparent 60%)' }} />
          <Typography sx={{ position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center', fontSize: 10, letterSpacing: 2, fontWeight: 700, color: 'warning.main' }}>ADD IMAGE</Typography>
        </Box>
  <Box sx={{ position: 'absolute', top: 24, right: 24, width: { xs: 110, md: 190 }, height: { xs: 130, md: 230 }, borderRadius: 6, background: 'linear-gradient(210deg,#fff3e0 0%,#ffe1bc 65%)', boxShadow: '0 10px 26px -12px rgba(234,88,12,0.25)', overflow: 'hidden', display: { xs: 'none', sm: 'block' }, border: '1px solid rgba(234,88,12,0.2)' }}>
          <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 25%,rgba(245,158,11,0.35),transparent 60%)' }} />
          <Typography sx={{ position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center', fontSize: 10, letterSpacing: 2, fontWeight: 700, color: 'warning.main' }}>ADD IMAGE</Typography>
        </Box>
        <Container maxWidth="lg">
          <Stack spacing={5} alignItems="center" textAlign="center">
            <Stack spacing={2}>
              <Typography variant="h3" sx={{ fontSize: { xs: '1.9rem', md: '2.7rem' }, fontWeight: 800, lineHeight: 1.1, letterSpacing: -0.75, background: 'linear-gradient(90deg,#ea580c,#f59e0b)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                INTERNATIONAL SOCIETY FOR KRISHNA CONSCIOUSNESS
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: 'warning.main', letterSpacing: 4 }}>
                ISKCON STUDENT CENTER
              </Typography>
            </Stack>
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
      <Box id="programs" py={12} sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Stack spacing={2} textAlign="center" mb={6}>
    <Typography variant="overline" fontWeight={700} color="warning.main">FEATURES</Typography>
    <Typography variant="h3" fontWeight={800} sx={{ letterSpacing: -1 }}>Holistic Offerings</Typography>
    <Typography variant="subtitle1" color="text.secondary" maxWidth={780} mx="auto">Integrated spiritual ecosystem: learning, meditation, leadership, friendship, lifestyle transformation and joyful seva.</Typography>
          </Stack>
          <Grid container spacing={4}>
            {programs.map((p, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card elevation={4} sx={{ height: '100%', borderRadius: 6, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'linear-gradient(145deg,#ffffff,#fffaf5)', transition: '0.35s', '&:before': { content: '""', position: 'absolute', inset: 0, background: 'radial-gradient(circle at 25% 18%,rgba(245,158,11,0.12),transparent 62%)' }, '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 14px 32px -8px rgba(234,88,12,0.25)' } }}>
                  <CardContent sx={{ position: 'relative', flexGrow: 1 }}>
                    <Stack spacing={1.8} alignItems="flex-start">
                      <IconButton size="large" color="warning" sx={{ bgcolor: 'warning.light', boxShadow: '0 4px 12px -2px rgba(234,88,12,0.35)', '&:hover': { bgcolor: 'warning.light', transform: 'scale(1.08)' }, transition: '0.35s' }}>{p.icon}</IconButton>
                      <Tooltip title={p.title} placement="top-start"><Typography variant="h6" fontWeight={700} sx={{ pr: 1 }}>{p.title}</Typography></Tooltip>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>{p.description}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Schedule */}
      <Box id="schedule" py={12} sx={{ background: 'linear-gradient(135deg,#fff7ed,#fff)', position: 'relative' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 85% 15%,rgba(245,158,11,0.08),transparent 55%)' }} />
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
      <Box id="facilities" py={12} sx={{ position: 'relative' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 15% 20%,rgba(245,158,11,0.08),transparent 55%)' }} />
        <Container maxWidth="lg">
          <Stack spacing={2} textAlign="center" mb={6}>
            <Typography variant="overline" fontWeight={700} color="warning.main">FACILITIES</Typography>
            <Typography variant="h3" fontWeight={800} sx={{ letterSpacing: -1 }}>Your Spiritual Campus</Typography>
            <Typography variant="subtitle1" color="text.secondary" maxWidth={700} mx="auto">Spaces designed to nurture reflection, community, health and growth.</Typography>
          </Stack>
          <Grid container spacing={4}>
            {facilities.map((f, i) => (
              <Grid key={i} item xs={12} sm={6} md={3}>
                <Card elevation={5} sx={{ height: '100%', borderRadius: 6, p: 0.5, display: 'flex', flexDirection: 'column', transition: '0.35s', background: 'linear-gradient(140deg,#ffffff,#fffaf5)', '&:hover': { boxShadow: '0 14px 30px -10px rgba(234,88,12,0.22)', transform: 'translateY(-5px)' } }}>
                  <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
                    <Stack spacing={1.6}>
                      <IconButton color="warning" sx={{ alignSelf: 'flex-start', bgcolor: 'warning.light', boxShadow: '0 4px 10px -2px rgba(234,88,12,0.3)', '&:hover': { bgcolor: 'warning.light', transform: 'scale(1.08)' }, transition: '0.35s' }}>{f.icon}</IconButton>
                      <Typography variant="subtitle1" fontWeight={700}>{f.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>{f.description}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact */}
      <Box id="contact" py={12} sx={{ background: 'linear-gradient(135deg,#fff,#fff7ed)', position: 'relative' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 0%,rgba(245,158,11,0.08),transparent 60%)' }} />
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
      <Box component="footer" sx={{ position: 'relative', overflow: 'hidden', pt: 10, pb: 4, background: 'linear-gradient(135deg,#fff9f2,#ffffff 60%)' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%,rgba(245,158,11,0.08),transparent 50%), radial-gradient(circle at 15% 85%,rgba(245,158,11,0.06),transparent 55%)' }} />
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
